from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
        - Allows free access to the /health/ route.
        - Allows any method (GET, etc) only if authenticated.
        - POST, PUT, DELETE only if admin.
    """

    def has_permission(self, request, view):
        if request.path.startswith('/health/'):
            return True

        if not request.user or not request.user.is_authenticated:
            return False

        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_staff
