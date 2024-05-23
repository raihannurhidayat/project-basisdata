from django.shortcuts import render, get_object_or_404
from django.conf import settings
from rest_framework import views, status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from .utils import CustomPagination
from .models import User, Category, Thread, Post
from .serializers import (
    AuthSerializer,
    UserSerializer,
    CategorySerializer,
    ThreadRequestSerializer,
    ThreadValidateUpdateSerializer,
    ThreadResponseSerializer,
    PostRequestSerializer,
    PostResponseSerializer,
)

# Admin Views


@api_view(['DELETE',])
@permission_classes([permissions.IsAdminUser])
def destroy_user(request, slug):
    """Handle destroying user\n
    Warning: This will permanently remove user from database, along with its related threads and posts"""

    user = get_object_or_404(User, slug=slug)
    user.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE',])
@permission_classes([permissions.IsAdminUser])
def destroy_thread(request, slug):
    """Handle destroying thread\n
    Warning: This will permanently remove thread from database, along with its related posts"""

    thread = get_object_or_404(Thread, slug=slug)
    thread.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)


# Authentication Views


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:

            # set token in cookie
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=response.data['access'],
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                httponly=True,
                secure=settings.SIMPLE_JWT['COOKIE_SECURE'],
            )

            response.set_cookie(
                key=settings.SIMPLE_JWT['REFRESH_COOKIE'],
                value=response.data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                httponly=True,
                secure=settings.SIMPLE_JWT['COOKIE_SECURE'],
            )

            # delete token from response
            del response.data['refresh']
            del response.data['access']

        return response


class LogoutView(views.APIView):
    def post(self, request):
        response = Response({'detail': "Succesfully logout"},
                            status=status.HTTP_200_OK)
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        response.delete_cookie(settings.SIMPLE_JWT['REFRESH_COOKIE'])

        return response


class UserRegister(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AuthSerializer
    permission_classes = [permissions.AllowAny, ]


# Views untuk User


@api_view(['GET'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.filter(is_active=True)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, slug):
    user = get_object_or_404(User, slug=slug)
    auth_user = request.user

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    # check if it is the user that authenticated
    if auth_user.slug == user.slug:

        if request.method == 'PUT':
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            # delete user
            user.deactivate_user()

            response = Response(status=status.HTTP_204_NO_CONTENT)

            # delete token from cookie
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            response.delete_cookie(settings.SIMPLE_JWT['REFRESH_COOKIE'])

            return response

    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


# Views untuk Category


@api_view(['GET', 'POST'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def category_detail(request, pk):
    category = get_object_or_404(Category, pk=pk)

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Views untuk Thread


@api_view(['GET', 'POST'])
def thread_list(request):
    if request.method == 'GET':
        threads = Thread.objects.filter(is_active=True)
        serializer = ThreadResponseSerializer(threads, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ThreadRequestSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save(created_by=request.user)

            response = get_object_or_404(Thread, slug=instance.slug)

            return Response(ThreadResponseSerializer(response).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def thread_detail(request, slug):
    thread = get_object_or_404(Thread, slug=slug)
    user = request.user
    created_by = thread.created_by

    if request.method == 'GET':
        thread_serializer = ThreadResponseSerializer(thread)

        posts = thread.posts.all()
        paginator = CustomPagination()
        paginated_posts = paginator.paginate_queryset(posts, request=request)
        post_serializer = PostResponseSerializer(paginated_posts, many=True)

        response = thread_serializer.data
        response['posts'] = paginator.get_paginated_response(
            post_serializer.data).data

        return Response(response, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = PostRequestSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save(created_by=request.user, thread=thread)

            response = get_object_or_404(
                Post, thread=thread, post_id=instance.post_id)

            return Response(PostResponseSerializer(response).data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    if created_by == user:

        if request.method == 'PUT':
            serializer = ThreadValidateUpdateSerializer(
                thread, data=request.data)
            if serializer.is_valid():
                serializer.save()

                response = get_object_or_404(Thread, slug=slug)

                return Response(ThreadResponseSerializer(response).data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            thread.is_active = False
            thread.save()

            return Response(status=status.HTTP_204_NO_CONTENT)

    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


# Views untuk Post


@api_view(['GET'])
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostRequestSerializer(posts, many=True)
        return Response(serializer.data)

    # elif request.method == 'POST':
    #     serializer = PostRequestSerializer(data=request.data)
    #     if serializer.is_valid():
    #         instance = serializer.save(created_by=request.user)

    #         response = get_object_or_404(Post, slug=instance.slug)

    #         return Response(response.data, status=status.HTTP_201_CREATED)

    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)

    if request.method == 'GET':
        serializer = PostRequestSerializer(post)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PostRequestSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
