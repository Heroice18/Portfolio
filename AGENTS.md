# Agent Guide

This file is the working map for agents making changes in this repository. Read the sections relevant to the task, then inspect the referenced files and the current Git diff before editing. Keep changes focused and preserve work already present in the worktree.

Task-specific playbooks are available in `.github/skills/`: use `adding-portfolio-pages` when creating or changing a site page, and `portfolio-change-workflow` for broader cross-layer work.

## Project at a glance

This is a Java 26 / Spring Boot web portfolio. Spring MVC serves Thymeleaf pages during development; page styles and browser behavior live in static CSS and JavaScript. The GitHub Actions workflow renders selected pages to HTML and deploys those files and static assets to GitHub Pages.

There is no separate frontend package manager or JavaScript build. The project uses Maven (`pom.xml`), with the Maven Wrapper available as `mvnw.cmd` on Windows.

## Where to look

| Concern | Files |
| --- | --- |
| Application entry point | `src/main/java/com/example/portfolio/PortfolioApplication.java` |
| Page routes and page model attributes | `src/main/java/com/example/portfolio/PortfolioController.java` |
| Shared post data type | `src/main/java/com/example/portfolio/LinkedInPost.java` |
| Image resizing service | `src/main/java/com/example/portfolio/ImageOptimizationService.java` |
| HTTP authorization and actuator access | `src/main/java/com/example/portfolio/SecurityConfig.java` |
| OpenAPI metadata | `src/main/java/com/example/portfolio/OpenApiConfig.java` |
| Home page | `src/main/resources/templates/index.html` |
| About and work pages | `src/main/resources/templates/about.html`, `src/main/resources/templates/work.html` |
| Shared header, footer, LinkedIn carousel | `src/main/resources/templates/fragments.html` |
| Site presentation and responsive styles | `src/main/resources/static/css/styles.css` |
| Carousel initialization and dynamic footer year | `src/main/resources/static/js/site.js` |
| Spring defaults and actuator settings | `src/main/resources/application.properties` |
| Local run configuration | `src/main/resources/application-local.properties`, `.vscode/`, `.run/` |
| Build and dependencies | `pom.xml`, `.mvn/wrapper/maven-wrapper.properties` |
| GitHub Pages export and deployment | `.github/workflows/deploy-pages.yml` |
| Project usage and deployment notes | `README.md` |

## Request and rendering flow

- `PortfolioController` handles `GET /`, `GET /about`, `GET /work`, `GET /projects`, and `GET /technologies`, sets the page title/navigation marker, and returns the matching Thymeleaf template.
- The home route also supplies a static list of `LinkedInPost` records. The `linkedin-carousel` fragment renders that data and is omitted when the list is null or empty.
- `fragments.html` owns the shared navigation and footer; update it rather than copying shared markup into individual pages.
- `site.js` initializes every `[data-carousel]` independently using the externally hosted Swiper library. Carousel markup and its CSS classes are coupled; check all three template, CSS, and JS surfaces when changing carousel behavior.
- Static resources are referenced from templates with Thymeleaf resource URLs (`@{/css/...}` and `@{/js/...}`), which resolve to root-relative paths at runtime.
- `ImageOptimizationService` is a reusable Thumbnailator wrapper, not currently part of the page request flow.

## Page and visual patterns

- Standard page shell: `.site-shell` contains the shared header, a `.page-content` main region, and the shared footer. Reuse the fragments in `fragments.html`.
- Existing content uses `.container` for width/alignment and `.content-panel` for the rounded panel treatment. The home page uses a `.hero`; secondary pages use `.content` or page-specific panel classes such as `.work-page` and `.work-section`.
- CSS custom properties at the top of `styles.css` are the color palette. Extend them rather than scattering repeated color values when adding a reusable theme color.
- The stylesheet's primary mobile breakpoint is `600px`. Preserve the existing responsive rules and reduced-motion handling when changing interactive or animated UI.
- Design UI changes for both desktop and mobile from the outset. Check narrow phone widths as well as desktop; do not rely on accidental wrapping for navigation or other shared controls.
- Swiper is loaded from a CDN in the home template; do not add Swiper initialization to static pages unless that page includes the library and carousel markup.

## Routes and security

| Route | Handler / purpose |
| --- | --- |
| `/` | Home page, `index.html` |
| `/about` | About page, `about.html` |
| `/work` | Experience page, `work.html` |
| `/projects` | Personal projects and other work, `projects.html` |
| `/technologies` | Technologies ranked by usage, `technologies.html` |
| `/swagger-ui.html`, `/swagger-ui/**`, `/v3/api-docs/**` | OpenAPI UI and documents |
| `/actuator/**` | Requires the `ACTUATOR` role |

The security configuration enables HTTP Basic, disables form login, permits the listed public pages/assets and permits other unmatched paths by default. The actuator account is configured through Spring properties/environment variables; never add credentials to source or documentation. Do not expose local configuration values when inspecting or summarizing configuration files.

## Development and verification

Prerequisites documented by the project: Java 26+ and Maven 3.9+. Prefer the wrapper so the Maven version is consistent.

Run locally on Windows:

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=local"
```

The local profile is documented to use port 8080 with Thymeleaf caching disabled. The default `application.properties` server port is `${PORT:8081}`.

Build/package:

```powershell
.\mvnw.cmd --batch-mode clean package
```

There are currently no test source files under `src/test`. Run the package build for Java changes and manually exercise affected pages in the local profile for template, CSS, or JavaScript changes. Avoid adding test/build tools unless the task requires them.

## GitHub Pages behavior and caveats

The Pages workflow runs on pushes to `main`, version tags (`v*`), or manual dispatch. It builds the jar, starts the app temporarily, saves rendered pages in a `pages` directory, copies `target/classes/static`, rewrites root-relative links for static hosting, and deploys the artifact.

The workflow exports `/`, `/about`, `/work`, `/projects`, and `/technologies` as static HTML pages and rewrites their navigation links for Pages hosting. When adding or changing a page, consider both the Spring route and the workflow's explicit export/URL-rewrite steps.

## Change guidance

- Keep server-rendered page content in Thymeleaf templates and share repeated site chrome through `fragments.html`.
- Keep CSS class names synchronized with the relevant templates and JavaScript selectors.
- Keep browser code dependency-free except for existing CDN libraries; there is no JS build pipeline.
- For deployment-sensitive changes, trace both local runtime behavior and the static export. GitHub Pages cannot run the Spring Boot server.
- Check `git status` and diffs first. Several tracked files may already contain user changes; do not overwrite or revert unrelated work.
- Do not edit generated output under `target/` or local database files under `data/`; these are not source-of-truth project files.
