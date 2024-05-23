from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('superuser/users/<slug:slug>/',
         views.destroy_user, name='destroy_user'),
    path('superuser/threads/<slug:slug>/',
         views.destroy_thread, name='destroy_thread'),

    path('auth/register/', views.UserRegister.as_view(), name='register'),
    path('auth/login/', views.CustomTokenObtainPairView.as_view(), name='login'),
    path('auth/token_refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', views.LogoutView.as_view(), name='logout'),

    path('users/', views.user_list, name='user_list'),
    path('users/<slug:slug>/', views.user_detail, name='user_detail'),

    path('categories/', views.category_list, name='category_list'),
    path('categories/<int:pk>/', views.category_detail, name='category_detail'),

    path('threads/', views.thread_list, name='thread_list'),
    path('threads/<slug:slug>/', views.thread_detail, name='thread_detail'),

    path('posts/', views.post_list, name='post_list'),
    path('posts/<int:pk>/', views.post_detail, name='post_detail'),

    path('search/', views.universal_search, name='search')
]
