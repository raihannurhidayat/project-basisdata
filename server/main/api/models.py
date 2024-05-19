from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# User Manager


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):

        if not email:
            raise ValueError('The Email field must be set')

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, email, password, **extra_fields)

# Create your models here.


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    profile_picture_url = models.TextField(blank=True, null=True)
    user_bio = models.TextField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username', )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.username)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.category_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.category_name


class Thread(models.Model):
    thread_id = models.AutoField(primary_key=True)
    thread_name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)
    thread_desc = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    thread_picture_url = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.thread_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.thread_name


class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    post_content = models.TextField()
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    reply_to = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.SET_NULL)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Post {self.post_id} by {self.created_by}"
