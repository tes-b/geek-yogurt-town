from django.shortcuts import render

# Create your views here.
def main(request): # 첫화면
    # return HttpResponse("game index")
    return render(request, 'backender/main.html') # 게임 페이지로 이동