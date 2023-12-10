from django.urls import path
from . import views


urlpatterns = [
    path('trainer_list/', views.trainer_list, name='trainer_list'),
    path('trainer_create/', views.trainer_create, name='trainer_create'),
    path('trainer_update/<int:id>/', views.trainer_update, 
         name='trainer_update'),
    path('trainer_delete/<int:id>/', views.trainer_delete, 
         name='trainer_delete'), 
    path('subject_list/', views.subject_list, name='subject_list'),
    path('subject_create/', views.subject_create, name='subject_create'),
    path('subject_update/<int:id>/', views.subject_update, 
         name='subject_update'),
    path('subject_delete/<int:id>/', views.subject_delete, 
         name='subject_delete'), 
]
