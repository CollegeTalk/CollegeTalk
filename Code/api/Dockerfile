# syntax=docker/dockerfile:1

FROM python:latest

WORKDIR /api

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 5000

CMD [ "python3", "-m", "flask", "run", "--host=0.0.0.0"]

# local build commands:
# docker build --tag collegetalk-api .
# docker run -d -p 127.0.0.1:5000:5000 collegetalk-api