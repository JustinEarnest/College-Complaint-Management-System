from django.db import models
from complaints.models import Complaint

class ComplaintStatus(models.Model):
    status_id = models.AutoField(primary_key=True)
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)
    remarks = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.status