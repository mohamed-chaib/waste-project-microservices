# ai/service/inference.py

import os
import glob
from .model import model


def predict_image(image_path):
   

    if not image_path or not os.path.exists(image_path):
        raise ValueError(f"Invalid image path: {image_path}")

    if os.path.getsize(image_path) == 0:
        raise ValueError("Empty image file")

    # -------------------------
    # Run YOLO
    # -------------------------
    results = model.predict(
        source=image_path,
        save=True,
        project="runs/detect",
        name="outputs",
        exist_ok=True
    )

    result = results[0]
    boxes = result.boxes

    detections = boxes.data.tolist() if boxes is not None else []

    waste_type = None
    confidence = 0.0

    if boxes is not None and len(boxes) > 0:
        best_idx = boxes.conf.argmax().item()
        confidence = float(boxes.conf[best_idx])
        class_id = int(boxes.cls[best_idx])
        waste_type = model.names[class_id]

    # -------------------------
    # Get output image file (IMPORTANT)
    # -------------------------
    save_dir = result.save_dir

    images = glob.glob(os.path.join(save_dir, "*.jpg")) + \
              glob.glob(os.path.join(save_dir, "*.png"))

    if not images:
        raise RuntimeError(f"No output image found in {save_dir}")

    output_image_path = images[0]

    # -------------------------
    # Return ONLY AI results
    # -------------------------
    return {
        "detections": detections,
        "waste_type": waste_type,
        "confidence": confidence,
        "output_image_path": output_image_path
    }