# from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import RecordSerializer
# from accounts.serializer import UserSerializer
from rest_framework.response import Response
from rest_framework import status
# import jwt
# from config.settings import SECRET_KEY
# from django.shortcuts import get_object_or_404
from .models import User

class RecordView(APIView):

    def post(self, request):
        try:
            serializer = RecordSerializer(data=request.data)
            if serializer.is_valid():
                print("SERIALIZER.VALID")
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
