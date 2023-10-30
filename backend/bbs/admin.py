from django.contrib import admin

from .models import CodingTestProblems
from .models import RegisteredBbs
from .models import BbsCategory

class BbsCategoryInline(admin.StackedInline):
    model = BbsCategory
    extra = 1  # 추가적으로 입력할 수 있는 인라인 폼 수

@admin.register(CodingTestProblems)
class CodingTestModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'language', 'finishedAt')
    search_fields = ('title', 'level', 'language', 'finishedAt')
    list_filter = ('level',)

@admin.register(RegisteredBbs)
class RegisteredBbsAdmin(admin.ModelAdmin):
    inlines = [BbsCategoryInline]
    list_display = ('title', 'category', 'date', 'name')
    search_fields = ('title', 'category', 'date', 'name', 'body')
    list_filter = ('category', 'date')

@admin.register(BbsCategory)
class BbsCategoryAdmin(admin.ModelAdmin):
    list_display = ("category",)


