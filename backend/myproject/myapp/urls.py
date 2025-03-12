from django.urls import path
from .views import RegisterView, LoginView, PasswordResetView, ProfileView, home

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('profile/', ProfileView.as_view(), name='profile'),  # Added ProfileView
    path('', home, name='home'),
]
