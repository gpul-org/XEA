from rest_framework import status
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import UserProfile
from .serializers import UserProfileSerializer
from .permissions import IsAdminOrSelf


class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAdminOrSelf]

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = UserProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
