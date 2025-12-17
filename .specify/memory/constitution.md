---
alwaysApply: true
---

# Playwright Template Constitution

## Core Principles

### I. Page Object Model (POM) - REQUIRED

**MUST**: All E2E tests interact with UI through Page Objects in `pages/`.

- Page Objects MUST extend `BasePage` when applicable
- Use stable selectors (`data-testid` preferred) exposed as `Locator` properties
- Encapsulate business flows as methods (e.g., `login(email, password)`)
- Tests in `tests/` MUST NOT contain raw selectors

### II. Fixtures as Single Source of Truth

**MUST**: `fixtures/custom-fixtures.ts` is the only source for `test` and `expect`.

- Tests MUST import: `import { test, expect } from '../fixtures/custom-fixtures';`
- Page Objects MUST be exposed as named fixtures (e.g., `loginPage`, `dashboardPage`)
- Repeated setup logic belongs in fixtures or `beforeEach`, not duplicated in tests

### III. Data-Driven Testing

**MUST**: Test data stored in JSON files under `data-driven/`.

- NO hardcoded credentials or sensitive data in `.spec.ts` files
- Use TypeScript JSON imports (`resolveJsonModule` in `tsconfig.json`)
- Name files descriptively: `[domain]-data.json`

### IV. TypeScript Strict Mode

**MUST**: All code in `pages/`, `fixtures/`, `utils/`, `agents/` uses TypeScript strict mode.

- `tsconfig.json` MUST have `strict: true`
- Prefer reusable utilities in `utils/` over duplication
- Structural changes MUST update `tsconfig.json` paths

### V. Deterministic & Parallelizable Tests

**MUST**: Tests are deterministic, parallelizable, and browser-agnostic.

- Tests MUST run in parallel across multiple Playwright projects (chrome )
- NO assumptions about specific browsers or execution order
- Flakiness is a bug, not acceptable noise
- `playwright.config.ts` MUST configure retries, traces, screenshots, and videos

## Project Structure

```text
playwright-template/
├── data-driven/     # Test data (JSON files)
├── fixtures/        # Custom fixtures (custom-fixtures.ts)
├── pages/           # Page Objects (BasePage.ts, [PageName].ts)
├── tests/           # Test specs (*.spec.ts)
├── utils/           # Helper utilities
├── playwright.config.ts
└── tsconfig.json
```

## Workflow Rules

- New features MUST follow: Page Object → Fixture → Test Spec → Data JSON
- Code generation tools MUST respect this constitution and folder structure

## Governance

- This constitution is the authoritative reference for test architecture decisions
- Conflicts MUST be resolved by adapting practices to this document
- Amendments require: PR justification, impact summary, version bump, date update

**Version**: 1.0.0 | **Ratified**: 2025-12-17 | **Last Amended**: 2025-12-17

