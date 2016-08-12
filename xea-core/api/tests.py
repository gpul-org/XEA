from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status


class RegistrationTest(APITestCase):

    username = 'prova'
    first_name = 'Prova'
    last_name = 'Prova'
    email = 'prova@prova.prova'
    password = 'usuario123'
    payload = dict(username=username, first_name=first_name, last_name=last_name, email=email, password=password)

    # Urls we are working with
    registration_url = reverse('registration')

    def test_register_user(self):
        """
        In this test we verify that a client can register a new user by sending a POST to the registration endpoint
        :return:
        """

        response = self.client.post(self.registration_url, self.payload)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        queryset = User.objects.all()
        self.assertTrue(queryset.filter(username='prova').exists())

'''
        payload = {'username': 'prova', 'password': 'usuario123', 'email': 'prova@prova.prova',
                   'first_name': 'Prova', 'last_name': 'Prova'}
'''
