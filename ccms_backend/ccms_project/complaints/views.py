from rest_framework import viewsets, permissions
from .models import Complaint
from .serializers import ComplaintSerializer
from students.models import Student

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Admin can see all complaints
        if user.is_staff:
            return Complaint.objects.all()

        # Student sees only their complaints
        try:
            student = Student.objects.get(email=user.email)
            return Complaint.objects.filter(student=student)
        except Student.DoesNotExist:
            return Complaint.objects.none()