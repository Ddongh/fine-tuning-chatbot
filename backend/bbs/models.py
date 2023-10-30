from django.db import models
from django.utils import timezone

class CodingTestProblems(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    level = models.IntegerField() # level
    partTitle = models.CharField(max_length=100, null=True, blank=True) # 문제의 구분(연습문제, 탐욕법, 정렬,,,)
    title = models.CharField(max_length=100, null=True, blank=True) # 문제의 제목
    language = models.CharField(max_length=100, null=True, blank=True)
    finishedAt = models.DateTimeField(null=True, blank=True) # 문제를 해결한 날짜
    explain = models.TextField(null=True, blank=True) # 문제 설명, 제한 사항, 입출력 예
    code = models.TextField(null=True, blank=True) # 작성한 코드
    result = models.TextField(null=True, blank=True) # 실행결과
    comment = models.TextField(null=True, blank=True) # 문제에 대한 개인적인 접근방법 및 설명

    def __str__(self):
        return self.title


class RegisteredBbs(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100) # 등록자 
    date = models.DateTimeField(default=timezone.now) # 등록일
    title = models.CharField(max_length=100) #제목
    category = models.CharField(max_length=100) # category
    body = models.TextField(max_length=9999) # 본문

    def __str__(self):
        return self.title


class BbsCategory(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=100) # 카테고리 
    def __str__(self):
        return self.category