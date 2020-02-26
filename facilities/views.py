# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Facility
from .serializers import PopulatedFacilitySerializer

class FacilityListView(APIView):

  def get (self, _request):
    facilities = Facility.objects.all()
    serialized_facilities = PopulatedFacilitySerializer(facilities, many=True)
    return Response(serialized_facilities.data)