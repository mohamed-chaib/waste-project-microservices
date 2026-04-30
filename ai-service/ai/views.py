from django.shortcuts import render
# Create your views here.
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import os
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from django.conf import settings
from .service.inference import predict_image
import cloudinary.uploader
import requests
from .models import Submission

@api_view(["GET"])
def health(request):
    return Response({"status": "ai ok"})

# views.py
from django.views.decorators.csrf import csrf_exempt

@api_view(["POST"])
def upload_image(request):
    if request.method == "POST":
        image = request.FILES.get("image")

        if not image:
            return JsonResponse({"error": "No image provided"}, status=400)

        os.makedirs("media", exist_ok=True)

        file_path = os.path.join("media", image.name)

        with open(file_path, "wb+") as f:
            for chunk in image.chunks():
                f.write(chunk)

        return Response({
            "message": "Image uploaded successfully",
            "path": file_path})

    return JsonResponse({"error": "Only POST allowed"}, status=405)

# ai/views.py
@api_view(["POST"])
@parser_classes([MultiPartParser])
def upload_and_predict(request):


    user_id = request.headers.get("X-User-Id")
    if not user_id:
        return Response({"error": "Missing user context"}, status=401)

    # -------------------------
    # Get image
    # -------------------------
    image = request.FILES.get("image")
    if not image:
        return Response({"error": "No image provided"}, status=400)

    # -------------------------
    # Upload original image to Cloudinary
    # -------------------------
    upload_result = cloudinary.uploader.upload(image)
    input_url = upload_result["secure_url"]

    # -------------------------
    # Download temporarily for AI
    # -------------------------
    img_data = requests.get(input_url).content
    input_path = os.path.join(settings.BASE_DIR, "temp_input.jpg")

    with open(input_path, "wb") as f:
        f.write(img_data)

    # -------------------------
    # AI inference
    # -------------------------
    result = predict_image(input_path)

    # -------------------------
    # Upload AI output image
    # -------------------------
    output_upload = cloudinary.uploader.upload(result["output_image_path"])
    output_url = output_upload["secure_url"]

    # -------------------------
    # Cleanup
    # -------------------------
    if os.path.exists(input_path):
        os.remove(input_path)

    # -------------------------
    # Save DB
    # -------------------------
    submission = Submission.objects.create(
        user_id=user_id,
        input_image=input_url,
        output_image=output_url,
        waste_type=result["waste_type"],
        confidence=result["confidence"]
    )

    # -------------------------
    # Response
    # -------------------------
    return Response({
        "submission_id": submission.id,
        "input_image": input_url,
        "predicted_image": output_url,
        "waste_type": result["waste_type"],
        "confidence": result["confidence"],
        "detections": result["detections"]
    })
