from django.contrib import admin

from .models import CodingTestModel

@admin.register(CodingTestModel)
class CodingTestModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'finishedAt')
    search_fields = ('title', 'level', 'finishedAt')
    list_filter = ('level',)