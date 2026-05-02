import json
from notification_app.services import get_connection
from django.conf import settings

def publish_notification(message: dict):
    connection = None

    try:
        connection = get_connection()

        if connection is None:
            print(" Cannot publish: No connection")
            return False

        channel = connection.channel()

        channel.queue_declare(
            queue=settings.RABBITMQ_CONFIG["QUEUE"],
            durable=True
        )

        channel.basic_publish(
            exchange="",
            routing_key=settings.RABBITMQ_CONFIG["QUEUE"],
            body=json.dumps(message)
        )

        print("  Sent:", message)
        return True

    except Exception as e:
        print(" Publish failed:", str(e))
        return False

    finally:
        try:
            if connection and connection.is_open:
                connection.close()
        except:
            pass