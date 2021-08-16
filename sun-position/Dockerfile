FROM python:3.8

WORKDIR /sunposition

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY app/ .

CMD ["python", "-m", "serve"]

