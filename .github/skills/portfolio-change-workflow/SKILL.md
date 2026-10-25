---
name: portfolio-change-workflow
description: Use this skill for portfolio feature work or bug fixes that may span Spring Boot routes, Thymeleaf views, CSS or JavaScript, security/configuration, and GitHub Pages deployment. Apply it when the change is cross-layer or the affected layer is unclear.
---

# Portfolio change workflow

Use this skill for feature work or fixes that may cross application layers.

## Before changing files

1. Read `AGENTS.md` for the repository map and development commands.
2. Run `git status --short` and inspect diffs for files in scope. Preserve existing user changes; do not overwrite unrelated work.
3. Trace the request through the relevant layers before editing:
   - Entry point and server behavior: `src/main/java/com/example/portfolio/`
   - Routes and view models: `PortfolioController.java`
   - Views and shared markup: `src/main/resources/templates/`
   - Browser presentation and behavior: `src/main/resources/static/css/styles.css` and `static/js/site.js`
   - Configuration: `src/main/resources/application*.properties`
   - Static publishing: `.github/workflows/deploy-pages.yml`
4. Keep the implementation scoped to the request. Avoid generated `target/` output, local databases under `data/`, and adding new tools or dependencies unless needed.

## Follow the change end-to-end

- For page work, use the `adding-portfolio-pages` skill.
- For a UI interaction, trace its markup, CSS classes, JavaScript initialization, keyboard/accessibility behavior, and reduced-motion/responsive handling where relevant.
- For a server route, inspect its model attributes, template resolution, authorization rules in `SecurityConfig.java`, and whether that route is also exported for GitHub Pages.
- For shared site chrome, update the Thymeleaf fragments and verify each page that consumes them.
- For configuration/security changes, preserve environment-based secrets and keep protected actuator endpoints protected.
- When changing a dependency or runtime requirement, update `pom.xml` and directly related documentation/configuration together.
- Update `README.md` or `AGENTS.md` only when the change alters documented workflows or project structure.

## Finish with targeted verification

- Java, configuration, or Thymeleaf changes: run `.\mvnw.cmd --batch-mode package`.
- Browser-only changes: inspect the affected page locally using the documented local profile and check the relevant viewport/interaction.
- GitHub Pages changes: verify the workflow exports all intended routes and static assets and rewrites links consistently for static hosting.
- There are no current test source files under `src/test`. Report only validations actually performed; do not mask failures or make unrelated fixes.
