# Countries API - Postman Collection

This directory contains Postman collection and environment files for testing the Countries API.

## Files

- **`Countries-API.postman_collection.json`** - Complete API collection with all endpoints
- **`Countries-API-Environment.postman_environment.json`** - Environment variables for different deployment scenarios

## How to Import

### Method 1: Import via Postman App
1. Open Postman
2. Click "Import" button
3. Select both JSON files
4. The collection and environment will be imported

### Method 2: Import via Postman Web
1. Go to [Postman Web](https://web.postman.com)
2. Click "Import" 
3. Upload both JSON files
4. Select the environment from the dropdown

## Environment Setup

### Local Development
- **base_url**: `http://localhost:8080`
- **api_version**: `v1`
- **content_type**: `application/json`

### Docker Development
- **base_url**: `http://localhost:8080` (same as local)

### Kubernetes Deployment
- **base_url**: `http://your-cluster-ip` or `http://your-domain.com`
- Update the environment variable accordingly

## API Endpoints Included

### GET Requests
- ✅ Get All Countries
- ✅ Get Country by ID
- ✅ Get Country by Name
- ✅ Get Countries by Continent
- ✅ Search Countries by Name
- ✅ Search Countries by Continent
- ✅ Get All Continents
- ✅ Get Countries with Population > 100M
- ✅ Get Statistics

### POST Requests
- ✅ Create New Country (Full details)
- ✅ Create Country (Minimal - name & continent only)
- ✅ Bulk Create Countries

### PUT Requests
- ✅ Update Country

### DELETE Requests
- ✅ Delete Country

## Sample Request Bodies

### Create Country (Full)
```json
{
  "name": "New Zealand",
  "continent": "Australia",
  "capital": "Wellington",
  "population": 5084300,
  "area": 270467.0,
  "currency": "NZD",
  "language": "English"
}
```

### Create Country (Minimal)
```json
{
  "name": "Test Country",
  "continent": "Europe"
}
```

### Bulk Create
```json
[
  {
    "name": "Bulk Country 1",
    "continent": "Europe",
    "capital": "Capital 1",
    "population": 1000000,
    "area": 50000.0,
    "currency": "EUR",
    "language": "English"
  },
  {
    "name": "Bulk Country 2",
    "continent": "Asia",
    "capital": "Capital 2",
    "population": 2000000,
    "area": 75000.0,
    "currency": "USD",
    "language": "Spanish"
  }
]
```

## Testing Workflow

### 1. Setup Environment
1. Import the environment file
2. Select the environment from the dropdown
3. Verify `base_url` is correct for your deployment

### 2. Test Basic Operations
1. **Get All Countries** - Verify API is accessible
2. **Get Statistics** - Check if data is populated
3. **Create Country** - Test POST operation
4. **Get Country by ID** - Test GET with the created country
5. **Update Country** - Test PUT operation
6. **Delete Country** - Test DELETE operation

### 3. Test Advanced Features
1. **Search Countries** - Test search functionality
2. **Get by Continent** - Test filtering
3. **Bulk Create** - Test batch operations
4. **Population Filter** - Test complex queries

## Expected Responses

### Success Response (200/201)
```json
{
  "id": 1,
  "name": "United States",
  "continent": "North America",
  "capital": "Washington D.C.",
  "population": 331002651,
  "area": 9833517.0,
  "currency": "USD",
  "language": "English"
}
```

### Error Response (400/404)
```json
{
  "error": "Country with name 'United States' already exists"
}
```

### Statistics Response
```json
{
  "totalCountries": 50,
  "continents": ["Asia", "Europe", "Africa", "North America", "South America", "Australia"],
  "countriesByContinent": [
    ["Asia", 10],
    ["Europe", 10],
    ["Africa", 10],
    ["North America", 10],
    ["South America", 5],
    ["Australia", 5]
  ]
}
```

## Tips for Testing

### 1. **Use Environment Variables**
- All requests use `{{base_url}}` variable
- Easy to switch between local, Docker, and Kubernetes

### 2. **Test Data Validation**
- Try creating countries with missing required fields
- Test with invalid data types
- Verify unique name constraint

### 3. **Performance Testing**
- Use bulk create for large datasets
- Test search performance with many countries
- Monitor response times

### 4. **Error Handling**
- Test with non-existent IDs
- Verify proper error messages
- Check HTTP status codes

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check if application is running
   - Verify port 8080 is accessible
   - Check firewall settings

2. **404 Not Found**
   - Verify base_url is correct
   - Check if endpoint exists
   - Ensure proper URL path

3. **500 Internal Server Error**
   - Check application logs
   - Verify database connection
   - Check if database is populated

### Debug Steps

1. **Check Application Status**
   ```bash
   curl http://localhost:8080/actuator/health
   ```

2. **Verify Database**
   ```bash
   curl http://localhost:8080/api/countries/statistics
   ```

3. **Check Logs**
   ```bash
   # Docker
   docker logs altus-app
   
   # Kubernetes
   kubectl logs deployment/altus-app-deployment
   ```

## Environment Variables

You can create additional environments for different scenarios:

### Production Environment
```json
{
  "base_url": "https://your-production-domain.com",
  "api_version": "v1",
  "content_type": "application/json"
}
```

### Staging Environment
```json
{
  "base_url": "https://staging.your-domain.com",
  "api_version": "v1",
  "content_type": "application/json"
}
```

### Kubernetes Environment
```json
{
  "base_url": "http://your-cluster-loadbalancer-ip",
  "api_version": "v1",
  "content_type": "application/json"
}
```

## Collection Features

- ✅ **Organized Structure** - Logical grouping of endpoints
- ✅ **Environment Variables** - Easy configuration switching
- ✅ **Sample Data** - Pre-filled request bodies
- ✅ **Descriptions** - Clear endpoint documentation
- ✅ **Error Examples** - Expected error responses
- ✅ **Testing Workflow** - Step-by-step testing guide

This collection provides everything needed to thoroughly test the Countries API across different deployment scenarios! 