from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("rest_framework.urls")), # URL에 패턴을 추가하여 DRF URL을 포함 
                                                  #rest_framework.urls - DRF에 대한 기본 URL세트를 제공
    path('api/', include('fine_tuning_chatbot.urls')), # fine_tuning_chatbot의 urls연결
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('bbs/' ,include('bbs.urls')),
]
