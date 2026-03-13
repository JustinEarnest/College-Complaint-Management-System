from rest_framework import serializers
from .models import ComplaintStatus

class ComplaintStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplaintStatus
        fields = '__all__'