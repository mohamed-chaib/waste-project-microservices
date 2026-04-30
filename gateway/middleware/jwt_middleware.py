import jwt
from django.http import JsonResponse
from django.conf import settings
SECRET_KEY = settings.SIMPLE_JWT.get("SIGNING_KEY")

class JWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        # Skip auth for public routes
        if request.path.startswith("/api/public/"):
            return self.get_response(request)
        if request.path.startswith("/api/auth/"):
            print("================================================")
            return self.get_response(request)

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return JsonResponse({"error": "Missing Authorization header"}, status=401)

        try:
            token = auth_header.split(" ")[1]
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

            #  attach user to request
            request.user_id = payload.get("user_id")
            request.user_email = payload.get("email")

        except jwt.ExpiredSignatureError:
            return JsonResponse({"error": "Token expired"}, status=401)

        except jwt.InvalidTokenError:
            return JsonResponse({"error": "Invalid token"}, status=401)

        return self.get_response(request)