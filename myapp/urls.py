from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    
    # Custom Admin Dashboard
    path('dashboard/', views.dashboard_index, name='dashboard_index'),
    path('dashboard/projects/', views.project_list, name='dashboard_projects'),
    path('dashboard/projects/add/', views.project_create, name='project_create'),
    path('dashboard/projects/<int:pk>/edit/', views.project_update, name='project_update'),
    path('dashboard/projects/<int:pk>/delete/', views.project_delete, name='project_delete'),
    
    path('dashboard/skills/', views.skill_list, name='dashboard_skills'),
    path('dashboard/skills/add/', views.skill_create, name='skill_create'),
    path('dashboard/skills/<int:pk>/delete/', views.skill_delete, name='skill_delete'),
    
    path('dashboard/messages/', views.message_list, name='dashboard_messages'),
    path('dashboard/messages/<int:pk>/delete/', views.message_delete, name='message_delete'),
    
    path('dashboard/profile/', views.profile_update, name='profile_update'),
]
