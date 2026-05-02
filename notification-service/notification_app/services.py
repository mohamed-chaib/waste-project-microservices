import pika
from django.conf import settings

def get_connection():
    try:
        credentials = pika.PlainCredentials(
            settings.RABBITMQ_CONFIG["USER"],
            settings.RABBITMQ_CONFIG["PASSWORD"]
        )

        parameters = pika.ConnectionParameters(
            host=settings.RABBITMQ_CONFIG["HOST"],
            port=settings.RABBITMQ_CONFIG["PORT"],
            credentials=credentials
        )

        connection = pika.BlockingConnection(parameters)

        if connection.is_closed:
            raise Exception("Connection created but closed")

        return connection

    except Exception as e:
        print("RabbitMQ connection failed:", str(e))
        return None