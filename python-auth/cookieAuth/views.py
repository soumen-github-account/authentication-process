from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from sessionAuth.models import Users
import jwt
from django.contrib.auth.hashers import make_password, check_password
from datetime import datetime, timedelta


SECRET_KEY = settings.SECRET_KEY

class login_view(APIView):
    def post(self, request):
        userName = request.data.get("userName")
        password = request.data.get("password")

        print(userName, password)

        if not userName or not password:
            return Response({"success": False, "message": "missing details"})
        user = Users.objects.filter(userName=userName).first()

        if not user:
            return Response({"success": False, "message": "User not found"})
        
        if not check_password(password, user.password):
            return Response({"success": False, "message": "Invalid password"})
        
        payload = {
            "user_id": str(user.id),
            "email": user.email,
            "exp": datetime.utcnow() + timedelta(hours=2),
            "iat": datetime.utcnow()
        }

        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        if isinstance(token, bytes):
            token = token.decode("utf-8")

        response = Response({
            "success": True,
            "message": "Login successfull"
        })

        response.set_cookie(
            key="access_token",
            value=token,
            httponly=True,
            secure=False,
            samesite="Lax"
        )
        return response
    
class logout_view(APIView):
    def post(self, request):
        response = Response({"success": True, "message": "Logged out"})
        response.delete_cookie("access_token")
        return response

class get_profile(APIView):
    def get(self, request):
        user_id = request.user_id
        user = Users.objects.filter(id=user_id).first()

        return Response({"success": True, "userName": user.userName})