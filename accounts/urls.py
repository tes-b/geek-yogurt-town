from django.urls import path
from . import views


app_name = 'accounts'

urlpatterns = [
    path('signup/', views.signup, name='signup'),

    # API
    path('api/signup/', views.UserSignUpView.as_view(), name='api_signup'),
]