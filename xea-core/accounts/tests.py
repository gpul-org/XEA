from django.contrib.auth.models import User
from django.core import mail
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import UserProfile


class UserProfileTest(APITestCase):
    # Default test user data
    username = 'prova'
    first_name = 'Prova'
    last_name = 'Prova'
    email = 'prova@prova.prova'
    password = 'usuario123'

    payload = dict(username=username, first_name=first_name, last_name=last_name, email=email, password=password)

    registration_url = reverse('registration')
    activation_url = reverse('activation')
    update_url = 'http://127.0.0.1:8000/accounts/profiles/1/'

    def get_activation_url_from_email(self, email):
        """
        here we parse the activation email to get the activation URL
        :param email: the activation email
        :return: The URL we parsed
        """
        url = "http" + email.body.split("http", 1)[1] + '/'
        return url

    def setUp(self):
        # We register a new user and we activate it
        self.client.post(self.registration_url, self.payload)
        activation_email = mail.outbox[0]
        url = self.get_activation_url_from_email(activation_email)
        self.client.get(url)

    def test_profile_creation(self):
        """
        Here we verify that creating a new user we automatically generate for him a new user profile
        :return:
        """
        queryset = UserProfile.objects.all()
        self.assertEquals(len(queryset),1)
        profile = queryset[0]
        print(profile)
        self.assertEquals(profile.user.username, self.username)

    def test_profile_updated_by_owner(self):
        queryset = User.objects.all()
        user = queryset[0]
        self.client.force_login(user)
        response = self.client.put(path=self.update_url, data={"gender": "M", "nationality": "Argosdfdegfsey",
                                                    "location": "palermo"})
        print(response.data)
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_profile_updated_by_staff(self):
        pass

    def test_profile_updated_by_logged_user(self):
        pass

    def test_profile_updated_by_guest(self):
        pass

    def test_get_user_profile(self):
        pass
