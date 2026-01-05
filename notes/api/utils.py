from .models import Note, Tag
from django.http import JsonResponse
from functools import wraps


def save_note_with_tags(user, note, tag_list):
    for tag_name in tag_list:
        tag_name = tag_name.strip().lower()
        tag, created = Tag.objects.get_or_create(user=user, name=tag_name)
        note.tags.add(tag)

    return note


def format_last_edited(note):
    if note.last_edited.replace(microsecond=0) == note.created_at.replace(
        microsecond=0
    ):
        return "Not edited yet"
    return note.last_edited.strftime("%d %B %Y")


def serialize_notes(notes):
    serialized_notes = [
        {
            "id": note.id,
            "title": note.title,
            "content": note.content,
            "date_created": note.created_at.strftime("%d %B %Y"),
            "last_edited": format_last_edited(note),
            "archived": note.archived,
            "tags": [tag.name for tag in note.tags.all()],
            "folder_id": note.folder.id if note.folder else "",
        }
        for note in notes
    ]
    return serialized_notes


def serialize_single_note(note):
    return {
        "id": note.id,
        "title": note.title,
        "content": note.content,
        "last_edited": format_last_edited(note),
        "archived": note.archived,
        "tags": [tag.name for tag in note.tags.all()],
        "folder_id": note.folder.id if note.folder else "",
    }


def error_response(message, status=400):
    return JsonResponse({"status": False, "message": message}, status=status)


def require_auth(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse(
                {"status": False, "message": "Authentication required"}, status=401
            )
        return view_func(request, *args, **kwargs)

    return wrapper
