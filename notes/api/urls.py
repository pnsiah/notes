from django.urls import path
from .views import message, index

urlpatterns = [
    path("index", index, name="index"),
    path("api/message/", message),
]
