from ultralytics import YOLO

model = YOLO("./best.pt")
print(model)
image_path = "/home/mohammedchaib/Pictures/download/360_F_382268809_Ggn1aaP6BQSrSND5yXadyErS1Lu4zVL6.webp"
model.predict(
    source=image_path,
    conf=0.25,
    iou=0.5,
    save=True,
   project="media/predictions",
    name="results",
    exist_ok=True      # 👈 main folder

)