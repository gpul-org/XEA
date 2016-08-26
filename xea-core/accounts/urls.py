from django.conf.urls import url, include
from rest_framework import routers
from .viewsets import UserProfileViewSet

app_name = 'accounts'

router = routers.SimpleRouter()
router.register(r'profiles', UserProfileViewSet, base_name='profiles')

urlpatterns = [
    url(r'^', include(router.urls)),
]
