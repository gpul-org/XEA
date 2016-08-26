from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('gender', 'birthday', 'nationality', 'location')