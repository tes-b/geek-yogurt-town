from django.urls import path
from . import views


app_name = 'accounts'

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),

    # API
    path('api/signup/', views.UserSignUpView.as_view(), name='api_signup'),
    path('api/login/', views.UserLogInView.as_view(), name='api_login'),
]