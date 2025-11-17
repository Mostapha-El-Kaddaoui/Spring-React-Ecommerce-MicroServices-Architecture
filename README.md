# Spring Microservices Multi-module

Architecture: discovery (Eureka) -> gateway (Spring Cloud Gateway) -> services (company, stock, chat)

ASCII Diagram:

discovery(8761)
   ^
   | registers
gateway(8080) --> routes --> company(8091) / stock(8092) / chat(8093)

Run locally with Maven (build all):

```
mvn -T 1C -am -pl . clean package
```

Run with docker-compose:

```
docker-compose build --pull
docker-compose up
```

Test endpoints (cURL):

# Create a company
curl -X POST http://localhost:8091/api/companies -H "Content-Type: application/json" -d '{"name":"Acme","address":"1 Road"}'

# List companies
curl http://localhost:8091/api/companies

# Create stock
curl -X POST http://localhost:8092/api/stocks -H "Content-Type: application/json" -d '{"companyId":1, "quantity":100}'

# Chat bot
curl -X POST http://localhost:8093/api/chat -H "Content-Type: application/json" -d '{"question":"Hello"}'

Swagger / OpenAPI UI available at:
- Company: http://localhost:8091/swagger-ui.html
- Stock: http://localhost:8092/swagger-ui.html
- Chat: http://localhost:8093/swagger-ui.html

Postman collection included: `postman_collection.json`
# Spring-React-Ecommerce-MicroServices-Architecture
