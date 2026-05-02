import json
import pika
import os
from dotenv import load_dotenv

load_dotenv()

def publish_event(event: dict):
    connection = None

    try:
        credentials = pika.PlainCredentials(
            os.getenv("RABBITMQ_USER"),
            os.getenv("RABBITMQ_PASSWORD")
        )

        parameters = pika.ConnectionParameters(
            host=os.getenv("RABBITMQ_HOST"),
            port=int(os.getenv("RABBITMQ_PORT")),
            credentials=credentials
        )

        connection = pika.BlockingConnection(parameters)
        channel = connection.channel()

        queue = os.getenv("RABBITMQ_QUEUE")

        channel.queue_declare(queue=queue, durable=True)

        channel.basic_publish(
            exchange="",
            routing_key=queue,
            body=json.dumps(event)
        )

        print(" Event sent:", event)

    except Exception as e:
        print(" Publish error:", str(e))

    finally:
        if connection and connection.is_open:
            connection.close()