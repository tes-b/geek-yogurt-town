from django.urls import path
from . import views


app_name = 'town'

urlpatterns = [
    path('', views.index, name='index'),
]