import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ccms_project.settings')
django.setup()

from students.models import Student
from departments.models import Department
from complaints.models import Complaint
from complaints.serializers import ComplaintSerializer
from complaint_status.models import ComplaintStatus
from accounts.models import User

# Create test data
if not Department.objects.exists():
    dept = Department.objects.create(dept_name="CS")
else:
    dept = Department.objects.first()

if not Student.objects.exists():
    user = User.objects.create(username="teststudent", email="test@test.com")
    student = Student.objects.create(name="teststudent", email="test@test.com", phone="123", department=dept)
else:
    student = Student.objects.first()

comp = Complaint.objects.create(student=student, department=dept, subject="Test Issue", description="Desc")

status_obj = ComplaintStatus.objects.create(complaint=comp, status="In Process")

serializer = ComplaintSerializer(comp)
print("Serialized data:", serializer.data)

comp.delete()
status_obj.delete()
