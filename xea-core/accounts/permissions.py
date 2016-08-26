from rest_framework import permissions


class IsAdminOrSelf(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_staff:
            return True
        if request.user == obj.user:
            return True
        return False

