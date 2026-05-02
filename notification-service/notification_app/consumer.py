import json
import time
from notification_app.services import get_connection
from django.conf import settings
from notification_app.email_service import send_confirmation_email

def callback(ch, method, properties, body):
    try:
        data = json.loads(body)

        event = data.get("event")

        if event == "USER_REGISTERED":
            email = data.get("email")

            if email:
                send_confirmation_email(email)
            else:
                print(" No email provided")

        else:
            print(" Unknown event:", data)

    except Exception as e:
        print(" Consumer error:", repr(e))


def start_consumer():
    while True:  # retry loop
        connection = None

        try:
            connection = get_connection()

            if connection is None:
                print(" Retrying connection in 5s...")
                time.sleep(5)
                continue

            channel = connection.channel()

            channel.queue_declare(
                queue=settings.RABBITMQ_CONFIG["QUEUE"],
                durable=True
            )

            channel.basic_consume(
                queue=settings.RABBITMQ_CONFIG["QUEUE"],
                on_message_callback=callback,
                auto_ack=True
            )

            print(" Listening for notifications...")
            channel.start_consuming()

        except Exception as e:
            print(" Consumer crashed:", str(e))
            print(" Restarting in 5 seconds...")
            time.sleep(5)

        finally:
            try:
                if connection and connection.is_open:
                    connection.close()
            except:
                pass