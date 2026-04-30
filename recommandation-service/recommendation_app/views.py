from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Recommendation
from .serializers import RecommendationSerializer


@api_view(["GET"])
def health(request):
    return Response({"status": "Recommendation ok"})

@api_view(['POST'])
def create_recommendation(request):
    serializer = RecommendationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_recommendations(request):
    recs = Recommendation.objects.all()
    serializer = RecommendationSerializer(recs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_by_waste_type(request, waste_type):
    try:
        rec = Recommendation.objects.get(waste_type=waste_type)
        serializer = RecommendationSerializer(rec)
        return Response(serializer.data)
    except Recommendation.DoesNotExist:
        return Response({"error": "Not found"}, status=404)