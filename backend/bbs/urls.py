from django.urls import path
from . import views

urlpatterns = [
    path('crwCodingTest/', views.crwCodingTest),
    path('initCodingTestProblems/', views.initCodingTestProblems),
    path('allCodingTestProblems/', views.allCodingTestProblems), 
    path('codingTestTreeData/', views.codingTestTreeData),
    path('selectedProblem/', views.selectedProblem),
]