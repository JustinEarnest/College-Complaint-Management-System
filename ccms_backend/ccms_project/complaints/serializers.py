from rest_framework import serializers
from .models import Complaint
from complaint_status.models import ComplaintStatus

class ComplaintSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = Complaint
        fields = '__all__'
        read_only_fields = ['student', 'date_submitted', 'status']

    def get_status(self, obj):
        latest_status = ComplaintStatus.objects.filter(complaint=obj).order_by('-updated_at').first()
        return latest_status.status if latest_status else 'Pending'