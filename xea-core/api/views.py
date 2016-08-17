from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import detail_route
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model
from . import serializers
from .utils import TokenUtils


class RegisterUserView(CreateAPIView):
    model = get_user_model()
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.UserSerializer


class ActivateUserView(APIView):
    model = get_user_model()
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.UserSerializer

    def get(self, request, uidb64=None, token=None):
        if uidb64 is None or token is None:
            return Response({'msg': 'This activation link is not valid'}, status=status.HTTP_400_BAD_REQUEST)
        return self.activate_user(request, uidb64, token)

    @detail_route(methods=['get'])  # Is this useful at all?
    def activate_user(self, request, uidb64, token):
        uid = urlsafe_base64_decode(uidb64)
        try:
            user = get_user_model().objects.get(pk=uid)
            if TokenUtils.validate_token(user, token):
                if not user.is_active:
                    user.is_active = True
                    user.save()
                    return Response({'msg': 'The account had been activated correctly'},
                                    status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({},
                                    status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({},
                                status=status.HTTP_403_FORBIDDEN)
        except get_user_model().DoesNotExist:
            return Response({'msg': 'This activation link is not valid'}, status=status.HTTP_400_BAD_REQUEST)
