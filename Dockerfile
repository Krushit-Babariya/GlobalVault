FROM openjdk:17-jdk-slim

AUTHOR="Krushit"
VERSION="1.0.0"
DATE="2025-07-06"
PROJECT_NAME="GlobalVault"

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-Xmx512m -Xms256m"

ENTRYPOINT ["java", "-jar", "app.jar"] 