from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from .models import CustomUser
from rest_framework.decorators import api_view
import logging

# Registration View
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirmPassword')
        age = request.data.get('age')
        gender = request.data.get('gender')
        study_preference = request.data.get('studyPreference')

        # Check for existing username
        if CustomUser.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if passwords match
        if password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        # Validate required fields
        if not all([age, gender, study_preference]):
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create user
            user = CustomUser.objects.create_user(username=username, email=email, password=password)
            # Assign custom fields
            user.age = age
            user.gender = gender
            user.study_preference = study_preference
            user.save()

            return Response({"message": "Registration successful"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Log the error for debugging
            print(f"Error during registration: {e}")
            return Response({"error": "Registration failed, please try again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is not None:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'age': user.age,
                    'gender': user.gender,
                    'study_preference': user.study_preference,
                },
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


# Password Reset View
class PasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')

        try:
            # Check if email exists
            user = CustomUser.objects.get(email=email)
            # Logic for sending password reset email
            return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "Email not registered"}, status=status.HTTP_404_NOT_FOUND)


# Profile View
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            data = {
                "username": user.username,
                "email": user.email,
                "age": user.age,
                "gender": user.gender,
                "study_preference": user.study_preference,
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error fetching profile: {e}")
            return Response({"error": "Failed to fetch profile data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Test Home View (Optional)
@api_view(['GET'])
def home(request):
    return JsonResponse({"message": "Welcome to the Django Backend!"})
