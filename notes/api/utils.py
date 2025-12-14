from .models import Note, Tag


def save_note_with_tags(user, note, tag_list):
    for tag_name in tag_list:
        tag_name = tag_name.strip().lower()
        tag, created = Tag.objects.get_or_create(user=user, name=tag_name)
        note.tags.add(tag)

    return note


def serialize_note(notes):
    serialized_notes = [
        {
            "id": note.id,
            "title": note.title,
            "content": note.content,
            "date_created": note.created_at.strftime("%d %B %Y"),
            "tags": [tag.name for tag in note.tags.all()],
        }
        for note in notes
    ]
    return serialized_notes
