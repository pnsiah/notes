import json
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError, transaction
from .models import User, Note, Folder, Tag
from .utils import (
    save_note_with_tags,
    serialize_notes,
    error_response,
    serialize_single_note,
    require_auth,
)


def index(request):
    return render(request, "index.html")


def message(request):
    return JsonResponse({"message": "Hello from Django!"})


def auth_status(request):
    return JsonResponse(
        {
            "authenticated": request.user.is_authenticated,
        }
    )


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
    return JsonResponse({"status": True, "message": "Logged out succesfully"})


@csrf_exempt
@require_auth
def dashboard(request):
    if request.method != "GET":
        return error_response("Invalid request method", status=400)

    user = request.user

    notes = (
        Note.objects.filter(user=user, archived=False)
        .prefetch_related("tags")
        .order_by("-created_at")
    )
    user_tags = Tag.objects.filter(user=user)

    user_folders = Folder.objects.filter(user=user)
    serialized_notes = serialize_notes(notes)

    serialized_tags = [{"id": tag.id, "name": tag.name} for tag in user_tags]
    serialized_folders = [
        {"id": folder.id, "name": folder.name} for folder in user_folders
    ]

    return JsonResponse(
        {
            "status": True,
            "user_data": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
            "notes": serialized_notes,
            "tags": serialized_tags,
            "folders": serialized_folders,
        },
        status=200,
    )


@csrf_exempt
@require_auth
def create_note(request):
    if request.method == "POST":
        data = json.loads(request.body)

        title = data.get("title").strip()
        tags = data.get("tags")
        content = data.get("content").strip()
        folder_id = data.get("folder_id")

        if not title:
            return error_response("Title cannot be empty")
        elif not content:
            return error_response("Content cannot be empty")

        note = Note(user=request.user, title=title, content=content)

        if folder_id:
            try:
                note.folder = Folder.objects.get(id=folder_id, user=request.user)
            except Folder.DoesNotExist:
                return error_response("Folder does not exists")

        try:
            note.save()
        except Exception:
            return error_response("Failed to save note. Please try again.")

        if tags:
            save_note_with_tags(request.user, note, tags)

        return JsonResponse(
            {
                "status": True,
                "message": "Note created successfully",
            }
        )
    else:
        return error_response("Invalid request", status=405)


@csrf_exempt
@require_auth
def update_note(request, note_id):
    if request.method != "PUT":
        return error_response("Invalid request method", status=405)

    data = json.loads(request.body)

    note = get_object_or_404(Note, id=note_id, user=request.user)

    new_title = data.get("title", "").strip()
    new_content = data.get("content", "").strip()
    folder_id = data.get("folder_id", "")

    if not new_title:
        return error_response("Title cannot be empty")

    if not new_content:
        return error_response("Content cannot be empty")

    if folder_id is not None:
        if folder_id == "":
            if note.folder is not None:
                note.folder = None
        else:
            if note.folder != int(folder_id):
                folder = get_object_or_404(Folder, id=folder_id, user=request.user)
                note.folder = folder

    note.title = new_title
    note.content = new_content

    try:
        with transaction.atomic():
            # Store OLD tag IDs before changes
            old_tag_ids = list(note.tags.values_list("id", flat=True))

            note.save()

            if "tags" in data:
                new_tags = data.get("tags", [])

                # Clear old tag relationships
                note.tags.clear()

                # Add new tags
                for tag_name in new_tags:
                    tag_name = tag_name.strip()
                    if not tag_name:
                        continue

                    tag, _ = Tag.objects.get_or_create(
                        user=request.user,
                        name=tag_name,
                    )
                    note.tags.add(tag)

                # Delete orphaned tags
                Tag.objects.filter(
                    user=request.user,
                    id__in=old_tag_ids,
                    notes__isnull=True,
                ).delete()

    except Exception:
        return error_response("Failed to update note. Please try again.")

    return JsonResponse(
        {
            "status": True,
            "message": "Note updated successfully",
        }
    )


@csrf_exempt
@require_auth
def delete_note(request, note_id):
    if request.method != "DELETE":
        return error_response("Invalid request", status=405)

    note = get_object_or_404(Note, id=note_id)

    if note.user != request.user:
        return error_response("Permission denied", status=403)

    try:
        with transaction.atomic():
            # Get tag IDs before deleting relationships
            tag_ids = list(note.tags.values_list("id", flat=True))

            # Clear the tags first (remove M2M relationships)
            # Remove M2M relationships
            note.tags.clear()

            # Delete orphaned tags
            Tag.objects.filter(
                id__in=tag_ids,
                notes__isnull=True,
            ).delete()

            # Delete the note
            note.delete()

    except Exception:
        return error_response("Failed to delete note. Please try again.")

    return JsonResponse({"status": True, "message": "Note deleted successfully"})


@csrf_exempt
@require_auth
def archive_note(request, note_id):
    if request.method != "PUT":
        return error_response("Invalid request method", status=405)

    note = get_object_or_404(Note, id=note_id)

    if note.user != request.user:
        return error_response("Denied", status=403)

    note.archived = not note.archived
    note.save()

    message = (
        "Note archived successfully" if note.archived else "Note restored successfully"
    )
    return JsonResponse({"status": True, "message": message}, status=200)


@require_auth
def get_notes(request):
    if request.method != "GET":
        return error_response("Invalid request method", status=405)

    filter_type = request.GET.get("filter", "all")
    notes = (
        Note.objects.filter(user=request.user)
        .prefetch_related("tags")
        .order_by("-created_at")
    )
    if filter_type == "archived":
        notes = notes.filter(archived=True)
    else:
        notes = notes.filter(archived=False)
    serialized_notes = serialize_notes(notes)
    return JsonResponse({"status": True, "notes": serialized_notes})


@csrf_exempt
@require_auth
def create_folder(request):
    if request.method != "POST":
        return error_response("Invalid request method", status=405)

    data = json.loads(request.body)
    folder_name = data.get("folder", "").strip()

    if not folder_name:
        return error_response("Folder name cannot be empty", status=400)

    if Folder.objects.filter(user=request.user, name=folder_name).exists():
        return error_response("Folder already exists", status=409)

    Folder.objects.create(name=folder_name, user=request.user)

    return JsonResponse(
        {"status": True, "message": "Folder created successfully"}, status=201
    )


# def list_notes(request):
#     pass


@csrf_exempt
@require_auth
def get_notes_by_tags(request):
    if request.method != "GET":
        return error_response("Invalid request method", status=405)

    tag_id = request.GET.get("tag_id")

    if not tag_id:
        return error_response("Tag ID is required", status=400)

    notes = Note.objects.filter(user=request.user, tags__id=tag_id).distinct()

    serialized_notes = serialize_notes(notes)

    return JsonResponse(
        {
            "status": True,
            "notes": serialized_notes,
        }
    )


@csrf_exempt
@require_auth
def get_notes_by_folder(request):
    if request.method != "GET":
        return error_response("Invalid request method", status=405)

    folder_id = request.GET.get("folder_id", "").strip()
    if not folder_id:
        return error_response("Folder ID is required", status=400)

    notes = Note.objects.filter(user=request.user, folder__id=folder_id).distinct()
    serialized_notes = serialize_notes(notes)

    return JsonResponse(
        {
            "status": True,
            "notes": serialized_notes,
        }
    )


@require_auth
def list_archived_notes(request):
    if request.method == "GET":
        notes = Note.objects.filter(user=request.user, archived=True).prefetch_related(
            "tags"
        )
        archived_notes = [
            {
                "id": note.id,
                "title": note.title,
                "content": note.content,
                "created_at": note.created_at,
                "tags": [tag.name for tag in note.tags.all()],
            }
            for note in notes
        ]
        return JsonResponse(
            {
                "status": True,
                "message": "Archived sent successfully",
                "notes": archived_notes,
            },
            status=200,
        )
    else:
        return JsonResponse(
            {
                "status": False,
                "message": "Invalid request",
            },
            status=405,
        )


@require_auth
def get_tags(request):
    if request.method != "GET":
        return error_response("Invalid request method", status=405)

    tags = Tag.objects.filter(user=request.user).values("id", "name").distinct()

    return JsonResponse(
        {
            "status": True,
            "message": "Tags retrieved successfully",
            "tags": list(tags),
        },
        status=200,
    )


@require_auth
# fetch single note
def fetch_note(request, note_id):
    if request.method != "GET":
        return error_response("Invalid request method", status=405)

    try:
        note = Note.objects.get(id=note_id, user=request.user)
    except Note.DoesNotExist:
        return error_response("Note not found.", status=404)

    serialized_note = serialize_single_note(note)
    print(serialized_note)
    return JsonResponse(
        {
            "status": True,
            "message": "Note fetched successfully",
            "note": serialized_note,
        },
        status=200,
    )


@require_auth
def search_notes(request):
    if request.method != "GET":
        return error_response("Invalid request method", status=405)

    query = request.GET.get("query", "").strip()
    if not query:
        return error_response("No search query", status=400)

    notes = (
        Note.objects.filter(
            Q(title__icontains=query)
            | Q(content__icontains=query)
            | Q(tags__name__icontains=query),
            user=request.user,
        )
        .distinct()
        .order_by("-created_at")
    )

    serialized_notes = serialize_notes(notes)
    return JsonResponse(
        {
            "status": True,
            "message": "Successfully retrieved",
            "notes": serialized_notes,
        },
        status=200,
    )


@require_auth
def get_folders(request):
    if request.method != "GET":
        return error_response("Invalid request method", status=405)

    folders = Folder.objects.filter(user=request.user).values("id", "name")
    return JsonResponse(
        {
            "status": True,
            "message": "Folders retrieved",
            "folders": list(folders),
        },
        status=200,
    )
