import jwt
from django.conf import settings
from django.http import JsonResponse

SECRET_KEY = settings.SECRET_KEY

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path in ['/token/login/', '/token/register/']:
            return self.get_response(request)
        
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse({"success": False, "message": "Token missing"}, status=401)
        
        token = auth_header.split(" ")[1]

        try:
            decode = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user_id = decode.get("user_id")

        except jwt.ExpiredSignatureError:
            return JsonResponse({"success": False, "message": "Token expired"}, status=401)
        
        except jwt.InvalidTokenError:
            return JsonResponse({"success": False, "message": "Invalid Token"}, status=401)

        return self.get_response(request)

