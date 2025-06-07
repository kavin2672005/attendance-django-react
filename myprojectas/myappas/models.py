from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
import uuid

class CustomUser(AbstractUser):
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'phone_number']  # remove 'username'

    username = models.CharField(max_length=150, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = str(uuid.uuid4())[:30]  # unique random string
        super().save(*args, **kwargs)



class Attendance(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField()
    punch_in = models.TimeField()
    punch_out = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.email} - {self.date}"
    
    
class Attendance(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    punch_in = models.TimeField()
    punch_out = models.TimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'date')  # ensures one record per user per day

    def __str__(self):
        return f"{self.user.email} - {self.date}"



