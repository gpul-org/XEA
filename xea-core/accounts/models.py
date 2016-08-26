from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    # Gender strings
    MALE = 'M'
    FEMALE = 'F'
    OTHER = 'O'

    GENDER_CHOICES = ((MALE, 'Male'), (FEMALE, 'Female'), (OTHER, 'Other'))

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    birthday = models.DateField(null=True)
    nationality = models.CharField(max_length=140, blank=True) ## Or use django_countries?
    location = models.CharField(max_length=300, blank=True)
    ## mobile_number = models.CharField(max_length=140)
    ## address = models.CharField(max_length=140)
    ## profile_picture = models.ImageField(upload_to='', blank=True)
    ## phone_number = models.IntegerField(max_length=20)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance)


    def __str__(self):
        return u'Profile of user: %s' % self.user.username


'''
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    queryset = UserProfile.objects.get(user=instance)
    profile = queryset
    profile.save()
'''
'''
# Date strings
JANUARY = 'Jan'
FEBRUARY = 'Feb'
MARCH = 'Mar'
APRIL = "Apr"
MAY = 'May'
JUNE = 'Jun'
JULY = 'Jul'
AUGUST = 'Aug'
SEPTEMBER = 'Sep'
OCTOBER = 'Oct'
NOVEMBER = 'Nov'
DECEMBER = 'Dec'

MONTH_CHOICES = ((JANUARY, 'January'), (FEBRUARY, 'February'), (MARCH, 'March'), (APRIL, 'April'), (MAY, ' May'),
                 (JUNE, 'June'), (JULY, 'July'), (AUGUST, 'August'), (SEPTEMBER, 'September'), (OCTOBER, 'October'),
                 (NOVEMBER, 'November'), (DECEMBER, 'December'))
'''