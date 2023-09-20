from django.apps import AppConfig


class FineTuningChatbotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'fine_tuning_chatbot'

    def ready(self): # django가 초기화 될때 호출, 어플리케이션이 준비되었음을 나타냄
        import fine_tuning_chatbot.signals # signal모듈 임포트
