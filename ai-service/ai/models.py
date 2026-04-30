
from django.db import models
from django.conf import settings
import uuid

class Submission(models.Model):


    user_id = models.UUIDField() 
    input_image = models.URLField(max_length=500)
    output_image = models.URLField(max_length=500)
    waste_type = models.CharField(max_length=100)
    confidence = models.FloatField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "submissions"

    def __str__(self):
        return f"Submission {self.id} - {self.waste_type}"