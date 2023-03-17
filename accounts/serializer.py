from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(required=True, write_only=True, style={'input_type':'password'})
    password_check = serializers.CharField(required=True, write_only=True, style={'input_type':'password'})

    def validate(self, attrs):
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({'username':'이미 존재하는 아이디 입니다.'})
        
        if attrs['password'] != attrs['password_check']:
            raise serializers.ValidationError({'password':'비밀번호가 일치하지 않습니다.'})

        return attrs
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )

        return user
    
    class Meta:
        model = User
        fields = ['id','username','password','password_check','plays','wins','tries']


