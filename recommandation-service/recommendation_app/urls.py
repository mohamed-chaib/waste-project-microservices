from django.urls import path
from .views import (
    create_recommendation,
    get_recommendations,
    get_by_waste_type,
    health
)

urlpatterns = [
    path('', get_recommendations),
    path('health/', health),
    path('create/', create_recommendation),
    path('<str:waste_type>/', get_by_waste_type),
]