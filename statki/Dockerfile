FROM openjdk:11
#ADD target/docker-statki.jar docker-statki.jar
#EXPOSE 8080
ARG JAR_FILE=target/docker-statki.jar
COPY ${JAR_FILE} docker-statki.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "docker-statki.jar"]