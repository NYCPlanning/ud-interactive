# Sun Path Calculator

## Running Locally

First make sure you have a working virtual environment. From this directory, run `python3 -m venv env` to create and activate with `source env/bin/activate`. Then install dependencies into the environment with `python3 -m pip install -r requirements.txt`.

`python -m serve` starts the server, `python -m test` makes a series of requests to make sure everything is working.


## Running as a Container

From this directory, `docker build -t sunposition .` builds the image (or rebuilds after changes are made). Run the container with `docker run --name sunposition -p 5000:5000 sunposition`. Then run `python -m test` like above.


## Credit

Rudransh Dikshit, Civic Innovation Corps Summer 2021

