from django.contrib.auth.models import User
from django.db import models

class FineTunedModel(models.Model):
    MODEL_CHOICES = [
        ('ada', "Ada"),
        ('babbage', 'Babbage'),
        ('curie', 'Curie'),
        ('davinci', 'Davinci'),
    ]

    model_name = models.CharField(max_length=100)
    base_model = models.CharField(max_length=100, choices=MODEL_CHOICES) # MODEL_CHOICES 중 하나 선택
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fine_tuned_models', null=True)
    file_id = models.CharField(max_length=200, null=True, blank=True)
    # null=True - 데이터베이스 레벨에서 null값이 허용된다.
    # blank=True - 폼 입력시 해당 필드를 선택적으로 비워둘수 있다.
    fine_tune_id = models.CharField(max_length=200, null=True, blank=True)
    fine_tuned_model = models.CharField(max_length=200, null=True, blank=True)
    status = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self): # 객체를 문자열로 표현할때 사용
        return self.model_name # model_name을 반환
    
class TrainingData(models.Model):
        fine_tuned_model = models.ForeignKey(FineTunedModel, on_delete=models.CASCADE, related_name='traning_data')
        # FineTunedModel과 관련된 ForeignKey필드, FineTunedModel과 TrainingData사이에 일대다 관계를 설정
        # on_delete=models.CASCADE - 연결된 객체가 삭제되면 해당 객체와 관련된 모든 객체도 함께 삭제
        prompt = models.TextField()
        completion = models.TextField()
        is_fine_tuned = models.BooleanField(default=False)
        will_be_fine_tuned = models.BooleanField(default=False)
        user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='training_datas', null=True)

        def __str__(self): # 객체를 문자열로 표현할때 사용
            return f"{self.fine_tuned_model.model_name}의 훈련 데이터"