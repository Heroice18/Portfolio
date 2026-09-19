# Portfolio

A Spring Boot-based portfolio project that can be run locally and prepared for GitHub Pages deployment.

## Prerequisites

- Java 26+
- Maven 3.9+

## Run locally

```bash
./mvnw spring-boot:run
```

Then open:

- http://localhost:8080/
- http://localhost:8080/about

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
