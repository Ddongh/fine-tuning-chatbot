from rest_framework import serializers
from .models import CodingTestProblems

class CodingTestProblemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingTestProblems
        fields = ['id', 'level', 'partTitle', 'title', 'language', 'finishedAt', 'explain', 'code', 'result', 'comment',]

class CodingTestProblemsTreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingTestProblems
        fields = ['id', 'level', 'partTitle', 'title', 'language',]