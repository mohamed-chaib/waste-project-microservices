from django.apps import AppConfig

import consul
class AuthAppConfig(AppConfig):
    name = 'auth_app'

    def ready(self):
        c = consul.Consul(host="127.0.0.1", port=8500)

        c.agent.service.register(
            name="auth-service",
            service_id="auth-service-1",
            address="127.0.0.1",
            port=8002,
            check=consul.Check.http(
                "http://127.0.0.1:8002/api/auth/health/",
                interval="10s"
            )
        )

