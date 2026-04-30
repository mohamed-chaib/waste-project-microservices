from django.apps import AppConfig

import consul
class GatewayAppConfig(AppConfig):
    name = 'gateway_app'


    def ready(self):
        c = consul.Consul(host="127.0.0.1", port=8500)

        c.agent.service.register(
            name="gateway-service",
            service_id="gateway-service-1",
            address="127.0.0.1",
            port=8004,
            check=consul.Check.http(
                "http://127.0.0.1:8004/api/health/",
                interval="10s"
            )
        )


