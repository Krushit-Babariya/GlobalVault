FROM openjdk:17-jdk-slim

LABEL maintainer="Krushit"
LABEL version="1.0.0"
LABEL date="2025-07-06"
LABEL project="GlobalVault"

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-Xmx512m -Xms256m"

ENTRYPOINT ["java", "-jar", "app.jar"] 