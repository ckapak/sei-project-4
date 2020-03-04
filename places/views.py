# pylint: disable=no-member
from rest_framework.views import APIView 
from rest_framework.response import Response 

from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Place, Comment
from .serializers import PlaceSerializer, PopulatedPlaceSerializer, CommentSerializer

from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance

class PlaceListView(APIView): 
    permission_classes = (IsAuthenticatedOrReadOnly, )

# filter locations
    def get(self, request):
      """
      Optionally restricts the returned place to a given user,
      by filtering against a `postcode` query parameter in the URL.
      """
      queryset = None 

      latitude = self.request.query_params.get('latitude', None)
      longitude = self.request.query_params.get('longitude', None)    
      if latitude is not None and longitude is not None:
        user_location = Point(float(longitude), float(latitude), srid=4326)
        queryset = Place.objects.annotate(distance=Distance('location', user_location)).order_by('distance')[0:3]
      else:
        queryset = Place.objects.all()

      postcode = self.request.query_params.get('postcode', None)
      if postcode is not None:
        queryset = queryset.filter(postcode__istartswith=postcode)

      facilities = self.request.query_params.get('facilities', None)
      if facilities is not None:
        queryset = queryset.filter(facilities__name__icontains=facilities)
      
      serialized_place = PopulatedPlaceSerializer(queryset, many=True)

      return Response(serialized_place.data) # send the JSON to the client

# create a place
    def post(self, request):
      place = PlaceSerializer(data=request.data)
      request.data['owner'] = request.user.id 
      if place.is_valid():
        place.save()
        return Response(place.data, status=HTTP_201_CREATED)
      return Response(place.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class PlaceDetailView(APIView): 

# get a single place
    def get(self, _request, pk):
      try:
        place = Place.objects.get(pk=pk) # get a place by id 
        serialized_place = PopulatedPlaceSerializer(place)
        return Response(serialized_place.data)
      except Place.DoesNotExist:
        return Response({ 'message': 'Not found'}, status=HTTP_404_NOT_FOUND)  

# update a single place
    def put(self, request, pk):
      try:
        place = Place.objects.get(pk=pk)
        updated_place = PlaceSerializer(place, data=request.data)
        if updated_place.is_valid():
          updated_place.save()
          return Response(updated_place.data, status=HTTP_202_ACCEPTED)
        return Response(updated_place.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
      except Place.DoesNotExist:
        return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

# delete a single place
    def delete(self, _request, pk):
      try:
        place = Place.objects.get(pk=pk)
        place.delete()
        return Response(status=HTTP_204_NO_CONTENT)
      except Place.DoesNotExist:
        return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

class CommentListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

# create a comment
    def post(self, request, pk):
      request.data['place'] = pk
      request.data['owner'] = request.user.id
      comment = CommentSerializer(data=request.data)

      if comment.is_valid():
        print(request.data)
        comment.save()
        place = Place.objects.get(pk=pk)
        serialized_place = PopulatedPlaceSerializer(place)

        return Response(serialized_place.data, status=HTTP_201_CREATED)

      return Response(status=HTTP_422_UNPROCESSABLE_ENTITY)

class CommentDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

# delete a comment
    def delete(self, request, **kwargs):
      try:
        comment = Comment.objects.get(pk=kwargs['comment_pk'])
        if comment.owner.id != request.user.id:
          return Response(status=HTTP_401_UNAUTHORIZED)
        comment.delete()
        return Response(status=HTTP_204_NO_CONTENT)
      except Comment.DoesNotExist:
        return Response({ 'message': 'Not found'}, status=HTTP_404_NOT_FOUND)