from django.db import models
from students.models import Student
from departments.models import Department

class Complaint(models.Model):
    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]
    CATEGORY_CHOICES = [
        ('Hostel', 'Hostel'),
        ('Academic', 'Academic'),
        ('Infrastructure', 'Infrastructure'),
        ('Technical', 'Technical'),
        ('Other', 'Other'),
    ]
    complaint_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    subject = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Medium')
    category = models.CharField(max_length=50, default='Other')
    date_submitted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject