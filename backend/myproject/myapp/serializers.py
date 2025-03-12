# serializers.py
from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'age', 'gender', 'study_preference', 'password']
        extra_kwargs = {
            'password': {'write_only': True},  # Password shouldn't be included in responses
        }

    # Validate and convert age
    def validate_age(self, value):
        try:
            value = int(value)  # Ensure age is an integer
        except (ValueError, TypeError):
            raise serializers.ValidationError("Age must be a valid positive integer.")
        if value <= 0:
            raise serializers.ValidationError("Age must be greater than zero.")
        return value

    # Validate gender
    def validate_gender(self, value):
        if value not in ['Male', 'Female', 'Other']:
            raise serializers.ValidationError("Invalid gender choice. Choose 'Male', 'Female', or 'Other'.")
        return value

    # Validate study preference
    def validate_study_preference(self, value):
        if value not in ['Visual', 'Text', 'Kinematics']:
            raise serializers.ValidationError("Invalid study preference. Choose 'Visual', 'Text', or 'Kinematics'.")
        return value

    # Custom creation logic to hash passwords
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user
