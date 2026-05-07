FROM python:3.11

WORKDIR /app

COPY . .
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    gcc \
    && pip install --upgrade pip setuptools wheel \
    && pip install mysqlclient
RUN pip install --default-timeout=1000 torch torchvision --index-url https://download.pytorch.org/whl/cpu
RUN pip install --default-timeout=1000 ultralytics
RUN pip install -r requirements.txt


CMD python manage.py makemigrations && \
    python manage.py migrate && \
    python manage.py runserver 0.0.0.0:8001