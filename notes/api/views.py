from django.db import transaction
import json
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET
from django.db import IntegrityError, transaction
from .models import User, Note, Folder, Tag
from .utils import save_note_with_tags, serialize_note


def index(request):
    return render(request, "index.html")


def message(request):
    return JsonResponse({"message": "Hello from Django!"})


def auth_status(request):
    return JsonResponse(
        {
            "authenticated": request.user.is_authenticated,
            "username": request.user.username
            if request.user.is_authenticated
            else None,
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
    return JsonResponse({"status": True, "message": "Log out succesful"})


@csrf_exempt
def dashboard(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            user = request.user

            notes = (
                Note.objects.filter(user=user, archived=False)
                .prefetch_related("tags")
                .order_by("-created_at")
            )
            user_tags = Tag.objects.filter(user=user)
            user_folders = Folder.objects.filter(user=user)
            # serialized_notes = [
            #     {
            #         "id": note.id,
            #         "title": note.title,
            #         "content": note.content,
            #         "date_created": note.created_at.strftime("%d %B %Y"),
            #         "tags": [tag.name for tag in note.tags.all()],
            #     }
            #     for note in notes
            # ]
            serialized_notes = serialize_note(notes)

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

        return JsonResponse(
            {
                "status": True,
                "note": serialize_note([note]),
                "message": "Note created successfully",
            }
        )
    else:
        JsonResponse({"status": False, "message": "Invalid request"}, status=405)


@csrf_exempt
def update_note(request, note_id):
    if request.method == "PUT":
        data = json.loads(request.body)
        note = get_object_or_404(Note, id=note_id, user=request.user)
        new_title = data.get("title")
        new_content = data.get("content")

        if not new_title or not new_content:
            return JsonResponse(
                {"status": False, "message": "Title or content cannot be empty"},
                status=400,
            )

        note.title = new_title
        note.content = new_content

        with transaction.atomic():
            # Get OLD tags BEFORE any changes
            old_tag_ids = list(note.tags.values_list("id", flat=True))

            note.save()

            if "tags" in data:
                # Get NEW tags from the request
                new_tags = data["tags"]

                # Clear old relationships
                note.tags.clear()

                # Add new tags
                for tag_name in new_tags:
                    tag, created = Tag.objects.get_or_create(
                        user=request.user, name=tag_name.strip()
                    )
                    note.tags.add(tag)

                # Delete orphaned tags (from old_tag_ids only)
                Tag.objects.filter(
                    user=request.user,
                    id__in=old_tag_ids,
                    notes__isnull=True,  # No notes left
                ).delete()

        return JsonResponse({"status": True, "message": "Note updated"})
    else:
        return JsonResponse({"status": False, "message": "Invalid request"}, status=405)


@csrf_exempt
def delete_note(request, note_id):
    if request.method != "DELETE":
        return JsonResponse({"status": False, "message": "Invalid request"}, status=405)
    note = get_object_or_404(Note, id=note_id)

    if note.user != request.user:
        return JsonResponse({"status": False, "message": "Denied"}, status=403)

    with transaction.atomic():
        # Get all tag IDs associated with this note
        tag_ids = list(note.tags.values_list("id", flat=True))

        # Clear the tags first (remove M2M relationships)

        note.tags.clear()

        # Delete tags that have no notes left
        Tag.objects.filter(
            id__in=tag_ids,
            notes__isnull=True,  # Tags with no notes
        ).delete()

        # Now delete the note
        note.delete()

    return JsonResponse({"status": True, "message": "Note deleted successfully"})


@csrf_exempt
def archive_note(request, note_id):
    if request.method != "PUT":
        return JsonResponse({"status": False, "message": "Invalid request"}, status=405)
    note = get_object_or_404(Note, id=note_id)

    if note.user != request.user:
        return JsonResponse({"status": False, "message": "Denied"}, status=403)

    note.archived = not note.archived
    note.save()

    if note.archived:
        message = "Not archived successfully"
    else:
        message = "Note restored successsfully"
    return JsonResponse({"status": True, "message": message})


@csrf_exempt
def get_notes(request):
    if not request.user.is_authenticated:
        return JsonResponse(
            {"status": False, "error": "Authentication required"}, status=401
        )
    filter = request.GET.get("filter", "all")
    notes = (
        Note.objects.filter(user=request.user)
        .prefetch_related("tags")
        .order_by("-created_at")
    )

    print(filter)
    if filter == "archived":
        notes = notes.filter(archived=True)
    else:
        print("fetching all notes")
        notes = notes.filter(archived=False)

    # serialized_notes = [
    #     {
    #         "id": note.id,
    #         "title": note.title,
    #         "content": note.content,
    #         "date_created": note.created_at.strftime("%d %B %Y"),
    #         "tags": [tag.name for tag in note.tags.all()],
    #     }
    #     for note in notes
    # ]
    serialized_notes = serialize_note(notes)
    return JsonResponse({"status": True, "notes": serialized_notes})


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


# def list_notes(request):
#     pass


@csrf_exempt
def get_notes_by_tags(request):
    if request.method == "GET":
        tag_name = request.GET.get("tag", "").strip()
        notes = Note.objects.filter(user=request.user, tags__name=tag_name)
        serialized_notes = serialize_note(notes)
        return JsonResponse({"status": True, "notes": serialized_notes})
    else:
        return JsonResponse({"status": False, "message": "Error fetching notes"})


@csrf_exempt
def get_notes_by_folder(request):
    if request.method == "GET":
        folder_id = request.GET.get("folder_id", "").strip()
        notes = Note.objects.filter(user=request.user, folder__id=folder_id)
        serialized_notes = serialize_note(notes)
        print(serialized_notes)
        return JsonResponse({"status": True, "notes": serialized_notes})
    else:
        return JsonResponse({"status": False, "message": "Error fetching notes"})


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


def list_tags(request):
    if request.method == "GET":
        tags = Tag.objects.filter(user=request.user).values("id", "name").distinct()
        print(tags)
        return JsonResponse(
            {
                "status": True,
                "message": "Tags retrieved successfully",
                "tags": list(tags),
            },
            status=200,
        )

    return JsonResponse({"status": False, "message": "Invalid request"}, status=405)


def restore_note(request):
    pass


@require_GET
def fetch_note(request, note_id):
    try:
        note = Note.objects.get(id=note_id, user=request.user)

    except Note.DoesNotExist:
        return JsonResponse({"status": False, "message": "Note not found"}, status=405)

    #  Return serialized note
    return JsonResponse(
        {
            "status": True,
            "message": "Note fetched successfully",
            "note": {
                "id": note.id,
                "title": note.title,
                "content": note.content,
                "last_edited": note.last_edited.strftime("%d %B %Y"),
                "archived": note.archived,
                "tags": [tag.name for tag in note.tags.all()],
                "folder": note.folder.name if note.folder else "",
            },
        },
        status=200,
    )


@csrf_exempt
def search_notes(request):
    if request.method == "GET":
        query = request.GET.get("query", "").strip()
        if not query:
            return JsonResponse(
                {"status": False, "message": "No search query"}, status=404
            )
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
        serialized_notes = serialize_note(notes)
        return JsonResponse(
            {
                "status": True,
                "message": "Successfully retrieved",
                "notes": serialized_notes,
            },
            status=200,
        )
    return JsonResponse({"status": False, "message": "Invalid request"}, status=405)


def list_folders(request):
    if request.method == "GET":
        folders = Folder.objects.filter(user=request.user).values("id", "name")
        return JsonResponse(
            {"status": True, "message": "Folders retrieved", "folders": list(folders)},
            status=200,
        )

    else:
        return JsonResponse({"status": False, "message": "Invalid request"}, status=405)
