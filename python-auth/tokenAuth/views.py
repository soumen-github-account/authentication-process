from django.shortcuts import render
from sessionAuth.models import Users
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from datetime import datetime, timedelta
import jwt


SECRET_KEY=settings.SECRET_KEY

class register_view(APIView):
    def post(self, request):
        userName = request.data.get("userName")
        email = request.data.get("email")
        password = request.data.get("password")

        print(userName, email, password)

        if not userName or not email or not password:
            return Response({"success": False, "message": "missing details"})
        
        if Users.objects.filter(userName=userName):
            return Response({"success": False, "message": "Username already exist"})
        if Users.objects.filter(email=email):
            return Response({"success": False, "message": "Email already exist"})
        hashed_password = make_password(password)

        user = Users.objects.create(
            userName=userName,
            email=email,
            password=hashed_password
          )
        user.save()
        return Response({"success": True, "message": "User Registered !"})


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

        return Response({
            "success": True,
            "token": token
        })
    
class get_profile(APIView):
    def get(self, request):
        userId = request.user_id
        user = Users.objects.filter(id=userId).first()

        return Response({"messaeg": "Welcome , ", "user": user.userName})