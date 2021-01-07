STEP A - EXPRESS/SOCKET.io GAME SERVER

1. Make sure you've installed latest stable node.js package
   https://nodejs.org/en/
2. GO TO /statki-game-server/
3. npm install
   npm start

STEP B - SPRING/THYMELEAF APP

1. Make sure you've installed Docker
2. sudo docker run --name postgres-statki-spring -e POSTGRES_PASSWORD=Statki123 -d -p 5432:5432 postgres:alpine
   sudo docker exec -it c6053b21b37d bin/bash

c6053b21b37d <- container id, u need to find and paste ur own id for this container

psql -U postgres

CREATE DATABASE statkidb;

3. Run the /statki/ app

4. App should be ready to use at http://localhost:8080/

If u no longer want to use sudo within docker:
https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket
