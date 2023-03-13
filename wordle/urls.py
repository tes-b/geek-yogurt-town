from django.urls import path
from . import views
app_name = 'wordle'

urlpatterns = [
    path('', views.index, name='main'),
    path('test', views.test, name='test'),

    # API
    path('api/', views.WordAPIView.as_view(), name='wordleapi')
]