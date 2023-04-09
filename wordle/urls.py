from django.urls import path
from . import views
app_name = 'wordle'

urlpatterns = [
    path('', views.index, name='main'),
    path('stats', views.stats, name='stats'),

    # API
    path('api/', views.WordAPIView.as_view(), name='word')
]