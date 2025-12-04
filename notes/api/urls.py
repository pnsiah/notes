from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/register/", views.register, name="register"),
    path("api/login/", views.login_view, name="login_view"),
    path("api/logout/", views.logout_view, name="logout"),
    path("api/create_folder/", views.create_folder, name="create_folder"),
    path("api/dashboard", views.dashboard, name="dashboard"),
    path("api/get_notes/", views.get_notes, name="get_notes"),
    path(
        "api/list_archived_notes", views.list_archived_notes, name="list_archived_notes"
    ),
    path("api/delete_note/<int:note_id>/", views.delete_note, name="delete_note"),
    path("api/archive_note/<int:note_id>/", views.archive_note, name="archive_note"),
    path("api/fetch_note/<int:note_id>/", views.fetch_note, name="fetch_note"),
    path("api/update_note/<int:note_id>/", views.update_note, name="update_note"),
    path("api/create_note/", views.create_note, name="create_note"),
    path("api/list_tags/", views.list_tags, name="list_tags"),
    path("api/list_folders/", views.list_folders, name="list_folders"),
    path("api/message/", views.message),
]
