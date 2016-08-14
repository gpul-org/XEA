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

    def register_user(self):
        """
        A simple function used to register a new user by sending a POST to the registration endpoint
        :return: The id (pk) of the newly registered user
        """
        response = self.client.post(self.registration_url, self.payload)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        id = response.data['id']
        return id

    def build_detail_url(self,id):
        """
        This simple function attaches the "pk" parameter to the activation url
        :param id: the id of the user associated to the url
        :return: the complete url to be used for the request
        """
        url = '{prefix}{pk}'.format(prefix=self.activation_url, pk=id)
        return url

    def test_register_user(self):
        """
        In this test we verify that after a new user is registered we can find him by querying the database
        We also verify that his "is_active" flag is set to False (he needs to activate trough the email yet)
        :return:
        """
        id = self.register_user()
        queryset = User.objects.all().filter(username='prova')
        self.assertTrue(queryset.exists())
        newuser = queryset[0]
        self.assertFalse(newuser.is_active)

    def test_activate_user(self):
        """
        Here we verify that a user can be activated through a request to the URL we provide
        :return:
        """
        id = self.register_user()
        detail_url = self.build_detail_url(id)
        response = self.client.get(detail_url)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_reusing_activation_link(self):
        """
        If a client tries to access the activation URL but the user is already active the response should be a HTTP 403
        :return:
        """
        id = self.register_user()
        detail_url = self.build_detail_url(id)
        response1 = self.client.get(detail_url)
        self.assertEquals(response1.status_code, status.HTTP_204_NO_CONTENT)
        response2 = self.client.get(detail_url)
        self.assertEquals(response2.status_code, status.HTTP_403_FORBIDDEN)

    def test_not_existing_entry_activation_link(self):
        """
        Here we prove that we forbid the access to a URL that is not associated with a registered user
        :return: 
        """
        self.register_user()
        # For the sake of flexibility we actually get the number of entries currently stored in the database (1)
        queryset = User.objects.all()
        n_registered_users = queryset.count()
        detail_url = self.build_detail_url(n_registered_users + 1)
        response = self.client.get(detail_url)
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)