from django.contrib import admin
from .models import Tag, Folder, Note

admin.site.register(Tag)
admin.site.register(Folder)
admin.site.register(Note)
