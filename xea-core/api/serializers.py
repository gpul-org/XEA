from django.contrib.auth import get_user_model
from rest_framework import serializers
from validate_email_address import validate_email
from .utils import MailFactory

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id',
                  'username',
                  'password',
                  'email',
                  'first_name',
                  'last_name',
                  )
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        try:
            validate_email(validated_data['email'])
        except serializers.ValidationError:
            pass
        user = get_user_model().objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_active=False
        )

        user.set_password(validated_data['password'])
        user.save()
        email = validated_data['email']
        MailFactory.send_activation_mail(email,user.pk, validated_data['username'])
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super(UserSerializer, self).update(instance, validated_data)

