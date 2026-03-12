from django.contrib import admin
from django.urls import path, include
from complaints.views import CustomAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('complaints.urls')), 
    path('api/login/', CustomAuthToken.as_view()),
]