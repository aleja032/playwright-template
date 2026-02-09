# Agent Guidelines: Playwright E2E & API Framework

This document provides essential instructions for AI agents operating in this repository. Adherence to these standards ensures consistency, maintainability, and reliability across the automation suite.

# Reglas universales (NO HACER)

- NO introducir/pegar secretos (tokens, passwords). Si detectas secretos, pedir que se usen variables de entorno.
- NO correr suites de tests muy pesadas por defecto; preferir tests específicos y preguntar antes de algo costoso.
- NO crear tests innecesarios/redundantes:
  - Evitar “combinatoria” sin valor (ej: si hay 5 campos obligatorios, NO crear 5 tests separados dejando vacío 1 campo a la vez solo para verificar "required").
  - Preferir 1 test que valide el comportamiento de "campos obligatorios" con TODOS los campos obligatorios vacíos (o el set mínimo representativo).
  - Solo separar en tests individuales si cada campo tiene reglas/errores/UX distintos (mensajes diferentes, validaciones diferentes, formatos, dependencias).
  - Si se necesita cobertura por campo, preferir un test parametrizado/data-driven en lugar de duplicar código.

## 1. Command Reference

### Test Execution
- **Run all tests**: `npm test`
- **Run a single spec**: `npx playwright test tests/login.spec.ts`
- **Run a specific test**: `npx playwright test -g "should login successfully"`
- **Run in headed mode**: `npm run test:headed`
- **Run UI mode**: `npm run test:ui`
- **Debug mode**: `npm run test:debug`

### Project-Specific Execution
- **Chromium**: `npm run test:chromium`
- **Firefox**: `npm run test:firefox`
- **Webkit**: `npm run test:webkit`

### Reporting
- **Show report**: `npm run report`

### Browser Automation
- **Use `agent-browser` for web automation**: When testing or navigating websites, use `agent-browser` instead of creating custom Playwright scripts for quick browser interactions.
- **Get help**: Run `agent-browser --help` for all available commands.
- **Common use cases**: Navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, testing web apps, or automating any browser task.
- **For detailed documentation**: See `.claude/skills/agent-browser/SKILL.md` for complete workflow patterns, commands reference, and examples.

**Example:**
```bash
agent-browser open https://example.com
agent-browser snapshot -i
agent-browser click @e1
```

---

## 2. Core Architecture Principles

### I. Page Object Model (POM) - REQUIRED
All E2E tests must interact with the UI through Page Objects located in `pages/`.
- **Inheritance**: All Page Objects MUST extend `BasePage`.
- **Locators**: Expose elements as `readonly Locator` properties.
- **Selectors**: Prefer stable selectors, specifically `data-testid` (e.g., `page.locator('[data-testid="element-id"]')`).
- **Encapsulation**: Encapsulate business flows as `async` methods (e.g., `login(user, pass)`).
- **No Raw Selectors**: Test files (`.spec.ts`) MUST NOT contain raw selectors.

### II. API Controllers
API interactions are handled via controllers in `pages/` (e.g., `UserController.ts`).
- Use `APIRequestContext` for requests.
- Return `APIResponse` for validation in tests.
- Register controllers in `fixtures/custom-fixtures.ts`.

### III. Fixtures as Single Source of Truth
`fixtures/custom-fixtures.ts` is the ONLY source for `test` and `expect`.
- **Import**: `import { test, expect } from '../fixtures/custom-fixtures';`
- Page Objects and API Controllers MUST be exposed as named fixtures (e.g., `loginPage`, `userController`).

### IV. Data-Driven Testing
Test data is stored in JSON files under `data-driven/`.
- **NO Hardcoding**: Do not hardcode credentials, URLs, or sensitive data in specs.
- **Import**: Use TypeScript JSON imports.
- **Structure**: Organize by scenario name or domain.
- **Dynamic Data**: Use `@faker-js/faker` for realistic test data (names, emails, dates, etc.)
  - Example: `faker.person.firstName()`, `faker.internet.email()`

---

## 3. Development Workflow (OBLIGATORY)

When implementing new features or tests, follow this strict order:
1. **Page Object**: Create `pages/[Feature]Page.ts` extending `BasePage`.
2. **Fixture**: Update `fixtures/custom-fixtures.ts` to include the new Page Object/Controller.
3. **Test Spec**: Create `tests/[feature].spec.ts` importing from `custom-fixtures`.
4. **Data JSON**: Create `data-driven/[feature]-data.json` with the required test data.

### Acceptance Criteria (AC) First (Mandatory)
Before generating tests or implementing code:
- AC must be provided by the user/team (the agent MUST NOT create new acceptance criteria).
- Work from **scenario-style AC** (Escenarios + verifiable bullets), like the provided example.
- The user/team must specify whether the request is Frontend or Backend (or both). If unclear, ask.
- Ensure AC are understood and testable (preconditions + expected result).
- If there are gaps/ambiguities (missing `data-testid`, missing data, "pending define" items), **stop and ask questions**. Do not guess.
- For Frontend: if `data-testid` are missing but a reference link exists, open it and extract the missing info before proceeding.
- Specs live in `specs/` (see `specs/_template.md`).

### V. BasePage Inheritance
The `BasePage` class provides common utilities. Reuse them instead of raw Playwright calls:
- `goto(path)`: Navigates to a path relative to `baseURL`.
- `waitForPageLoad()`: Waits for `networkidle`.
- `clickElement(locator)`: Wraps `locator.click()`.
- `fillInput(locator, text)`: Wraps `locator.fill()`.
- `getText(locator)`: Safely retrieves text content.
- `isVisible(locator)`: Checks visibility.

---

## 4. Code Style & Naming Conventions

### Naming
- **Page Objects**: PascalCase with `Page` suffix (e.g., `DashboardPage.ts`).
- **API Controllers**: PascalCase with `Controller` suffix (e.g., `UserController.ts`).
- **Test Specs**: kebab-case with `.spec.ts` suffix (e.g., `user-auth.spec.ts`).
- **Data Files**: kebab-case with `-data.json` suffix (e.g., `user-auth-data.json`).
- **Fixtures**: camelCase (e.g., `loginPage`, `userController`).
- **Locators**: camelCase (e.g., `submitButton`, `errorMessage`).

### Formatting & Types
- **TypeScript Strict Mode**: All code must comply with `strict: true` in `tsconfig.json`.
- **Explicit Types**: Use `Locator`, `Page`, `APIResponse`, etc., from `@playwright/test`.
- **Async/Await**: Ensure all Playwright actions and Page Object methods are awaited.

---

## 5. Error Handling & Best Practices

- **Web-First Assertions**: Use `expect(locator).toBeVisible()`, `expect(page).toHaveURL()`, etc. Avoid manual boolean checks.
- **Deterministic Tests**: 
  - Never use `page.waitForTimeout(n)`.
  - Use `waitForPageLoad()` from `BasePage` if needed.
  - Ensure tests are parallelizable and independent.
- **BasePage Methods**: Utilize inherited methods like `clickElement`, `fillInput`, and `waitForPageLoad` to maintain consistency.
- **Selectors**: Prefer `data-testid`. If `data-testid` is missing, first try to extract it from the provided reference link(s) (or request it to be added). Use `getByRole`/`getByText` only as a last resort. Avoid CSS/XPath unless necessary.

---

## 6. Common Pitfalls & Troubleshooting

- **Race Conditions**: If a test fails intermittently, check if an action happens before the page is ready. Use `waitForPageLoad()` or `expect(locator).toBeVisible()`.
- **Selector Fragility**: Avoid using generated CSS classes (e.g., `.css-1abcde`). Always prioritize `data-testid`.
- **State Leakage**: Ensure each test starts from a clean state. Use `beforeEach` for navigation and setup.
- **Missing Awaits**: Every Playwright action (`click`, `fill`, `goto`) and `expect` assertion MUST be awaited.
- **JSON Imports**: If a JSON import fails, ensure `resolveJsonModule: true` and `esModuleInterop: true` are set in `tsconfig.json`.

---

## 7. Project Structure Overview

```text
playwright-template/
├── specs/           # Feature specs (acceptance criteria)
├── data-driven/     # Test data (JSON files)
├── fixtures/        # Custom fixtures (custom-fixtures.ts)
├── pages/           # Page Objects & API Controllers
├── tests/           # Test specs (*.spec.ts)
├── utils/           # Helper utilities
├── playwright.config.ts
└── tsconfig.json
```

---
*Derived from .cursor/rules and repository constitution. Updated: 2026-02-06*
