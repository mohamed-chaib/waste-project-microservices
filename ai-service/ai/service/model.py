# ai/service/model.py
from ultralytics import YOLO
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model_path = os.path.join(BASE_DIR, "models", "best.pt")

model = YOLO(model_path)