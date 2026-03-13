from rest_framework import viewsets
from .models import ComplaintStatus
from .serializers import ComplaintStatusSerializer

class ComplaintStatusViewSet(viewsets.ModelViewSet):
    queryset = ComplaintStatus.objects.all()
    serializer_class = ComplaintStatusSerializer