from django.urls import path
from . import views


app_name = 'accounts'

urlpatterns = [
    path('login/', views.login, name='login'),
    path('setting/', views.setting, name='setting'),

    # API
    path('api/signup/', views.UserSignUpView.as_view(), name='api_signup'),
    path('api/login/', views.UserLogInView.as_view(), name='api_login'),
]