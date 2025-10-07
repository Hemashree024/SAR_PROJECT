import torch
import torch.nn as nn

class UNetGenerator(nn.Module):
    def __init__(self, in_channels=1, out_channels=3):
        super(UNetGenerator, self).__init__()

        def conv_block(in_ch, out_ch, normalize=True):
            layers = [nn.Conv2d(in_ch, out_ch, 4, 2, 1, bias=False)]
            if normalize:
                layers.append(nn.BatchNorm2d(out_ch))
            layers.append(nn.LeakyReLU(0.2, inplace=True))
            return nn.Sequential(*layers)

        def deconv_block(in_ch, out_ch, dropout=0.0):
            layers = [nn.ConvTranspose2d(in_ch, out_ch, 4, 2, 1, bias=False),
                      nn.BatchNorm2d(out_ch),
                      nn.ReLU(inplace=True)]
            if dropout:
                layers.append(nn.Dropout(dropout))
            return nn.Sequential(*layers)

        # Encoder
        self.enc1 = conv_block(in_channels, 64, normalize=False)
        self.enc2 = conv_block(64, 128)
        self.enc3 = conv_block(128, 256)
        self.enc4 = conv_block(256, 512)
        self.enc5 = conv_block(512, 512)

        # Decoder
        self.dec5 = deconv_block(512, 512, dropout=0.5)
        self.dec4 = deconv_block(1024, 256, dropout=0.5)
        self.dec3 = deconv_block(512, 128)
        self.dec2 = deconv_block(256, 64)
        self.dec1 = nn.ConvTranspose2d(128, out_channels, 4, 2, 1)
        self.tanh = nn.Tanh()

    def forward(self, x):
        e1 = self.enc1(x)
        e2 = self.enc2(e1)
        e3 = self.enc3(e2)
        e4 = self.enc4(e3)
        e5 = self.enc5(e4)

        d5 = self.dec5(e5)
        d5 = torch.cat([d5, e4], dim=1)
        d4 = self.dec4(d5)
        d4 = torch.cat([d4, e3], dim=1)
        d3 = self.dec3(d4)
        d3 = torch.cat([d3, e2], dim=1)
        d2 = self.dec2(d3)
        d2 = torch.cat([d2, e1], dim=1)
        d1 = self.dec1(d2)
        return self.tanh(d1)
