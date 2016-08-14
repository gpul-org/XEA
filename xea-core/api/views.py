from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import detail_route
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializers


class RegisterUserView(CreateAPIView):

    model = get_user_model()  # We actually use the standard User model
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.UserSerializer


class ActivateUserView(APIView):
    model = get_user_model()
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.UserSerializer

    def get(self, request, pk=None):
        return self.activate_user(request,pk)

    @detail_route(methods=['get']) # Is this useful at all?
    def activate_user(self, request, pk):
        if not pk:
            return Response({'msg': 'You cannot access this page'}, status=status.HTTP_403_FORBIDDEN)
        user = get_user_model().objects.get(pk=pk)
        if user.is_active:
            return Response({'msg': 'This user is already activated'}, status=status.HTTP_403_FORBIDDEN)
        user.is_active = True
        user.save()
        return Response({'msg': 'The account had been activated correctly'}, status=status.HTTP_204_NO_CONTENT)


