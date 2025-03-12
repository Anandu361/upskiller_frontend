from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Extend the existing fieldsets to include the custom fields
    fieldsets = UserAdmin.fieldsets + (
        ("Additional Info", {'fields': ('age', 'gender', 'study_preference')}),
    )

    # Add custom fields to the add form
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Additional Info", {'fields': ('age', 'gender', 'study_preference')}),
    )

    # Display custom fields in the list view
    list_display = ('username', 'email', 'age', 'gender', 'study_preference', 'is_staff', 'is_active')
    list_filter = ('gender', 'study_preference', 'is_staff', 'is_active')
