from rest_framework import serializers
from models import CodingTestModel

class CodingtestModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingTestModel
        fields = ['id', 'level', 'partTitle', 'title', 'finishedAt', 'explain', 'code', 'result', 'comment',]