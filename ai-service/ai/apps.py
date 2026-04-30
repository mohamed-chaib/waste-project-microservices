from django.apps import AppConfig

import consul

class AiConfig(AppConfig):
    name = "ai"

    def ready(self):
        c = consul.Consul(host="127.0.0.1", port=8500)
        try:
            c.agent.service.register(
                name="ai-service",
                service_id="ai-service-1",
                address="127.0.0.1",
                port=8001,
                check=consul.Check.http(
                    "http://127.0.0.1:8001/api/ai/health/",
                    interval="10s"
                )
            )
        except Exception as e:
            print("⚠️ Consul not available, skipping registration:", e)

        