from django.conf import settings
from django.core.files.storage import default_storage

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import FineTunedModel, TrainingData
from .serializers import FineTunedModelSerializer, TrainingDataSerializer

class FineTunedModelViewSet(viewsets.ModelViewSet): #viewsets.ModelViewSet 상속 : 기본적으로 생성,조회,업데이트 및 삭제 기능 제공 
    permission_classes = (IsAuthenticated, ) # 인증된 사용자만이 해당 뷰에 엑세스 할수 있음
    queryset = FineTunedModel.objects.all() # 해당 모델의 모든 인스턴스를 가져옴
    serializer_class = FineTunedModelSerializer # 모델의 인스턴스가 API 응답을 위해 JSON으로 변환되는 방식을 정의

class TrainingDataViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = TrainingData.objects.all()
    serializer_class = TrainingDataSerializer

# @api_view(['GET'])
# def hello_world(request): # get 요청에 대해 Hello, World를 response
#     return Response("Hello, World!")
