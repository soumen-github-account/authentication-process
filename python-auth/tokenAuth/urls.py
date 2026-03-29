

from django.urls import path
from .views import *

urlpatterns = [
    path("register/", register_view.as_view()),
    path("login/", login_view.as_view()),
    path("get-profile/", get_profile.as_view())
]