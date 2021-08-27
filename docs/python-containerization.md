# Containerization tips

- Don’t mess with Conda in a containerized environment - too buggy and not worth the effort for smaller apps
- Don’t mess with external pip-based environment managers (pipenv) - too many extra functionalities and overhead FWIW
- With pip: 
  - Don’t use Alpine - the smaller installation size is tempting, but library compilation just doesn’t work if you have gcc-based dependencies (numpy, pandas, etc.)
  - Slim python installation is also plenty small and has the added benefit of being Debian-based with a lot more useful functionalities out of the box.
  `RUN pip3 --no-cache-dir install -r requirements.txt`
- Build image with:
  `docker build -t <image_name> .`
- List images with:
  `docker images`
- Run container with:
  `docker run -it <image_name>`

## Progress

- Able to build Server setup image with python:3.7.6:slim version
- More reliable with older Python versions?
- I don’t really trust newer versions after the disaster that Alpine turned out to be. 
- Able to run server locally on port 5000

![sun path server running in vs code](../assets/sun-path-server.png)

- Trouble testing server - not sure how to access the port from outside of the docker container. Something on Stackoverflow about port “0.0.0.0”, but it’s apparently bad practice?

1. Build Flask App
  a. There are many ways to go about doing this, as Flask is lightweight and super customizable. 
  b. No “right way” to build a Flask App just because it can be used everywhere
2. Setup Flask App with DB
  a. Initialize DB and define HTTP methods for table
3. Test Flask App Locally
  a. Use cURL or Requests - both do the same thing
4. Base Docker Image
  `FROM python:3.7.6-slim`
5. Install Dependencies
  a. Varies based on what packages you require for the app
  b. Numpy and some others were being weird with installations, so I manually installed gcc + wheel + cryptography
6. Copy Source Code
  a. Copies over all the code from the current directory into the /app folder
  ```
  WORKDIR /app
  COPY . /app
  ```
7. Install Python Modules
  a. pip3 installation is the easiest I’ve seen
`RUN pip3 --no-cache-dir install -r requirements.txt`
8. Expose Port
  `EXPOSE 5000`
9. Make Container Executable
  ```
  ENTRYPOINT ["python3"]
  CMD ["code/setupSunPosFlask.py"]
  ```
10. New Docker Image w/ Flask App!

![architecture diagram](../assets/sun-path-server-diagram.png)

