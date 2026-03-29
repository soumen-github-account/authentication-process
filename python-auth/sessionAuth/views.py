from django.shortcuts import render
from django.http import JsonResponse
from .models import Users
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password


@csrf_exempt
def register_view(request):
    if request.method == "POST":
        userName = request.POST.get("userName")
        email = request.POST.get("email")
        password = request.POST.get("password")

        print(userName, email, password)

        if not userName or not email or not password:
            return JsonResponse({"success":False, "message": "missing details !"})
        
        if Users.objects.filter(userName=userName):
            return JsonResponse({"success": False, "message": "UserName already exist !"})
        if Users.objects.filter(email=email):
            return JsonResponse({"success": False, "message": "Email already exist !"})
        hashedPassword = make_password(password)

        user = Users.objects.create(userName=userName, email=email, password=hashedPassword)
        user.save()

        return JsonResponse({"success": True, "message": "User Registered !"})
    
@csrf_exempt
def login_view(request):
    if request.method == "POST":
        userName = request.POST.get("userName")
        password = request.POST.get("password")

        if not userName or not password:
            return JsonResponse({"success": False, "message": "missing details"})

        user = Users.objects.filter(userName=userName).first()

        if not user:
            return JsonResponse({"success": False, "message": "User not found"})
        
        if not check_password(password, user.password):
            return JsonResponse({"success": False, "message": "Invalid password"})
        
        request.session['user_id'] = str(user.id)
        request.session['email'] = user.email

        return JsonResponse({
            "success": True,
            "message": "Login successful !"
        })
    
@csrf_exempt
def profile_view(request):
    user_id = request.session.get('user_id')

    if not user_id:
        return JsonResponse({"success": False, "message": "Unauthorized!"})
    
    user = Users.objects.filter(id=user_id).first()

    return JsonResponse({
        "success": True,
        "message": "Welcome user!",
        "user_id": user_id,
        "user": {
            "userName": user.userName,
            "email": user.email
        }
    })

@csrf_exempt
def logout_view(request):
    request.session.flush()  # destroy sessions

    return JsonResponse({"success": True, "message": "Logged out !"})