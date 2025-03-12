# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

class CustomUser(AbstractUser):
    age = models.PositiveIntegerField(null=True, blank=True)

    gender = models.CharField(
        max_length=10,
        choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')],
        default='Other',  # Default value
        null=True,
        blank=True
    )

    study_preference = models.CharField(
        max_length=20,
        choices=[('Visual', 'Visual'), ('Text', 'Text'), ('Kinematics', 'Kinematics')],
        default='Visual',  # Default value
        null=True,
        blank=True
    )

    objects = UserManager()

    def save(self, *args, **kwargs):
        # Debugging
        print(f"Saving User: age={self.age}, gender={self.gender}, study_preference={self.study_preference}")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
