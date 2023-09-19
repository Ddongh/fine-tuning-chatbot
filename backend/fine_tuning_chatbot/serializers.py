from rest_framework import serializers # 쿼리셋과 모델 인스턴스와 같은 복잡한 유형을 Python기본 데이터 유형으로 변환하여
                                       # json또는 다른 콘텐츠 유형으로 쉽게 렌터링 할 수 있는 기능을 제공
from .models import FineTunedModel, TrainingData

class FIneTunedModelSerializer(serializers.ModelSerializer): 
# ModelSerializer - 모델 인스턴스와 쿼리셋을 다루는 직렬화기를 간편하게 생성하기 위한 단축키 제공
    class Meta:
        model = FineTunedModel
        fields = ['id', 'model_name', 'base_model']

class TraningDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingData
        fields = ['id', 'fine_tuned_model', 'prompt', 'completion', 'is_fine_tuned', 'will_be_fine_tuned']