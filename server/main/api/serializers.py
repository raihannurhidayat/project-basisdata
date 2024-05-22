from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User, Category, Thread, Post

User = get_user_model()


class AuthSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'slug', 'email', 'profile_picture_url',
                  'user_bio', 'birth_date', 'date_joined',)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category_name', )

# Thread serializers


class ThreadRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ('thread_name', 'thread_desc',
                  'category', 'thread_picture_url',)


class ThreadResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ('thread_name', 'slug', 'thread_desc', 'category', 'thread_picture_url',
                  'created_at', 'modified_at', 'created_by', 'is_closed')


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
