from django.core.mail import send_mail
from django.conf import settings
from django.core.urlresolvers import reverse
from django.template.loader import get_template
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode


class ActivationMailFactory:
    from_email = settings.EMAIL_HOST_USER
    password = settings.EMAIL_HOST_PASSWORD
    default_subject = 'activation_mail_subject_template.txt'
    default_msg = get_template('activation_mail_body_template.txt')
    host = settings.SITE_HOST

    @staticmethod
    def send_activation_mail(user):
        """
        This funcion is used to send a mail containing the activation link to the new user's email address
        :param user: The user object related to the new user account
        :return:
        """
        url = ActivationKeyUtils.build_activation_url(user)
        username = user.username
        to_email = user.email
        body_context = {'username': username,'host': ActivationMailFactory.host, 'url': url}
        msg = ActivationMailFactory.default_msg.render(body_context)
        print(msg)
        send_mail(subject=ActivationMailFactory.default_subject, message=msg,
                  from_email=ActivationMailFactory.from_email, recipient_list=[to_email], fail_silently=False)


class ActivationKeyUtils:
    @staticmethod
    def get_token(user):
        token = default_token_generator.make_token(user)
        return token

    @staticmethod
    def validate_token(user, token):
        is_valid = default_token_generator.check_token(user, token)
        return is_valid

    @staticmethod
    def get_user_uidb64(user):
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        return uid

    @staticmethod
    def decode_user_uidb64(uid):
        return urlsafe_base64_decode(uid)

    @staticmethod
    def build_activation_url(user):
        uidb64 = ActivationKeyUtils.get_user_uidb64(user)
        token = ActivationKeyUtils.get_token(user)
        activation_root_url = reverse('activation')
        url = '{root}{uidb64}/{token}'.format(root=activation_root_url,
                                              uidb64=uidb64.decode('utf8'), token=token)
        return url
