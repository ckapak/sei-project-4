# pylint: disable=no-member
from rest_framework.views import APIView # get the APIView class from DRF
from rest_framework.response import Response # get the Response class from DRF

from .models import Place
from .serializers import PlaceSerializer, PopulatedPlaceSerializer # get the PlaceSerializer

class PlaceListView(APIView): # extend the APIView

    def get(self, _request):
        places = Place.objects.all() # get all the places
        serializer = PopulatedPlaceSerializer(places, many=True)

        return Response(serializer.data) # send the JSON to the client

class PlaceDetailView(APIView): # extend the APIView

    def get(self, _request, pk):
        place = Place.objects.get(pk=pk) # get a place by id 
        serializer = PlaceSerializer(place)

        return Response(serializer.data) # send the JSON to the client