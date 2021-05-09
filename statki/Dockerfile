FROM openjdk:11
ADD target/docker-statki.jar docker-statki.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "docker-statki.jar"]
#ARG JAR_FILE=target/*.jar
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]