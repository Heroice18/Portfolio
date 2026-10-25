# Repository guidance

This repository is a Java 26 / Spring Boot portfolio with Thymeleaf-rendered pages and a GitHub Pages static export. Before editing, inspect the relevant source files and `git status`; preserve existing work and avoid generated files under `target/` and local databases under `data/`.

Read the root `AGENTS.md` for the project map, route flow, build commands, and deployment caveats. For page creation or layout changes, use the `adding-portfolio-pages` skill in `.github/skills/adding-portfolio-pages/SKILL.md`. For changes crossing application layers, use `portfolio-change-workflow` in `.github/skills/portfolio-change-workflow/SKILL.md`.

Keep page markup in Thymeleaf templates, reuse shared fragments, and keep template classes aligned with `styles.css` and `site.js`. A Spring route is not automatically published: update and verify `.github/workflows/deploy-pages.yml` when the requested change includes GitHub Pages.

Use the Maven Wrapper and validate the smallest relevant scope; current project commands and the absence of a `src/test` suite are documented in `AGENTS.md`. Never put credentials or other secrets in source or documentation.
