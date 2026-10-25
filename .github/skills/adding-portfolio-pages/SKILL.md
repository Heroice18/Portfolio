---
name: adding-portfolio-pages
description: Use this skill when asked to add, create, or update a portfolio page, HTML view, Thymeleaf template, route, or page navigation, even if the request does not mention Thymeleaf. Covers the route-to-template flow, shared page structure, styling, and optional GitHub Pages publishing.
---

# Adding portfolio pages

Use this skill when the task adds a page, changes page structure, or wires a page into navigation or deployment.

## Understand the existing page pattern

1. Read the root `AGENTS.md` and inspect `git status`/the relevant diffs before editing.
2. Check `PortfolioController.java`, the closest existing template, `fragments.html`, and the relevant selectors in `styles.css` and `site.js`.
3. Decide whether the page is intended for the Spring Boot app only or also for the static GitHub Pages site. If unclear and it materially affects the implementation, clarify with the user.

## Implement a Spring-rendered page

- Add a `GET` mapping in `src/main/java/com/example/portfolio/PortfolioController.java`. Follow neighboring handlers: set the page `title`, set the `page` navigation marker, and return the template name.
- Add the corresponding template under `src/main/resources/templates/`. Follow the existing document structure and use the shared `site-header` and `site-footer` fragments rather than duplicating them.
- Keep the common shell consistent: `.site-shell`, shared header, `<main class="page-content">`, and shared footer. Prefer `.container` and `.content-panel` before inventing new layout primitives; inspect `styles.css` for existing responsive patterns and color variables.
- Use semantic landmarks and heading order, descriptive link text, useful accessible names for controls, and responsive layouts consistent with existing content panels.
- Reference local CSS and JavaScript with Thymeleaf resource expressions such as `@{/css/styles.css}` and `@{/js/site.js}`. Reuse existing behavior and styles where practical; synchronize template classes, CSS selectors, and JavaScript selectors when adding interactive UI.
- Add or update navigation only when the page belongs in the site's global navigation. Keep active-state behavior consistent with the `page` model attribute.
- Avoid adding a controller or client-side library when static markup or an existing shared fragment is sufficient.

## Include the page in GitHub Pages when requested

GitHub Pages serves generated static files, not the running Spring application. Update `.github/workflows/deploy-pages.yml` to fetch the new route into the Pages artifact, ensure links to and from the page resolve as static file URLs, and include any required static resources. The current workflow explicitly exports only `/` and `/about`; routes such as `/work` are not deployed unless the workflow is extended.

Check navigation, internal links, asset URLs, and browser paths after export. Do not assume root-relative Spring URLs will work on GitHub Pages; the workflow currently rewrites a specific set of paths, so extend that logic for new routes as needed.

## Verify

- Build Java/template changes with `.\mvnw.cmd --batch-mode package`.
- For an application page, run with the local profile using `.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=local"` and inspect the affected route.
- For a Pages change, inspect the workflow export steps and verify that every exported page and link uses the intended static path.
- There are no current tests under `src/test`; do not claim test coverage that does not exist.
