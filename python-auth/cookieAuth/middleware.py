import jwt
from django.http import JsonResponse
from django.conf import settings


SECRET_KEY=settings.SECRET_KEY

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path in ['/cookie/login/', '/token/register/']:
            return self.get_response(request)
        
        token = request.COOKIES.get("access_token")

        if not token:
            return JsonResponse({"success": False, "message": "Token missing"})
        
        try:
            decode = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user_id = decode.get("user_id")

        except jwt.ExpiredSignatureError:
            return JsonResponse({"success": False, "message": "Token expired"}, status=401)

        except jwt.InvalidTokenError:
            return JsonResponse({"success": False, "message": "Invalid token"}, status=401)

        return self.get_response(request)