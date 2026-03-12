from django.urls import path, include
from rest_framework.routers import DefaultRouter 
from .views import ComplaintViewSet,DepartmentViewSet,StatusViewSet,UserViewSet

router = DefaultRouter()
router.register(r'complaints',ComplaintViewSet,basename='complaint')
router.register(r'departments',DepartmentViewSet)
router.register(r'statuses',StatusViewSet)
router.register(r'users', UserViewSet)

urlpatterns=[
    path('', include(router.urls))
]