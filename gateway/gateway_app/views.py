import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .consul import get_service_url

# AI ENDPOINTS
@api_view(["GET"])
def health(request):
    return Response({"status": "gateway ok"})



@api_view(["POST"])
def upload_image_gateway(request):
    print('============================================')
    print(get_service_url("ai-service")+"/api/ai/upload/")
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
        get_service_url("ai-service")+"/api/ai/upload/",
        files=files,
        headers=headers
    )

    try:
        return Response(response.json(), status=response.status_code)
    except requests.exceptions.JSONDecodeError:
        return Response(
            {"error": "AI service returned an invalid response", "detail": response.text},
            status=response.status_code or 500
        )

@api_view(['GET'])
def me(request):
    auth_header = request.headers.get("Authorization")
    response = requests.get(get_service_url("auth-service") +'/api/auth/me/',headers={"Authorization": auth_header})
    return Response(response.json(), status=response.status_code)



@api_view(['POST'])
def register(request):
    data = request.data
    url = get_service_url("auth-service") + "/api/auth/register/"

    try:
        response = requests.post(url, json=data, timeout=5)

        print("Calling:", url)
        print("Status:", response.status_code)
        print("Body:", response.text)

        try:
            response_data = response.json()
        except ValueError:
            response_data = {
                "error": "Auth service" + get_service_url("auth-service") + "/register/" +" returned non-JSON response",
                "raw": response.text
            }

        return Response(response_data, status=response.status_code)

    except requests.exceptions.RequestException as e:
        return Response({
            "error": "Auth service unreachable",
            "details": str(e)
        }, status=503)

@api_view(['POST'])
def login(request):
    data=request.data

    response = requests.post(get_service_url("auth-service")+'/api/auth/login/',json=data)
    return Response(response.json(), status=response.status_code)

@api_view(['POST'])
def refresh(request):
    data=request.data

    response = requests.post(get_service_url("auth-service")+'/api/auth/refresh/',json=data)
    return Response(response.json(), status=response.status_code)


@api_view(['GET'])
def get_recommendations(request):

    auth_header = request.headers.get("Authorization")
    response = requests.get(get_service_url("recommendation-service")+"/api/recommendations/",headers={"Authorization": auth_header})
    return Response(response.json(), status=response.status_code)

@api_view(['POST'])
def create_recommendation(request):
    data=request.data
    auth_header = request.headers.get("Authorization")
    response = requests.post(get_service_url("recommendation-service")+'/api/recommendations/create/',headers={"Authorization": auth_header},json=data)
    return Response(response.json(), status=response.status_code)

@api_view(['GET'])
def get_by_waste_type(request,waste_type):
    auth_header = request.headers.get("Authorization")
    response = requests.get(get_service_url("recommendation-service")+"/api/recommendations/"+waste_type,headers={"Authorization": auth_header})
    return Response(response.json(), status=response.status_code)

