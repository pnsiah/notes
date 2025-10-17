from django.urls import path
from .views import message, index, register

urlpatterns = [
    path("index", index, name="index"),
    path("api/register/", register, name="register"),
    path("api/message/", message),
]
