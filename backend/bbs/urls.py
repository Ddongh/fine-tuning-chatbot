from django.urls import path
from . import views

urlpatterns = [
    path('crwCodingTest/', views.crwCodingTest),
    path('initCodingTestModel/', views.initCodingTestModel)
]