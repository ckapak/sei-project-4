from rest_framework import serializers
from facilities.models import Facility
from .models import Place

class FacilitySerializer(serializers.ModelSerializer):

  class Meta:
    model = Facility
    fields = '__all__'

class PlaceSerializer(serializers.ModelSerializer):

  class Meta:
    model = Place
    fields = ('id', 'name')

class PopulatedPlaceSerializer(PlaceSerializer):

  facilities = PlaceSerializer(many=True)

  class Meta:
    model = Place
    fields = '__all__'