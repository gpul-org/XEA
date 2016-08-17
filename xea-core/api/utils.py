from django.core.mail import send_mail
from django.conf import settings
from django.core.urlresolvers import reverse
from django.template.loader import get_template
from django.contrib.auth.tokens import default_token_generator


class ActivationMailFactory:
    from_email = settings.EMAIL_HOST_USER
    password = settings.EMAIL_HOST_PASSWORD
    default_subject = 'Your account needs to be activated'
    default_msg = get_template('activation_mail_template.txt')
    host = settings.SITE_HOST

    @staticmethod
    def send_activation_mail(to_email, uid, username, token):
        context = {'host': ActivationMailFactory.host, 'uidb64': uid, 'token': token, 'username': username,
                   'uri': reverse('activation')}
        msg = ActivationMailFactory.default_msg.render(context)
        print(msg)
        send_mail(ActivationMailFactory.default_subject, msg, ActivationMailFactory.from_email, [to_email],
                  fail_silently=False)


class TokenUtils:
    @staticmethod
    def get_token_for_link(user):
        token = default_token_generator.make_token(user)
        return token

    @staticmethod
    def validate_token(user, token):
        is_valid = default_token_generator.check_token(user, token)
        return is_valid
