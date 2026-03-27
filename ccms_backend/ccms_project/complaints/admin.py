from django.contrib import admin
from .models import Complaint

@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('subject', 'student', 'department', 'priority', 'category', 'date_submitted')
    list_filter = ('priority', 'category', 'department', 'date_submitted')
    search_fields = ('subject', 'description', 'student__name')