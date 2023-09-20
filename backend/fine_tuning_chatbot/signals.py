from django.dispatch import receiver # django의 시그널 처리
from django.db.models.signals import post_save # 모델 객체가 저장된 후에 발생하는 신호(post_save)
from django.contrib.auth.models import User # django에 내장된 User 
from rest_framework.authtoken.models import Token # REST Framework의 인증 토큰(Token) 모델

@receiver(post_save, sender=User) # post 신호를 받아들이고, 발신자(sender)로서 User모델을 지정하여 리시버 함수를 등록
def create_auth_token(sender, instance=None, created=False, **kwargs): # User객체가 저장될때 호출
                    # sender: qkftlswk, instance:해당 인스턴스, created:생성여부, kwargs:추가적인 키워드인수
    if created: # 생성되면
        Token.objects.create(user=instance) # 새로운 Auth Token 객체를 생성,해당 토큰에 대한 소유자 설정(User 객체)