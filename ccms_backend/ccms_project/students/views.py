from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer