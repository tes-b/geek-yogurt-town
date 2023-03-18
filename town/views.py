from django.shortcuts import render


def index(request): # 첫화면
    # return HttpResponse("game index")
    return render(request, 'town/index.html') # 게임 페이지로 이동