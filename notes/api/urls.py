from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/register/", views.register, name="register"),
    path("api/login/", views.login_view, name="login_view"),
    path("api/logout", views.logout, name="logout"),
    path("api/dashboard", views.dashboard, name="dashboard"),
    path("api/message/", views.message),
]
