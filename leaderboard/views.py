import jwt

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import RecordSerializer

from config.settings import SECRET_KEY

from django.shortcuts import get_object_or_404

from accounts.models import User
from accounts.serializer import UserSerializer


class RecordView(APIView):

    def post(self, request):
        try:
            user_id = request.data.get('user')
            if user_id :
                try:
                    user = User.objects.get(pk=user_id)
                except User.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                
                user.plays += 1
                
                if request.data.get('result'):
                    tries = request.data.get('tries')
                    user.tries += tries
                    user.wins += 1
                
                user.save()

            serializer = RecordSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            
            return Response(status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
