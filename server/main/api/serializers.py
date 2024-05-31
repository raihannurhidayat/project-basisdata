from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # add custom claim
        token['username'] = user.username
        token['email'] = user.email
        token['slug'] = user.slug

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        data.update({'username': self.user.username})
        data.update({'email': self.user.email})
        data.update({'slug': self.user.slug})

        return data


class UserSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ('username', 'slug', 'email', 'profile_picture_url',
                  'user_bio', 'birth_date', 'date_joined')
        read_only_fields = ('email', 'date_joined')


class CategorySerializer(serializers.ModelSerializer):
    threads = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('category_id', 'category_name', 'slug', 'threads')
        read_only_fields = ('category_id', 'slug')

    def get_threads(self, obj):
        threads = Thread.objects.filter(
            category=obj.category_id).filter(is_active=True)
        serializer = ThreadResponseSerializer(threads, many=True)

        return serializer.data

# Thread serializers


class ThreadRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ('thread_name', 'thread_desc', 'category')


class ThreadValidateUpdateSerializer(serializers.ModelSerializer):
    thread_picture_url = serializers.ImageField(required=False)

    class Meta:
        model = Thread
        fields = ('thread_name', 'thread_desc', 'category',
                  'thread_picture_url', 'is_closed')


class ThreadResponseSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field="slug", read_only=True)
    # created_by = serializers.SlugRelatedField(
    #     slug_field="slug", read_only=True)
    created_by = UserSerializer(read_only=True)
    since_last_post = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = ('thread_name', 'slug', 'thread_desc', 'category', 'thread_picture_url',
                  'created_at', 'modified_at', 'created_by', 'is_closed', 'since_last_post')

    def get_since_last_post(self, object):
        try:
            queryset = Post.objects.filter(
                thread=object).latest('created_at')
        except ObjectDoesNotExist as e:
            queryset = object

        return queryset.created_at


# Post serializers


class PostRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('post_content', 'reply_to')


class PostResponseSerializer(serializers.ModelSerializer):
    # detail = serializers.SerializerMethodField()
    thread = serializers.SlugRelatedField(slug_field="slug", read_only=True)
    # created_by = serializers.SlugRelatedField(
    #     slug_field="slug", read_only=True)
    created_by = UserSerializer(read_only=True)

    # optional_fields = ('detail',)

    class Meta:
        model = Post
        fields = ('thread', 'post_id', 'post_content', 'reply_to',
                  'created_by', 'created_at', 'modified_at', 'is_active')

    # def get_detail(self, object):
    #     if not object.post_content:
    #         return {'deleted': True, 'message': "Post has been deleted"}

    #     return None

    # def to_representation(self, instance):
    #     rep = super().to_representation(instance)

    #     for field in self.optional_fields:
    #         try:
    #             if rep[field] is None:
    #                 rep.pop(field)
    #         except KeyError:
    #             pass

    #     return rep
