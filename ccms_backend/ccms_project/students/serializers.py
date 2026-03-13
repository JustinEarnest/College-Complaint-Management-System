from rest_framework import serializers
from .models import Student
from departments.models import Department
from django.contrib.auth.models import User
from rest_framework import serializers


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Student
from departments.models import Department


class RegisterSerializer(serializers.ModelSerializer):

    phone = serializers.CharField(write_only=True)
    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        write_only=True
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone', 'department']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):

        phone = validated_data.pop('phone')
        department = validated_data.pop('department')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        Student.objects.create(
            name=user.username,
            email=user.email,
            phone=phone,
            department=department
        )

        return user