from django.urls import path
from .views import upload_image_gateway,me,register,login,refresh ,get_recommendations,create_recommendation,get_by_waste_type,health

urlpatterns = [
    path('health/', health),
    path("ai/upload/", upload_image_gateway),
    path("auth/me/", me),
    path("auth/register/", register),
    path("auth/login/", login),
    path('auth/refresh/', refresh),

    path('recommendations/', get_recommendations),
    path('recommendations/create/', create_recommendation),
    path('recommendations/<str:waste_type>/', get_by_waste_type),




]