from .models import Note, Tag


# def save_note_with_tags(user, title, content, tag_list):
#     note = Note.objects.create(user=user, title=title, content=content)
#
#     for tag_name in tag_list:
#         tag_name = tag_name.strip().lower()
#         tag, created = Tag.objects.get_or_create(user=user, name=tag_name)
#         note.tags.add(tag)
#
#     return note
#
#
def save_note_with_tags(user, note, tag_list):
    for tag_name in tag_list:
        tag_name = tag_name.strip().lower()
        tag, created = Tag.objects.get_or_create(user=user, name=tag_name)
        note.tags.add(tag)

    return note


def serialize_note(notes):
    serialized_notes = []
    for note in notes:
        new_note = {"title": note.title, "content": note.content}
        serialized_notes.append(new_note)
    return serialized_notes
