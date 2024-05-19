from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path('auth/register', views.register_user, name='register'),
    path('auth/login', views.login, name='login'),
    path('auth/logout', views.logout, name='logout'),

    path('users/', views.user_list, name='user_list'),
    path('users/<int:pk>/', views.user_detail, name='user_detail'),

    path('categories/', views.category_list, name='category_list'),
    path('categories/<int:pk>/', views.category_detail, name='category_detail'),

    path('threads/', views.thread_list, name='thread_list'),
    path('threads/<int:pk>/', views.thread_detail, name='thread_detail'),

    path('posts/', views.post_list, name='post_list'),
    path('posts/<int:pk>/', views.post_detail, name='post_detail'),
]
