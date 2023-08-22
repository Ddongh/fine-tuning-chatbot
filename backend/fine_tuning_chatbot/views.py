from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello_world(request): # get 요청에 대해 Hello, World를 response
    return Response("Hello, World!")
