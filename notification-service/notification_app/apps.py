from django.apps import AppConfig
import threading
from .consumer import start_consumer

class NotificationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notification_app'

    def ready(self):
        try:
            thread = threading.Thread(target=start_consumer)
            thread.daemon = True
            thread.start()
        except Exception as e:
            print(" Failed to start consumer thread:", str(e))