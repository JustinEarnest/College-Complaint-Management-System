from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer
from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer