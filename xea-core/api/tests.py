from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status


class RegistrationTest(APITestCase):
    username = 'prova1'
    first_name = 'Prova'
    last_name = 'Prova'
    email = 'prova@prova.prova'
    password = 'usuario123'
    test_logout_all_client_number = 3

    # Urls we are working with
    registration_url = reverse('registration')

    def test_register_user(self):
        """
        In this test we verify that a client can register a new user by sending a POST to the registration endpoint
        :return:
        """
        '''
        payload = '"username": "{username}", "password": "{password}, "email": "{email}", ' \
                  '"first_name": "{first_name}", "last_name": "{last_name}"'.format(username=self.username,
                                                                                    password=self.password,
                                                                                    email=self.email,
                                                                                    first_name=self.first_name,
                                                                                    last_name=self.last_name
                                                                                    )
        '''
        payload = {'username': 'prova', 'password': 'usuario123', 'email': 'prova@prova.prova',
                   'first_name': 'Prova', 'last_name': 'Prova'}

        response = self.client.post(self.registration_url, payload)
        queryset = User.objects.all()
        #assert('prova' in queryset)
