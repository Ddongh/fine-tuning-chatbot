from django.contrib import admin

from .models import CodingTestProblems

@admin.register(CodingTestProblems)
class CodingTestModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'language', 'finishedAt')
    search_fields = ('title', 'level', 'language', 'finishedAt')
    list_filter = ('level',)