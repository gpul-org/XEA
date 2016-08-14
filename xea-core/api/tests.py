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
    activation_url = reverse('activation')


    def test_register_user(self):
        """
        In this test we verify that a client can register a new user by sending a POST to the registration endpoint
        The new User entity will have the "is_active" flag set to False
        :return:
        """
        response = self.client.post(self.registration_url, self.payload)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        queryset = User.objects.all().filter(username='prova')
        self.assertTrue(queryset.exists())
        newuser = queryset[0]
        self.assertFalse(newuser.is_active)

    def test_activate_user(self):
        response1 = self.client.post(self.registration_url, self.payload)
        self.assertEquals(response1.status_code, status.HTTP_201_CREATED)
        id = response1.data['id']
        detail_url = '{prefix}{userpk}'.format(prefix=self.activation_url, userpk=id)
        print(detail_url)
        response2 = self.client.get(detail_url)
        self.assertEquals(response2.status_code, status.HTTP_204_NO_CONTENT)

    def test_reusing_activation_link(self):
        response1 = self.client.post(self.registration_url, self.payload)
        self.assertEquals(response1.status_code, status.HTTP_201_CREATED)
        id = response1.data['id']
        detail_url = '{prefix}{userpk}'.format(prefix=self.activation_url, userpk=id)
        response2 = self.client.get(detail_url)
        self.assertEquals(response2.status_code, status.HTTP_204_NO_CONTENT)
        response3 = self.client.get(detail_url)
        self.assertEquals(response3.status_code, status.HTTP_403_FORBIDDEN)