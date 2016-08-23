from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import detail_route
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from . import serializers
from .utils import ActivationKeyUtils


class RegisterUserView(CreateAPIView):
    model = get_user_model()
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.UserSerializer


class ActivateUserView(APIView):
    model = get_user_model()
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.UserSerializer

    def get(self, request, uidb64=None, token=None):
        # First, if client is accessing to the activation url's root we have to refuse his request
        if uidb64 is None or token is None:
            return Response({'msg': 'This activation link is not valid'}, status=status.HTTP_403_FORBIDDEN)
        # Then we start validating those two fields
        try:
            user = self.get_user_to_activate(uidb64)
        except get_user_model().DoesNotExist:
            return Response({'msg': 'This activation link is not valid'}, status=status.HTTP_400_BAD_REQUEST)

        # Now validate the token
        if ActivationKeyUtils.validate_token(user, token):  # If it's valid we can start activation process
            return self.activate_user(user)

        # Otherwise we send a 400
        return Response({},
                        status=status.HTTP_400_BAD_REQUEST)

    def activate_user(self, user):
        if user.is_active:  # If the user is using an activation link being already active we send a 403
            return Response({},
                            status=status.HTTP_403_FORBIDDEN)
        else:  # Otherwise we can activate the account
            user.is_active = True
            user.save()
            return Response({'msg': 'The account had been activated correctly'},
                            status=status.HTTP_204_NO_CONTENT)

    def get_user_to_activate(self, uidb64):
        uid = ActivationKeyUtils.decode_user_uidb64(uidb64)
        user = get_user_model().objects.get(pk=uid)
        return user