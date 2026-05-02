import time
import socket
import consul

from django.apps import AppConfig
from django.conf import settings


class AiConfig(AppConfig):
    name = "ai"

    def ready(self):
        self.register_with_consul()

    def register_with_consul(self):
        for i in range(10):  # retry 10 times
            try:
                c = consul.Consul(
                    host=settings.CONSUL_HOST,
                    port=settings.CONSUL_PORT
                )

                service_address = socket.gethostbyname(socket.gethostname())

                c.agent.service.register(
                    name=settings.SERVICE_NAME,
                    service_id=f"{settings.SERVICE_NAME}-1",
                    address=service_address,
                    port=settings.SERVICE_PORT,
                    check=consul.Check.http(
                        f"http://{service_address}:{settings.SERVICE_PORT}/api/ai/health/",
                        interval="10s",
                        timeout="5s"
                    )
                )

                print(" AI Service registered in Consul")
                return

            except Exception as e:
                print(f"⏳ Consul not ready (attempt {i+1}), retrying...", e)
                time.sleep(3)

        print(" Failed to register AI service in Consul")