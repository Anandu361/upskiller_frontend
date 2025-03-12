from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser

@receiver(post_save, sender=CustomUser)
def create_custom_user(sender, instance, created, **kwargs):
    if created:
        # You can add default values for new users if needed.
        instance.age = 18  # Default age, change as required
        instance.gender = "Other"  # Default gender
        instance.study_preference = "Visual"  # Default study preference
        instance.save()
