from rest_framework import serializers
from django.contrib.auth import get_user_model

from facilities.models import Facility
from .models import Place, Comment
User = get_user_model

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = Facility
    field = ('id', 'username')

class FacilitySerializer(serializers.ModelSerializer):

  class Meta:
    model = Facility
    fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):

  class Meta:
    model = Comment
    fields = '__all__'

class PlaceSerializer(serializers.ModelSerializer):

  class Meta:
    model = Place
    fields = '__all__'

class PopulatedCommentSerializer(CommentSerializer):
  
  owner = UserSerializer()

class PopulatedPlaceSerializer(PlaceSerializer):
  facilities = FacilitySerializer(many=True)
  comments = CommentSerializer(many=True)

  class Meta:
    model = Place
    fields = '__all__'