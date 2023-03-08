from django.urls import path
from . import views
app_name = 'wordle'

urlpatterns = [
    path('', views.index, name='index'),
    path('test', views.test, name='test'),
]