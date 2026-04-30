from django.db import models

# Create your models here.
class Recommendation(models.Model):
    waste_type = models.CharField(max_length=100)
    is_recyclable = models.BooleanField()
    tips = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.waste_type