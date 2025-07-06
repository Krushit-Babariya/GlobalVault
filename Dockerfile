FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/spring-boot-web-app-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-Xmx512m -Xms256m"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"] 