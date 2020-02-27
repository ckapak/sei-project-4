# pylint: disable=no-member

from django.db import models

# Need to add another field? Add it in the relevant model and put default=''. makemigrations
# Then select option 2 and migrate

class Place(models.Model):
  name = models.CharField(max_length=50) 
  address = models.CharField(max_length=50)
  postcode = models.CharField(max_length=8)
  latitude = models.DecimalField(max_digits=6, decimal_places=3)
  longitude = models.DecimalField(max_digits=6, decimal_places=3)
  description = models.CharField(max_length=300, default='')
  image = models.CharField(max_length=500)
  facilities = models.ManyToManyField('facilities.Facility', related_name='facilities', blank=True)

  def __str__(self):
    return self.name
