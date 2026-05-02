from django.apps import AppConfig
from django.conf import settings
import consul
import time


class RecommendationAppConfig(AppConfig):
    name = 'recommendation_app'

    def ready(self):
        self.register_with_consul()

    def register_with_consul(self):
        for i in range(10):
            try:
                c = consul.Consul(
                    host=settings.CONSUL_HOST,
                    port=settings.CONSUL_PORT
                )

                c.agent.service.register(
                    name=settings.SERVICE_NAME,
                    service_id="recommendation-service-1",
                    address=settings.SERVICE_NAME,
                    port=settings.SERVICE_PORT,
                    check=consul.Check.http(
                        f"http://{settings.SERVICE_NAME}:{settings.SERVICE_PORT}/api/recommendations/health/",
                        interval="10s",
                        timeout="5s"
                    )
                )

                print(" Recommendation service registered in Consul")
                return

            except Exception as e:
                print(f" Consul not ready (retry {i+1})", e)
                time.sleep(3)

        print(" Failed to register recommendation service")