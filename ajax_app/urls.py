from django.urls import path
from . import views


urlpatterns = [
    path('trainer_list/', views.trainer_list, name='trainer_list'),
    path('trainer_create/', views.trainer_create, name='trainer_create'),
    path('trainer_update/<int:id>/', views.trainer_update, 
         name='trainer_update'),
]
