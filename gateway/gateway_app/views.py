import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .consul import get_service_url
AI_SERVICE_URL = get_service_url("ai-service")+"/api/ai/upload/"
AUTH_SERVICE_URL = get_service_url("auth-service")+"/api/auth/"
RECOMMANDETION_SERVICE_URL = get_service_url("recommendation-service")+"/api/recommendations/"
# AI ENDPOINTS
@api_view(["GET"])
def health(request):
    return Response({"status": "ai ok"})



@api_view(["POST"])
def upload_image_gateway(request):
    

    user_id = getattr(request, "user_id", None)

    if not user_id:
        return Response({"error": "Unauthorized"}, status=401)

    image = request.FILES.get("image")

    if not image:
        return Response({"error": "No image provided"}, status=400)

    files = {"image": image}

    headers = {
        "X-User-Id": str(user_id)
    }

    response = requests.post(
        AI_SERVICE_URL,
        files=files,
        headers=headers
    )

    return Response(response.json(), status=response.status_code)

@api_view(['GET'])
def me(request):
    auth_header = request.headers.get("Authorization")
    response = requests.get(AUTH_SERVICE_URL+'me/',headers={"Authorization": auth_header})
    return Response(response.json(), status=response.status_code)

@api_view(['POST'])
def register(request):
    data=request.data
    response = requests.post(AUTH_SERVICE_URL+'register/',json=data)
    return Response(response.json(), status=response.status_code)

@api_view(['POST'])
def login(request):
    data=request.data

    response = requests.post(AUTH_SERVICE_URL+'login/',json=data)
    return Response(response.json(), status=response.status_code)

@api_view(['POST'])
def refresh(request):
    data=request.data

    response = requests.post(AUTH_SERVICE_URL+'refresh/',json=data)
    return Response(response.json(), status=response.status_code)


@api_view(['GET'])
def get_recommendations(request):

    auth_header = request.headers.get("Authorization")
    response = requests.get(RECOMMANDETION_SERVICE_URL,headers={"Authorization": auth_header})
    return Response(response.json(), status=response.status_code)

@api_view(['POST'])
def create_recommendation(request):
    data=request.data
    auth_header = request.headers.get("Authorization")
    response = requests.post(RECOMMANDETION_SERVICE_URL+'create/',headers={"Authorization": auth_header},json=data)
    return Response(response.json(), status=response.status_code)

@api_view(['GET'])
def get_by_waste_type(request,waste_type):
    auth_header = request.headers.get("Authorization")
    response = requests.get(RECOMMANDETION_SERVICE_URL+waste_type,headers={"Authorization": auth_header})
    return Response(response.json(), status=response.status_code)

