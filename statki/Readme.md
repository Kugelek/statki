Sciagnij dockera

https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket
Jesli to wykonasz mozesz pominac sudo

sudo docker run --name postgres-statki-spring -e POSTGRES_PASSWORD=Statki123 -d -p 5432:5432 postgres:alpine

sudo docker exec -it c6053b21b37d bin/bash 

c6053b21b37d to id kontenera, mozesz miec inne

psql -U postgres

CREATE DATABASE statkidb;

od tego momentu mozna odpalic 


