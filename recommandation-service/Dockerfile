FROM python:3.11

WORKDIR /app

COPY . .
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    gcc \
    && pip install mysqlclient
RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8003"]