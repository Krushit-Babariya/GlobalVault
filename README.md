# Countries CRUD Application

A Spring Boot application with REST API for managing countries and continents data, featuring a beautiful frontend built with Tailwind CSS.

## Features

- **REST API**: Complete CRUD operations for countries
- **Beautiful UI**: Modern, responsive frontend with Tailwind CSS
- **Database**: MySQL integration with JPA/Hibernate
- **Search & Filter**: Advanced search and filtering capabilities
- **Statistics**: Interactive charts and analytics
- **Kubernetes Ready**: Complete K8s deployment configuration for AWS
- **Docker Support**: Containerized application

## Technology Stack

- **Backend**: Spring Boot 3.5.3, Spring Data JPA, Spring Web
- **Database**: MySQL 8.0
- **Frontend**: Thymeleaf, Tailwind CSS, JavaScript
- **Charts**: Chart.js
- **Container**: Docker
- **Orchestration**: Kubernetes
- **Cloud**: AWS EKS ready

## Quick Start

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0
- Docker (optional)
- Kubernetes cluster (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spring-boot-web-app
   ```

2. **Configure Database**
   - Create MySQL database named `countries_db`
   - Update `application.properties` with your database credentials

3. **Run the Application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the Application**
   - Web UI: http://localhost:8080
   - API Documentation: http://localhost:8080/api/countries

### Docker Deployment

1. **Build the JAR**
   ```bash
   mvn clean package
   ```

2. **Build Docker Image**
   ```bash
   docker build -t altus-app:latest .
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

## API Endpoints

### Countries API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/countries` | Get all countries |
| GET | `/api/countries/{id}` | Get country by ID |
| GET | `/api/countries/name/{name}` | Get country by name |
| GET | `/api/countries/continent/{continent}` | Get countries by continent |
| GET | `/api/countries/search/name?name={query}` | Search countries by name |
| GET | `/api/countries/search/continent?continent={query}` | Search countries by continent |
| GET | `/api/countries/continents` | Get all continents |
| GET | `/api/countries/statistics` | Get statistics |
| POST | `/api/countries` | Create new country |
| PUT | `/api/countries/{id}` | Update country |
| DELETE | `/api/countries/{id}` | Delete country |
| POST | `/api/countries/bulk` | Bulk create countries |

### Sample API Requests

**Create a Country**
```bash
curl -X POST http://localhost:8080/api/countries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Canada",
    "continent": "North America",
    "capital": "Ottawa",
    "population": 37742154,
    "area": 9984670.0,
    "currency": "CAD",
    "language": "English"
  }'
```

**Get Countries by Continent**
```bash
curl http://localhost:8080/api/countries/continent/Asia
```

**Search Countries**
```bash
curl http://localhost:8080/api/countries/search/name?name=United
```

## Kubernetes Deployment (AWS EKS)

### Prerequisites

- AWS EKS cluster
- kubectl configured
- AWS CLI configured

### Deployment Steps

1. **Apply ConfigMap and Secret**
   ```bash
   kubectl apply -f k8s/configmap.yaml
   kubectl apply -f k8s/secret.yaml
   ```

2. **Deploy MySQL Database**
   ```bash
   kubectl apply -f k8s/mysql-deployment.yaml
   ```

3. **Deploy Application**
   ```bash
   kubectl apply -f k8s/app-deployment.yaml
   ```

4. **Apply Ingress (Optional)**
   ```bash
   kubectl apply -f k8s/ingress.yaml
   ```

### Environment Variables

The application uses the following environment variables (configured via ConfigMap and Secret):

- `DB_DRIVER_NAME_VALUE`: MySQL driver class
- `DB_HOST_SERVICE_NAME_VALUE`: Database service name
- `DB_SCHEMA_VALUE`: Database schema name
- `DB_PORT_VALUE`: Database port
- `DB_USERNAME_VALUE`: Database username (from Secret)
- `DB_PASSWORD_VALUE`: Database password (from Secret)
- `SERVER_PORT`: Application port

## Database Schema

### Countries Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(100) | NOT NULL, UNIQUE |
| continent | VARCHAR(50) | NOT NULL |
| population | BIGINT | NULL |
| capital | VARCHAR(100) | NULL |
| area | DOUBLE | NULL |
| currency | VARCHAR(50) | NULL |
| language | VARCHAR(100) | NULL |

## Frontend Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Tables**: Sortable and searchable country listings
- **Real-time Search**: Instant search with debouncing
- **Form Validation**: Client-side and server-side validation
- **Statistics Dashboard**: Interactive charts and analytics
- **Modal Dialogs**: For viewing and editing country details
- **Auto-save**: Form draft saving functionality
- **Keyboard Shortcuts**: Enhanced user experience

## Development

### Project Structure

```
src/
├── main/
│   ├── java/com/krushit/
│   │   ├── controller/
│   │   │   ├── CountryRestController.java
│   │   │   └── WebController.java
│   │   ├── entity/
│   │   │   └── Country.java
│   │   ├── repository/
│   │   │   └── CountryRepository.java
│   │   ├── service/
│   │   │   └── CountryService.java
│   │   ├── config/
│   │   │   └── DataInitializer.java
│   │   └── SpringBootWebAppApplication.java
│   └── resources/
│       ├── static/js/
│       │   ├── app.js
│       │   ├── countries.js
│       │   ├── add-country.js
│       │   └── statistics.js
│       ├── templates/
│       │   ├── index.html
│       │   ├── countries.html
│       │   ├── add-country.html
│       │   └── statistics.html
│       └── application.properties
k8s/
├── configmap.yaml
├── secret.yaml
├── mysql-deployment.yaml
├── app-deployment.yaml
└── ingress.yaml
```

### Adding New Features

1. **New Entity**: Create entity class in `entity/` package
2. **Repository**: Create repository interface in `repository/` package
3. **Service**: Add business logic in `service/` package
4. **Controller**: Create REST endpoints in `controller/` package
5. **Frontend**: Add templates and JavaScript files

## Monitoring and Health Checks

The application includes:
- Health check endpoint: `/actuator/health`
- Kubernetes liveness and readiness probes
- Application metrics and logging
- Error handling and validation

## Security Considerations

- Input validation on all endpoints
- SQL injection prevention with JPA
- XSS protection with Thymeleaf
- CORS configuration for API access
- Kubernetes secrets for sensitive data

## Performance Optimization

- Database indexing on frequently queried columns
- Connection pooling with HikariCP
- Static resource caching
- Gzip compression
- Horizontal pod autoscaling

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MySQL service is running
   - Verify database credentials
   - Ensure database exists

2. **Application Won't Start**
   - Check Java version (requires 17+)
   - Verify port 8080 is available
   - Check application logs

3. **Kubernetes Deployment Issues**
   - Verify ConfigMap and Secret are applied
   - Check pod logs: `kubectl logs <pod-name>`
   - Ensure persistent volumes are available

### Logs

```bash
# Application logs
kubectl logs -f deployment/altus-app-deployment

# Database logs
kubectl logs -f deployment/altus-mysql-deployment

# Service status
kubectl get services
kubectl get pods
```
---
