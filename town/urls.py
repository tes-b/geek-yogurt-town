from django.urls import path
from . import views


app_name = 'town'

urlpatterns = [
    path('index/', views.index, name='index'),
]