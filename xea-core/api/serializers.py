from django.contrib.auth import get_user_model
from rest_framework import serializers
from .utils import MailFactory, TokenUtils
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

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
        user = get_user_model().objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_active=False
        )

        user.set_password(validated_data['password'])
        user.save()
        token = TokenUtils.get_token_for_link(user)
        email = validated_data['email']
        activation_link_id = urlsafe_base64_encode(force_bytes(user.pk))
        MailFactory.send_activation_mail(email, activation_link_id, validated_data['username'], token)
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super(UserSerializer, self).update(instance, validated_data)

