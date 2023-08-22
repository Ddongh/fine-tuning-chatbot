from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world), # hello주소로 요청이 들어오면 views의 hello_world실행
]