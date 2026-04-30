import requests

CONSUL_URL = "http://127.0.0.1:8500"

def get_service_url(service_name):
    response = requests.get(
        f"{CONSUL_URL}/v1/agent/services"
    )

    services = response.json()

    for service_id, service in services.items():
        if service["Service"] == service_name:
            address = service.get("Address")
            port = service.get("Port")

            if not port:
                raise Exception(f"Port missing for {service_name}")

            return f"http://{address}:{port}"

    raise Exception(f"Service not found: {service_name}")