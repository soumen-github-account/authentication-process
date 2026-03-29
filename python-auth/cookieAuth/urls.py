
from django.urls import path
from .views import *


urlpatterns = [
    path("login/", login_view.as_view()),
    path("get-profile/", get_profile.as_view()),
    path("logout/", logout_view.as_view())
]