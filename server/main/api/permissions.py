from rest_framework.permissions import BasePermission, IsAdminUser, SAFE_METHODS


class IsAdminUserOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS and (request.user and request.user.is_authenticated):
            return True

        return bool(request.user and request.user.is_staff)
