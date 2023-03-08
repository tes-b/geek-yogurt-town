from django.shortcuts import render
from django.http import HttpResponse
from config.settings import STATIC_URL, STATICFILES_DIRS

def index(request): # 첫화면
    # return HttpResponse("game index")
    return render(request, 'wordle/index.html') # 게임 페이지로 이동

def test(request): # 테스트
    return render(request, 'wordle/test.html') # 게임 페이지로 이동