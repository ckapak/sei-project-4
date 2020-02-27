# pylint: disable=no-member
from rest_framework.views import APIView 
from rest_framework.response import Response 

from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Place, Comment
from .serializers import PlaceSerializer, PopulatedPlaceSerializer, CommentSerializer

class PlaceListView(APIView): 
    permission_classes = (IsAuthenticatedOrReadOnly, )

# get all the places
    def get(self, _request):
        places = Place.objects.all() # get all the places
        print(places)
        serialized_place = PopulatedPlaceSerializer(places, many=True)
        return Response(serialized_place.data) # send the JSON to the client

# create a place
    def post(self, request):
      place = PlaceSerializer(data=request.data)
      print(place)
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

class CommentListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

# create a comment
    def post(self, request, pk):
      request.data['place'] = pk
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