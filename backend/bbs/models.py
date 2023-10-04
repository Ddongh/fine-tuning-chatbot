from django.db import models

class CodingTestModel(models.Model):
    id = models.IntegerField(primary_key=True) # id
    level = models.IntegerField() # level
    partTitle = models.CharField(max_length=100, null=True, blank=True) # 문제의 구분(연습문제, 탐욕법, 정렬,,,)
    title = models.CharField(max_length=100, null=True, blank=True) # 문제의 제목
    finishedAt = models.DateField(null=True, blank=True) # 문제를 해결한 날짜
    explain = models.TextField(null=True, blank=True) # 문제 설명, 제한 사항, 입출력 예
    code = models.TextField(null=True, blank=True) # 작성한 코드
    result = models.TextField(null=True, blank=True) # 실행결과
    comment = models.TextField(null=True, blank=True) # 문제에 대한 개인적인 접근방법 및 설명

    def __str__(self):
        return self.title




