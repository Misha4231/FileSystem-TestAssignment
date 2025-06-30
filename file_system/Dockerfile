FROM python:3.13-alpine

RUN mkdir /app
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD python manage.py runserver 0.0.0.0:80