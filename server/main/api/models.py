from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from . import managers

# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, null=True)
    email = models.EmailField(max_length=100, unique=True, null=True)
    profile_picture_url = models.TextField(blank=True, null=True)
    user_bio = models.TextField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = managers.UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username', )

    def deactivate_user(self):
        # Delete all user detail
        self.is_active = False
        self.slug = None
        self.username = "User Deleted"
        self.email = None
        self.profile_picture_url = None
        self.user_bio = None
        self.birth_date = None
        self.save()

    def save(self, *args, **kwargs):
        if not self.slug == None and not self.slug:
            self.slug = slugify(self.username)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50)

    class Meta:
        verbose_name_plural = "Categories"

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
    is_closed = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.thread_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.thread_name


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    post_id = models.IntegerField()
    post_content = models.TextField()
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    reply_to = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.SET_NULL)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = (
            models.UniqueConstraint(
                fields=('thread', 'post_id'), name="thread_post_id"
            ),
        )

    def save(self, *args, **kwargs):
        if not self.post_id:
            # get id of latest post
            last_post = Post.objects.filter(
                thread=self.thread).order_by('-post_id').first()

            if last_post:
                self.post_id = last_post.post_id + 1
            else:
                self.post_id = 1

            super().save(*args, **kwargs)

    def __str__(self):
        return f"Post({self.thread.thread_id}:{self.post_id}) by {self.created_by.slug}"
