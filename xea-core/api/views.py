from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers


class RegisterUserView(CreateAPIView):

    model = get_user_model() # We actually use the standard User model
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.UserSerializer
'''
    def get(self, request):
        return Response({"msg": "Use a POST request to access this resource."})

    def post(self, request):

        return Response(None, status=status.HTTP_204_NO_CONTENT)
'''