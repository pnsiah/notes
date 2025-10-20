import json
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
from .models import User, Note, Folder
from .utils import save_note_with_tags


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


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse(
                {"status": True, "message": "Logged in successfully"}, status=200
            )
        else:
            return JsonResponse(
                {"status": False, "message": "Invalid username or password"}, status=400
            )
    else:
        return JsonResponse({"status": False, "message": "Invalid Request"}, status=405)


@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({"status": True, "message": "Log out succesful"})


# @csrf_exempt
# def dashboard(request):
#     if request.user.is_authenticated:
#         user = request.user
#         user_data = {
#             "username": user.username,
#             "email": user.email,
#         }
#         return JsonResponse({"status": True, "user_data": user_data})
#
#
@csrf_exempt
def dashboard(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            user = request.user
            # notes = Note.objects.filter(user=user).values()
            # notes = Note.objects.values(
            #     "id",
            #     "title",
            #     "content",
            #     "folder",
            #     "folder__name",
            #     "tags__name",
            # )

            notes = Note.objects.filter(user=user).prefetch_related("tags")
            new_notes = [
                {
                    "id": note.id,
                    "title": note.title,
                    "content": note.content,
                    "tags": [tag.name for tag in note.tags.all()],
                }
                for note in notes
            ]
            # new_notes = serialize_note(notes)
            return JsonResponse(
                {
                    "status": True,
                    "user_data": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "notes": new_notes,
                    },
                }
            )
        else:
            return JsonResponse(
                {"status": False, "message": "Not authenticated"}, status=401
            )

    # ✅ Make sure GET or other methods return something too
    return JsonResponse(
        {"status": False, "message": "Invalid request method"}, status=400
    )


@csrf_exempt
def create_note(request):
    if request.method == "POST":
        data = json.loads(request.body)
        title = data.get("title").strip()
        tags = data.get("tags")
        content = data.get("content").strip()
        folder_id = data.get("folder")

        if not title:
            return JsonResponse({"status": False, "message": "Title cannot be empty"})
        elif not content:
            return JsonResponse({"status": False, "message": "Content cannot be empty"})

        note = Note(user=request.user, title=title, content=content)

        if folder_id:
            try:
                note.folder = Folder.objects.get(id=folder_id, user=request.user)
            except Folder.DoesNotExist:
                return JsonResponse(
                    {"status": False, "message": "Folder does not exists"}
                )

        note.save()

        if tags:
            save_note_with_tags(request.user, note, tags)
        return JsonResponse({"status": True, "message": "Note created successfully"})
    else:
        JsonResponse({"status": False, "message": "Invalid request"}, status=405)


def update_note(request):
    pass


@csrf_exempt
def delete_note(request, note_id):
    if request.method != "DELETE":
        return JsonResponse({"status": False, "message": "Invalid request"}, status=405)
    note = get_object_or_404(Note, id=note_id)

    if note.user != request.user:
        return JsonResponse({"status": False, "message": "Denied"}, status=403)
    note.delete()
    return JsonResponse({"status": True, "message": "Note deleted successfully"})


@csrf_exempt
def create_folder(request):
    if request.method == "POST":
        data = json.loads(request.body)
        folder_name = data.get("folder", "").strip()
        if not folder_name:
            return JsonResponse(
                {"status": False, "message": "Folder name cannot be empty"}, status=405
            )

        if Folder.objects.filter(user=request.user, name=folder_name).exists():
            return JsonResponse(
                {"status": False, "message": "Folder already exists"}, status=409
            )

        Folder.objects.create(name=folder_name, user=request.user)
        return JsonResponse({"status": True, "message": "Folder created successfully"})
    else:
        return JsonResponse({"status": False, "message": "Invalid request"}, status=405)


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
