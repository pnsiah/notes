from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/register/", views.register, name="register"),
    path("api/login/", views.login_view, name="login_view"),
    path("api/logout/", views.logout_view, name="logout"),
    path("api/create_folder/", views.create_folder, name="create_folder"),
    path("api/dashboard", views.dashboard, name="dashboard"),
    path(
        "api/list_archived_notes", views.list_archived_notes, name="list_archived_notes"
    ),
    path("api/delete_note/<int:note_id>/", views.delete_note, name="delete_note"),
    path("api/update_note/<int:note_id>/", views.update_note, name="update_note"),
    path("api/create_note/", views.create_note, name="create_note"),
    path("api/list_tags/", views.list_tags, name="list_tags"),
    path("api/message/", views.message),
]
