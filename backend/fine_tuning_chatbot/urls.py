from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FineTunedModelViewSet,
    TrainingDataViewSet
)

router = DefaultRouter()
router.register(r'fine_tuned_models', FineTunedModelViewSet)
router.register(r'training_data', TrainingDataViewSet)

urlpatterns = [
    path('', include(router.urls))
    # path('hello/', views.hello_world), # hello주소로 요청이 들어오면 views의 hello_world실행
]