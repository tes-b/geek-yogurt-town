from django.urls import path
from . import views

app_name = 'backender'

urlpatterns = [
    path('', views.main, name='main'),
]