# pylint: disable=no-member
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Need to add another field? Add it in the relevant model and put default=''. makemigrations
# Then select option 2 from the terminal and migrate

class Place(models.Model):
  name = models.CharField(max_length=50) 
  address = models.CharField(max_length=50)
  postcode = models.CharField(max_length=8)
  latitude = models.DecimalField(max_digits=6, decimal_places=3, null=True)
  longitude = models.DecimalField(max_digits=6, decimal_places=3, null=True)
  description = models.CharField(max_length=300, default='')
  image = models.CharField(max_length=500)
  facilities = models.ManyToManyField('facilities.Facility', related_name='facilities', blank=True)

  def __str__(self):
    return self.name

class Comment(models.Model):
  text = models.CharField(max_length=300)
  place = models.ForeignKey(Place, related_name="comments", null=True, on_delete=models.CASCADE)
  owner = models.ForeignKey(User, related_name='comments', null=True, on_delete=models.CASCADE)

  def __str__(self):
    return f'Comment {self.id} on {self.place}'