import os
import torch
import numpy as np
import cv2
from PIL import Image
from .model.net import UNetGenerator
from .utils import load_generator, s1_transform


DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
CKPT_PATH = os.path.join(os.path.dirname(__file__), "checkpoints", "generator_epoch50.pth")

def predict(image_path, output_dir="outputs"):
    os.makedirs(output_dir, exist_ok=True)

    print(f"[DEBUG] Colorization predict called for: {image_path}")
    # load generator
    generator = load_generator(CKPT_PATH, UNetGenerator, DEVICE)
    print(f"[DEBUG] Generator loaded for colorization")

    # preprocess grayscale image
    img = Image.open(image_path).convert("L")
    img_tensor = s1_transform(img).unsqueeze(0).to(DEVICE)

    # run inference
    with torch.no_grad():
        fake_rgb = generator(img_tensor)
        fake_rgb = (fake_rgb + 1) / 2  # [-1,1] → [0,1]

    # save result
    output_path = os.path.join(output_dir, os.path.basename(image_path).replace(".png", "_colorized.png"))
    fake_img = fake_rgb.squeeze().cpu().permute(1,2,0).numpy()
    cv2.imwrite(output_path, (fake_img*255).astype(np.uint8)[:,:,::-1])  # RGB→BGR for OpenCV

    print(f"[DEBUG] Colorization processed image saved at: {output_path}")
    return output_path
