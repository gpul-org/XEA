from django.core.mail import send_mail
from django.conf import settings
from django.core.urlresolvers import reverse
from django.template.loader import get_template



class MailFactory:

    from_email = settings.EMAIL_HOST_USER
    password = settings.EMAIL_HOST_PASSWORD
    default_subject = 'Your account needs to be activated'
    default_msg = get_template('activation_mail_template.txt')
    host= settings.SITE_HOST

    @staticmethod
    def send_activation_mail(to_email, id, username):
        context = {'host': MailFactory.host, 'id': id, 'username': username, 'uri': reverse('activation')}
        msg = MailFactory.default_msg.render(context)
        send_mail(MailFactory.default_subject, msg, MailFactory.from_email, [to_email], fail_silently=False)




