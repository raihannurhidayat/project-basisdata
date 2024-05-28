from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Category, Thread, Post
from .forms import CustomUserCreationForm, CustomUserChangeForm


# Objects wide action
@admin.action(description="Set selected objects as inactive")
def set_objects_inactive(modeladmin, request, queryset):
    queryset.update(is_active=False)


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('email', 'is_staff', 'is_active', )
    list_filter = ('is_staff', 'is_active', )
    actions = (set_objects_inactive,)

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


class ThreadAdmin(admin.ModelAdmin):
    model = Thread
    list_display = ('thread_name', 'is_active')
    list_filter = ('category', 'is_closed')
    ordering = ('thread_id',)
    actions = (set_objects_inactive, 'deactivate_thread')

    @admin.action(description="Deactivate selected threads")
    def deactivate_thread(self, request, queryset):
        for thread in queryset:
            thread.deactivate_thread()

    def get_queryset(self, request):
        return self.model.full_objects.all()


class PostAdmin(admin.ModelAdmin):
    model = Post
    actions = (set_objects_inactive, 'deactivate_posts')

    @admin.action(description="Deactivate selected posts")
    def deactivate_posts(self, request, queryset):
        for post in queryset:
            post.deactivate_post()


# Register your models here.
admin.site.register(User, CustomUserAdmin)
admin.site.register(Category)
admin.site.register(Thread, ThreadAdmin)
admin.site.register(Post, PostAdmin)
