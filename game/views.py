from django.shortcuts import render
from django.http import HttpResponse
from config.settings import STATIC_URL, STATICFILES_DIRS

def index(request): # 첫화면
    # return HttpResponse("game index")
    context = {"dir": STATICFILES_DIRS}
    return render(request, 'game/wordle.html',context) # 게임 페이지로 이동
    