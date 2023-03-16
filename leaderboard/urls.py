from django.urls import path
from . import views
app_name = 'leaderboard'

urlpatterns = [


    # API
    path('api/record/', views.RecordView.as_view(), name='record')
]