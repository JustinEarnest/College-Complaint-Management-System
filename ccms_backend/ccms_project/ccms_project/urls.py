from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from students.views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from departments.views import DepartmentViewSet
from students.views import StudentViewSet
from complaints.views import ComplaintViewSet
from complaint_status.views import ComplaintStatusViewSet

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'students', StudentViewSet)
router.register(r'complaints', ComplaintViewSet, basename='complaints')
router.register(r'complaint-status', ComplaintStatusViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),

    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]