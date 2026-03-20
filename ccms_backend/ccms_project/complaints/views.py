from rest_framework import viewsets, permissions, exceptions
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
        if getattr(user, 'role', '') == 'admin' or user.is_staff:
            return Complaint.objects.all()

        # Student sees only their complaints
        try:
            student = Student.objects.get(email=user.email)
            return Complaint.objects.filter(student=student)
        except Student.DoesNotExist:
            return Complaint.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        
        # If admin tries to create a complaint from frontend dashboard, it might fail unless they are a student.
        # But for this feature, we assume a student is submitting it.
        try:
            student = Student.objects.get(email=user.email)
            serializer.save(student=student, department=student.department)
        except Student.DoesNotExist:
            raise exceptions.PermissionDenied("You must be a registered student to submit a complaint.")

    def perform_update(self, serializer):
        instance = serializer.save()
        status_val = self.request.data.get('status')
        
        if status_val:
            from complaint_status.models import ComplaintStatus
            ComplaintStatus.objects.create(
                complaint=instance,
                status=status_val
            )