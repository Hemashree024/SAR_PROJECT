import os
import cv2
import torch
import numpy as np
from .unet import UNet

# ---------------------------
# Load the pre-trained model
# ---------------------------
def load_model():
    # Always resolve path relative to this file's directory
    model_path = os.path.join(os.path.dirname(__file__), "checkpoints", "unet_model.pth")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"❌ Model checkpoint not found: {model_path}")

    model = UNet()
    model.load_state_dict(torch.load(model_path, map_location='cpu'))
    model.eval()
    return model


# ---------------------------
# Predict mask from an image
# ---------------------------
def predict_image(image_path):
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"❌ Input image not found: {image_path}")

    # Load and preprocess image
    image = cv2.imread(image_path)
    image_resized = cv2.resize(image, (256, 256))  # resize to model input size

    # Convert to tensor (normalize 0–1, HWC → CHW, add batch dimension)
    image_input = torch.tensor(image_resized / 255.0, dtype=torch.float)
    image_input = image_input.permute(2, 0, 1).unsqueeze(0)

    # Load model
    model = load_model()

    # Make prediction
    with torch.no_grad():
        output = model(image_input)  # shape [1,1,256,256]
        output = output[0][0].numpy()  # remove batch & channel

    # Convert to binary mask
    mask = (output > 0.5).astype(np.uint8) * 255

    # Resize mask back to original image dimensions
    mask_resized = cv2.resize(mask, (image.shape[1], image.shape[0]))
    return mask_resized


# ---------------------------
# Example usage
# ---------------------------
if __name__ == '__main__':
    # Input test image (relative path inside road_detection)
    image_path = os.path.join(os.path.dirname(__file__), "22678915_15.png")

    # Run prediction
    output_mask = predict_image(image_path)

    # Save result next to script
    save_path = os.path.join(os.path.dirname(__file__), "output_mask.png")
    cv2.imwrite(save_path, output_mask)

    print(f"✅ Prediction complete, mask saved at: {save_path}")



