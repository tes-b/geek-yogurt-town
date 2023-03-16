import random

from django.shortcuts   import render
from django.http        import HttpResponse
from django.core        import serializers

from config.settings import STATIC_URL, STATICFILES_DIRS

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Word

from .serializer import WordSerializer

def index(request): # 첫화면
    # return HttpResponse("game index")
    return render(request, 'wordle/main.html') # 게임 페이지로 이동

def test(request): # 테스트
    return render(request, 'wordle/test.html') # 게임 페이지로 이동

class WordAPIView(APIView):
    
    serializer_class = WordSerializer

    def get(self, request):
        
        if request.query_params:
            id = request.query_params.get('id', None)
            rand = request.query_params.get('rand', None)
            word = request.query_params.get('word', None)

            if id: # 아이디에 해당하는 단어 리턴
                try:
                    queryset = Word.objects.get(id=id)
                    rt_word = queryset.word
                    return Response(data=rt_word, status=status.HTTP_200_OK)
                except:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            
            elif rand: # 무작위 단어 리턴
                total = Word.objects.count()
                rand_id = random.randrange(1,total)   
                queryset = Word.objects.get(id=rand_id)
                rt_word = queryset.word
                data = {'word':rt_word, 'id':rand_id}
                return Response(data=data, status=status.HTTP_200_OK)
            
            elif word: # 단어 데이터베이스에 있는지 체크
                try:
                    queryset = Word.objects.get(word=word)
                    return Response(data=True, status=status.HTTP_200_OK)
                except:
                    return Response(data=False, status=status.HTTP_200_OK)
                

            return Response(status=status.HTTP_400_BAD_REQUEST)
    