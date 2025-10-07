import os
import cv2
import torch
import numpy as np
from .model.unet import UNet

# ---------------------------
# Load pre-trained model
# ---------------------------
def load_model():
    model_path = os.path.join(os.path.dirname(__file__), "checkpoints", "unet_model.pth")
    print(f"[DEBUG] Loading model from: {model_path}")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"❌ Model checkpoint not found: {model_path}")

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"[DEBUG] Using device: {device}")
    model = UNet().to(device)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()
    print(f"[DEBUG] Model loaded successfully")
    return model, device


# ---------------------------
# Predict building mask
# ---------------------------
def predict_building(image_path, model, device):
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"❌ Input image not found: {image_path}")

    # Load and preprocess
    image = cv2.imread(image_path)
    resized = cv2.resize(image, (256, 256)) / 255.0
    input_tensor = torch.tensor(np.transpose(resized, (2, 0, 1)), dtype=torch.float32).unsqueeze(0).to(device)

    # Predict
    with torch.no_grad():
        output = model(input_tensor)[0][0].cpu().numpy()

    # Binary mask
    mask = (output > 0.5).astype(np.uint8) * 255

    # Resize to original size
    mask_resized = cv2.resize(mask, (image.shape[1], image.shape[0]))
    return image, mask_resized


# ---------------------------
# Example usage
# ---------------------------
if __name__ == "__main__":
    # Test image path (put your test image inside building_detection/)
    test_image_path = os.path.join(os.path.dirname(__file__), "")

    # Load model
    model, device = load_model()

    # Predict
    image, mask = predict_building(test_image_path, model, device)

    # Save output
    save_path = os.path.join(os.path.dirname(__file__), "building_mask.png")
    cv2.imwrite(save_path, mask)

    print(f"✅ Building detection complete, mask saved at: {save_path}")
