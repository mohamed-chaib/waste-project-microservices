from django.apps import AppConfig

import consul
class RecommendationAppConfig(AppConfig):
    name = 'recommendation_app'
    def ready(self):

        c = consul.Consul(host="127.0.0.1", port=8500)
        c.agent.service.register(
            name='recommendation-service',
            service_id= 'recommendation-service-1',
            address='127.0.0.1',
            port=8003,
            check=consul.Check.http(
                "http://127.0.0.1:8003/api/recommendations/health/",
                interval="10s"
            )
        )