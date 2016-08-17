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
        uid = ActivationKeyUtils.get_user_uidb64(user)
        token = ActivationKeyUtils.get_token(user)
        username = user.username
        to_email = user.email
        body_context = {'host': ActivationMailFactory.host, 'uidb64': uid, 'token': token, 'username': username,
                        'uri': reverse('activation')}
        msg = ActivationMailFactory.default_msg.render(body_context)
        print(msg)
        send_mail(ActivationMailFactory.default_subject, msg, ActivationMailFactory.from_email, [to_email],
                  fail_silently=False)


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
