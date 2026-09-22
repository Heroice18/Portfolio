# Portfolio

A Spring Boot-based portfolio project that can be run locally and prepared for GitHub Pages deployment.

## Prerequisites

- Java 26+
- Maven 3.9+

## Run locally

```bash
./mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=local"
```

Then open:

- http://localhost:8080/
- http://localhost:8080/about

## API documentation

Springdoc OpenAPI is available locally at:

- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs
- OpenAPI YAML: http://localhost:8080/v3/api-docs.yaml

## Application extensions

- Actuator health and metrics: `/actuator/health`, `/actuator/metrics`, and `/actuator/prometheus`
- Contact API: `POST /api/contact` with `name`, `email`, and `message` fields
- Local H2 database managed by Flyway migrations in `src/main/resources/db/migration`
- Image resizing through `ImageOptimizationService`

Actuator endpoints use HTTP Basic authentication. Set `APP_ADMIN_USERNAME` and `APP_ADMIN_PASSWORD` before starting the application; the development defaults are `admin` and `change-me`.

## Content parsing

The project includes jsoup `1.18.1` for parsing and sanitizing HTML. It can support future features such as importing project content, reading RSS feeds, extracting page metadata, or safely rendering approved HTML snippets.

## GitHub Pages deployment

This project includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that:

1. Builds the Spring Boot app
2. Copies the generated static assets into a Pages artifact
3. Publishes them to GitHub Pages

## Project structure

- `src/main/java/com/example/portfolio` - Spring Boot app and controller
- `src/main/resources/templates` - Thymeleaf pages
- `src/main/resources/static` - CSS and JS assets
- `.github/workflows/deploy-pages.yml` - deployment pipeline

## Notes

GitHub Pages serves static content, so the app is prepared as a Spring Boot project and then exported to static assets for Pages hosting.
