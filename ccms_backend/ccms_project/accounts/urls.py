from django.urls import path
from .views import register, user_login, user_logout, dashboard

urlpatterns = [
    path('register/', register),
    path('login/', user_login),
    path('logout/', user_logout),
    path('dashboard/', dashboard),
]