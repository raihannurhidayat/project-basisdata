from django.urls import path
from .views import user_list, user_detail, category_list, category_detail, thread_list, thread_detail, post_list, post_detail

urlpatterns = [
    path('users/', user_list, name='user_list'),
    path('users/<int:pk>/', user_detail, name='user_detail'),

    path('categories/', category_list, name='category_list'),
    path('categories/<int:pk>/', category_detail, name='category_detail'),

    path('threads/', thread_list, name='thread_list'),
    path('threads/<int:pk>/', thread_detail, name='thread_detail'),

    path('posts/', post_list, name='post_list'),
    path('posts/<int:pk>/', post_detail, name='post_detail'),
]
