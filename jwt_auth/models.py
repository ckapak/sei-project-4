from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  username = models.CharField(max_length=15, unique=True)
  email = models.CharField(max_length=40, unique=True)