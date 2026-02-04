# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Action | Command |
|--------|---------|
| Run all tests | `npm test` |
| Run single spec | `npx playwright test tests/login.spec.ts` |
| Run specific test | `npx playwright test -g "test name"` |
| Headed mode | `npm run test:headed` |
| UI mode | `npm run test:ui` |
| Debug mode | `npm run test:debug` |
| Show report | `npm run report` |
| Browser-specific | `npm run test:chromium`, `test:firefox`, `test:webkit` |

## Browser Automation

**Use `agent-browser` for web automation.** When testing or navigating websites, use `agent-browser` instead of creating custom Playwright scripts for quick browser interactions.

- **Get help**: Run `agent-browser --help` for all available commands.
- **Common use cases**: Navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, testing web apps, or automating any browser task.
- **For detailed documentation**: See `.claude/skills/agent-browser/SKILL.md` for complete workflow patterns, commands reference, and examples.

**Example workflow:**
```bash
agent-browser open https://example.com
agent-browser snapshot -i
agent-browser click @e1
```

## Architecture

This is a Playwright E2E & API testing framework using Page Object Model with custom fixtures.

### Core Pattern

```
tests/*.spec.ts → imports from → fixtures/custom-fixtures.ts → exposes → pages/*Page.ts
                                                                          pages/*Controller.ts
```

**Critical Rule**: Tests MUST import `test` and `expect` from `../fixtures/custom-fixtures`, never from `@playwright/test` directly.

### Directory Purpose

- `pages/` - Page Objects (extend `BasePage`) and API Controllers (use `APIRequestContext`)
- `fixtures/custom-fixtures.ts` - Single source of truth for test/expect, registers all Page Objects as fixtures
- `tests/` - Test specs that use fixtures, no raw selectors allowed
- `data-driven/` - JSON test data, no hardcoded credentials
- `utils/` - Helper utilities (TestHelpers class)

### Path Aliases (tsconfig.json)

- `@pages/*` → `pages/*`
- `@fixtures/*` → `fixtures/*`
- `@utils/*` → `utils/*`
- `@data/*` → `data-driven/*`

## Development Workflow

When creating new tests, follow this strict order:

1. **Page Object**: Create `pages/[Feature]Page.ts` extending `BasePage`
2. **Fixture**: Update `fixtures/custom-fixtures.ts` to expose the new Page Object
3. **Test Spec**: Create `tests/[feature].spec.ts` importing from custom-fixtures
4. **Data JSON**: Create `data-driven/[feature]-data.json`

## Key Constraints

### Selectors (in priority order)
1. `data-testid` (required preference)
2. `getByRole` or `getByText`
3. Avoid raw CSS/XPath

### BasePage Methods (use instead of raw Playwright calls)
- `goto(path)` - Navigate relative to baseURL
- `waitForPageLoad()` - Wait for networkidle
- `clickElement(locator)`, `fillInput(locator, text)`, `getText(locator)`, `isVisible(locator)`

### Test Requirements
- All Playwright actions and assertions MUST be awaited
- Use web-first assertions (`expect(locator).toBeVisible()`, `expect(page).toHaveURL()`)
- Never use `page.waitForTimeout(n)` - use `waitForPageLoad()` or assertions
- API tests MUST assert HTTP status code: `expect(response.status()).toBe(200)`
- Tests must be deterministic and parallelizable

### Naming Conventions
- Page Objects: `PascalCase` + `Page` suffix (e.g., `LoginPage.ts`)
- Controllers: `PascalCase` + `Controller` suffix (e.g., `UserController.ts`)
- Test specs: `kebab-case` + `.spec.ts` (e.g., `user-auth.spec.ts`)
- Data files: `kebab-case` + `-data.json` (e.g., `user-auth-data.json`)
- Fixtures: `camelCase` (e.g., `loginPage`, `userController`)

## Configuration

- **Base URL**: `http://localhost:3000` (override with `BASE_URL` env var)
- **TypeScript**: Strict mode enabled
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Retries**: 2 in CI, 0 locally
- **Artifacts**: Screenshots/videos on failure, traces on first retry
