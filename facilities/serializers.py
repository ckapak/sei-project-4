from rest_framework import serializers
from places.models import Place
from .models import Facility

class PlaceSerializer(serializers.ModelSerializer):

  class Meta:
    model = Place
    fields = '__all__'

class FacilitySerializer(serializers.ModelSerializer):

  class Meta:
    model = Facility
    fields = '__all__'

class PopulatedFacilitySerializer(FacilitySerializer):

    places = PlaceSerializer(many=True)