import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
from .models import User


def index(request):
    return render(request, "index.html")


def message(request):
    return JsonResponse({"message": "Hello from Django!"})


@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return JsonResponse(
                {"status": False, "message": "All fields are required"}, status=400
            )

        try:
            User.objects.create_user(username=username, email=email, password=password)
            return JsonResponse(
                {"status": True, "message": "User created succcessfully"}
            )
        except IntegrityError:
            return JsonResponse(
                {"status": False, "message": "Username or Email already exists"},
                status=400,
            )
    else:
        return JsonResponse({"status": False, "message": "Invalid request"}, status=405)


def login(request):
    pass


def logout(request):
    pass


def create_note(request):
    pass


def update_note(request):
    pass


def delete_note(request):
    pass


def list_notes(request):
    pass


def list_archived_notes(request):
    pass


def list_tags(request):
    pass


def restore_note(request):
    pass


def search(request):
    pass


def list_folders(request):
    pass
