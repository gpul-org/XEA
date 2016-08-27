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
    username2 = 'prova2'
    first_name2 = 'Prova'
    last_name2 = 'Prova'
    email2 = 'prova2@prova.prova'
    password2 = 'usuario123'

    payload1 = dict(username=username, first_name=first_name, last_name=last_name, email=email, password=password)
    payload2 = dict(username=username2, first_name=first_name2, last_name=last_name2, email=email2, password=password2)

    registration_url = reverse('registration')
    activation_url = reverse('activation')

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
        self.client.post(self.registration_url, self.payload1)
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
        #update_url = reverse('profiles-detail', kwargs={'pk': 1})
        response = self.client.put(path='/accounts/profiles/1/', data={"gender": "M", "nationality": "Argosdfdegfsey",
                                                    "location": "palermo"})
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_profile_updated_by_staff(self):
        admin = User.objects.create_superuser('admin', 'admin@domain.test','password')
        self.client.force_login(admin)
        response = self.client.put(path='/accounts/profiles/1/', data={"gender": "M", "nationality": "Argosdfdegfsey",
                                                                       "location": "palermo"})
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_profile_updated_by_logged_user(self):
        self.client.post(self.registration_url, self.payload2)
        activation_email = mail.outbox[1]
        url = self.get_activation_url_from_email(activation_email)
        self.client.get(url)
        queryset = User.objects.all()
        self.assertEquals(len(queryset), 2)
        user = queryset[1]
        self.client.force_login(user)
        response = self.client.put(path='/accounts/profiles/1/', data={"gender": "M", "nationality": "Argosdfdegfsey",
                                                                       "location": "palermo"})
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_profile_updated_by_guest(self):
        response = self.client.put(path='/accounts/profiles/1/', data={"gender": "M", "nationality": "Argosdfdegfsey",
                                                          "location": "palermo"})
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_user_profile(self):
        response = self.client.get('/accounts/profiles/1/')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertTrue('gender' in response.data)
        self.assertTrue('nationality' in response.data)
        self.assertTrue('birthday' in response.data)
        self.assertTrue('location' in response.data)
