from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Category, Thread, Post
from .forms import CustomUserCreationForm, CustomUserChangeForm


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('email', 'is_staff', 'is_active', )
    list_filter = ('email', 'is_staff', 'is_active', )

    fieldsets = (
        (None, {'fields': ('email', 'username', 'slug', 'password')}),
        ('User Detail', {'fields': ('profile_picture_url',
         'user_bio', 'birth_date', 'date_joined')}),
        ('Permissions', {'fields': ('is_staff',
         'is_active', 'groups', 'user_permissions', )})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': (
                'email', 'username', 'password1', 'password2', 'is_staff', 'groups', 'user_permissions'
            )
        })
    )

    search_fields = ('username', )
    ordering = ('username', )


# Register your models here.
admin.site.register(User, CustomUserAdmin)
admin.site.register(Category)
admin.site.register(Thread)
admin.site.register(Post)
