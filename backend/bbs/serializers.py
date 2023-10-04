from rest_framework import serializers
from models import CodingtestModel

class CodingtestModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingtestModel
        fields = ['id', 'level', 'partTitle', 'title', 'finishedAt', 'explain', 'code', 'result', 'comment',]