import jwt

from django.shortcuts    import render, get_object_or_404
from django.urls         import reverse
from django.contrib.auth import authenticate

from rest_framework             import generics, status
from rest_framework.views       import APIView
from rest_framework.response    import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from config.settings import SECRET_KEY

from .serializer import *

def setting(request):
    return render(request, 'accounts/setting.html')

def signup(request):
    return render(request, 'accounts/signup.html')

def login(request):
    return render(request, 'accounts/login.html')

class UserSignUpView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            index_url = reverse('wordle:main')
            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "register successs",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                # status=status.HTTP_200_OK,
                status=status.HTTP_302_FOUND,
                headers={'Location': index_url}
            )
            
            # jwt 토큰 => 쿠키에 저장
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)
            
            return res
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserLogInView(APIView):
    # 유저 정보
    def get(self, request):
        try:
            # access token decode
            access = request.COOKIES['access']
            payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256']) # 토큰 디코드
            pk = payload.get('user_id') 
            user = get_object_or_404(User, pk=pk) # id 로 유저 받아옴
            serializers = UserSerializer(instance=user)
            return Response(serializers.data, status=status.HTTP_200_OK)
            
        except(jwt.exceptions.ExpiredSignatureError): # 토큰 만료
            data = {'refresh': request.COOKIES.get('refresh',None)}
            serializer = TokenObtainPairSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                access = serializer.data.get('access',None)
                refresh = serializer.data.get('refresh', None)
                payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
                pk = payload.get('user_id')
                user = get_object_or_404(User, pk=pk)
                serializer = UserSerializer(instance=user)
                res = Response(serializer.data, status=status.HTTP_200_OK)
                res.set_cookie('access', access)
                res.set_cookie('refresh', refresh)
                return res
            raise jwt.exceptions.InvalidTokenError

        except(jwt.exceptions.InvalidTokenError): # 사용 불가능한 토큰
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # 로그인
    def post(self, request):
        user = authenticate(
            username=request.data.get('username'),
            password=request.data.get('password')
        )

        if user is not None:
            serializer = UserSerializer(user)
            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    'user': serializer.data,
                    'message': 'login success',
                    'token': {
                        'access': access_token,
                        'refresh': refresh_token,
                    },
                },
                status=status.HTTP_302_FOUND,
                headers={'location': reverse('wordle:main')}
            )
            # 쿠키에 jwt토큰 저장
            res.set_cookie('access', access_token, httponly=True)
            res.set_cookie('refresh', refresh_token, httponly=True)
            return res
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # 로그아웃
    def delete(self, request):
        response = Response({
            'message': 'Logout success'
        }, status=status.HTTP_202_ACCEPTED)
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response

