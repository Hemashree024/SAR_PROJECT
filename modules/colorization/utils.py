import os
import torch
import torchvision.transforms as T
from PIL import Image

def load_generator(checkpoint_path, model_class, device):
    model = model_class().to(device)
    state_dict = torch.load(checkpoint_path, map_location=device)
    model.load_state_dict(state_dict)
    model.eval()
    return model

# transforms for grayscale input
s1_transform = T.Compose([
    T.Resize((256, 256)),
    T.ToTensor()
])
