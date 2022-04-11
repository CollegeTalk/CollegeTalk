# syntax=docker/dockerfile:1

FROM python:latest

WORKDIR /api

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

ENV FLASK_ENV=production
EXPOSE 5000

CMD [ "python3", "-m", "flask", "run", "--host=0.0.0.0"]
