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

The local profile is also available from VS Code:

- Use **Run and Debug** and select `Portfolio (local)`.
- Or run the `Run Portfolio locally` task from the Command Palette.

In IntelliJ IDEA, select the shared **Portfolio (local)** run configuration to run or debug the application with the local profile.

The local profile disables Thymeleaf caching and uses port `8080`, so template and style changes can be viewed by refreshing the browser.

The included VS Code configuration targets the Temurin 26 JDK used by this project. If Java 26 is installed in a different location, update `.vscode/settings.json` and `.vscode/tasks.json` to match.

## Reusable LinkedIn post carousel

The LinkedIn carousel is a reusable Thymeleaf fragment. Add the post data to a page's model as `LinkedInPost` values, then include it where desired:

```html
<section th:replace="~{fragments :: linkedin-carousel('Latest from LinkedIn', ${linkedinPosts}, 'home-linkedin')}"></section>
```

Each carousel needs a unique ID for its accessible heading. The shared JavaScript initializes each carousel and scopes its controls independently.

## GitHub Pages deployment

This project includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that:

1. Builds the Spring Boot app
2. Copies the generated static assets into a Pages artifact
3. Publishes them to GitHub Pages

To publish a numbered version, create and push a tag such as `v1.2.3`. The workflow removes the leading `v` and builds the application with version `1.2.3`. Builds from `main` continue to use the `0.0.1-SNAPSHOT` development version.

## Project structure

- `src/main/java/com/example/portfolio` - Spring Boot app and controller
- `src/main/resources/templates` - Thymeleaf pages
- `src/main/resources/static` - CSS and JS assets
- `.github/workflows/deploy-pages.yml` - deployment pipeline

## Notes

GitHub Pages serves static content, so the app is prepared as a Spring Boot project and then exported to static assets for Pages hosting.
