from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.generics import CreateAPIView


from . import serializers


class RegisterUserView(CreateAPIView):

    model = get_user_model() # We actually use the standard User model
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.UserSerializer
