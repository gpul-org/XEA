from django.core.urlresolvers import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
from django.core import mail


class RegistrationTest(APITestCase):
    # Default test user data
    username = 'prova'
    first_name = 'Prova'
    last_name = 'Prova'
    email = 'prova@prova.prova'
    password = 'usuario123'
    payload = dict(username=username, first_name=first_name, last_name=last_name, email=email, password=password)
    DEFAULT_NUMBER_OF_CLIENTS_FOR_TESTS = 3

    # Urls we are working with
    registration_url = reverse('registration')
    activation_url = reverse('activation')

    def get_n_users(self, n):
        """
        This generates n users with their data
        :param n: The number of users we want to create
        :return:
        """
        user = []
        for i in range(1, n + 1):
            myusername = self.username + str(i)
            myfirst_name = self.first_name + str(i)
            mylast_name = self.last_name + str(i)
            myemail = 'prova' + str(i) + '@prova.prova'
            mypassword = self.password
            newuser = User(username=myusername,
                           password=mypassword,
                           first_name=myfirst_name,
                           last_name=mylast_name,
                           email=myemail)
            user.append(newuser)
        return user

    def get_payload_from_user(self,user):
        """
        This function builds the payload used for registration requests from the user's data
        :param user:
        :return:
        """
        payload = dict(username=user.username,
                       first_name=user.first_name,
                       last_name=user.last_name,
                       email=user.email,
                       password=user.password)
        return payload

    def register_user(self):
        """
        A simple function used to register a new user by sending a POST to the registration endpoint
        :return: The id (pk) of the newly registered user
        """
        response = self.client.post(self.registration_url, self.payload)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        id = response.data['id']
        return id

    def register_n_users(self, n):
        user = self.get_n_users(n)
        id = []
        for i in range(0, n):
            response = self.client.post(self.registration_url, self.get_payload_from_user(user[i]))
            self.assertEquals(response.status_code, status.HTTP_201_CREATED)
            id.append(response.data['id'])
        return id

    def get_activation_email(self):
        """
        This function retrieves the activation mail from the mailbox
        :return:
        """
        self.assertEquals(len(mail.outbox), 1)
        activation_email = mail.outbox[0]
        return activation_email

    def get_n_activation_mails(self, n):
        self.assertEquals(len(mail.outbox), n)
        return mail.outbox

    def get_activation_url_from_email(self, email):
        """
        here we parse the activation email to get the activation URL
        :param email: the activation email
        :return: The URL we parsed
        """
        url = "http" + email.body.split("http", 1)[1] + '/'
        return url

    def test_register_user(self):
        """
        In this test we verify that after a new user is registered we can find him by querying the database
        We also verify that his "is_active" flag is set to False (he needs to activate trough the email yet)
        :return:
        """
        uid = self.register_n_users(1)[0]
        queryset = User.objects.all().filter(pk=uid)
        self.assertTrue(queryset.exists())
        newuser = queryset[0]
        self.assertFalse(newuser.is_active)
        return uid

    def test_register_multiple_users(self):
        """
        In this test we verify that after a new user is registered we can find him by querying the database
        We also verify that his "is_active" flag is set to False (he needs to activate trough the email yet)
        :return:
        """
        id = self.register_n_users(self.DEFAULT_NUMBER_OF_CLIENTS_FOR_TESTS)
        for i in range(0,self.DEFAULT_NUMBER_OF_CLIENTS_FOR_TESTS):
            queryset = User.objects.all().filter(pk=id[i])
            self.assertEquals(len(queryset), 1)
            self.assertTrue(queryset.exists())
            newuser = queryset[0]
            self.assertFalse(newuser.is_active)

    def test_activate_user(self):
        """
        Here we verify that a user can be activated through a request to the URL we provide
        :return:
        """
        self.register_user()
        activation_email = self.get_activation_email()
        url = self.get_activation_url_from_email(activation_email)
        response = self.client.get(url)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_reusing_activation_link(self):
        """
        If a client tries to access the activation URL but the user is already active the response should be a HTTP 403
        :return:
        """
        self.register_user()
        activation_email = self.get_activation_email()
        url = self.get_activation_url_from_email(activation_email)
        response1 = self.client.get(url)
        self.assertEquals(response1.status_code, status.HTTP_204_NO_CONTENT)
        response2 = self.client.get(url)
        self.assertEquals(response2.status_code, status.HTTP_403_FORBIDDEN)

    def test_not_existing_entry_activation_link(self):
        """
        Here we prove that we forbid the access to a URL that is not associated with a registered user
        :return:
        """
        self.register_user()
        url = 'http://127.0.0.1:8000/api/activation/MF/4eh-xxxxxxxxxxxxxxxx/'
        response = self.client.get(url)
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_not_valid_token(self):
        """
        Similar to the previous one, now we will try to use a valid uidb64 with a not valid token
        :return:
        """
        uid = self.register_user()
        uidb64 = urlsafe_base64_encode(force_bytes(uid))
        url = 'http://127.0.0.1:8000/api/activation/' + uidb64.decode('utf8') + '/4eh-xxxxxxxxxxxxxxxx/'
        response = self.client.get(url)
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_n_clients_activation_reverse_order(self):
        """
        in this test we register multiple clients and activate them in reverse order to prove that using an activation
        link doesn't invalidate another one
        :return:
        """
        id_client = self.register_n_users(self.DEFAULT_NUMBER_OF_CLIENTS_FOR_TESTS)
        mails = self.get_n_activation_mails(self.DEFAULT_NUMBER_OF_CLIENTS_FOR_TESTS)
        for i in range(self.DEFAULT_NUMBER_OF_CLIENTS_FOR_TESTS -1 , -1, -1):
            activation_url = self.get_activation_url_from_email(mails[i])
            response = self.client.get(activation_url)
            self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
