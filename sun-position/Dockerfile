# didn't work for me - unclear as to how you would run server with one command and test on another

FROM alpine:3.8

RUN apk add python3-dev \
    && apk add py3-pip \
    && apk add gcc \
    # && apk add --no-cache --update python3 \
    && apk update \
    && apk add py3-wheel \
    && apk add libressl-dev \
    && apk add openssl-dev \
    # && apk add libssl-dev \
    && apk add libffi-dev \
    && pip3 install --upgrade pip

WORKDIR /app

COPY . /app

RUN pip3 --no-cache-dir install -r requirements.txt

# COPY environment.yml .


# RUN conda env create -f environment.yml

# COPY app /app
# WORKDIR /app

# CMD ["conda", "run", "-n", "sunPosFlask"]
