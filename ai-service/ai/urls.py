from django.urls import path
from .views import health,upload_and_predict

urlpatterns = [
    path("upload/", upload_and_predict),
    path('health/', health),

]

from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)