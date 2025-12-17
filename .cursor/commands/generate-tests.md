---
description: Generate Playwright tests from acceptance criteria specs following POM, fixtures, and data-driven patterns.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Goal

Generate complete test code (Page Object, Fixture, Test Spec, Data JSON) from a spec file in `specs/` directory, following the project constitution in `.cursor/rules/playwright-rules.mdc` and generation rules in `.cursor/rules/test-generation.mdc`.

## Execution Steps

### 1. Load Spec File

- If `$ARGUMENTS` contains a feature name, load `specs/[feature].md`
- If no arguments, list available specs in `specs/` directory
- Abort if spec file doesn't exist

### 2. Parse Spec

Extract from spec:
- Feature name and description
- URL base
- Acceptance criteria (list items)
- UI elements with `data-testid`
- Test data structure
- Additional notes

### 3. Reference Project Rules

Read (do NOT duplicate content):
- `.cursor/rules/playwright-rules.mdc` - Core principles
- `.cursor/rules/test-generation.mdc` - Generation rules
- `pages/BasePage.ts` - Base class structure
- `fixtures/custom-fixtures.ts` - Existing fixtures pattern

### 4. Generate Code (Strict Order)

#### A. Page Object (`pages/[Feature]Page.ts`)

- Extend `BasePage`
- Define `readonly Locator` properties for each UI element
- Create business flow methods (e.g., `login(email, password)`)
- Use `data-testid` selectors from spec
- Follow naming: PascalCase + `Page` suffix

#### B. Update Fixture (`fixtures/custom-fixtures.ts`)

- Add new fixture to existing `CustomFixtures` type
- Add fixture implementation following existing pattern
- Preserve all existing fixtures

#### C. Test Spec (`tests/[feature].spec.ts`)

- Import from `custom-fixtures`
- Import data JSON
- Create `test.describe` block
- Add `beforeEach` with `goto` navigation
- Generate one test per acceptance criterion
- Use Page Object methods only (NO raw selectors)
- Use data from JSON import

#### D. Data JSON (`data-driven/[feature]-data.json`)

- Create JSON structure from spec's "Datos de Prueba" section
- Use descriptive scenario names
- Follow naming: `[feature]-data.json`

### 5. Validation

Verify generated code:
- ✅ Page Object extends `BasePage`
- ✅ All selectors use `data-testid`
- ✅ Test imports from `custom-fixtures`
- ✅ Test uses JSON data import
- ✅ No raw selectors in tests
- ✅ TypeScript strict mode compatible
- ✅ Follows project structure

### 6. Output Summary

Report generated files:
- `pages/[Feature]Page.ts` - Created/Updated
- `fixtures/custom-fixtures.ts` - Updated
- `tests/[feature].spec.ts` - Created
- `data-driven/[feature]-data.json` - Created

## Key Rules

- **NEVER** duplicate content from referenced files
- **ALWAYS** follow the generation order: Page Object → Fixture → Test → Data
- **MUST** extend `BasePage` for all Page Objects
- **MUST** use `data-testid` for selectors
- **MUST** import from `custom-fixtures` in tests
- **MUST** use JSON data imports (no hardcoded values)
- **NEVER** use raw selectors in test files

## Token Optimization

- Reference files instead of duplicating content
- Use existing patterns from `BasePage.ts` and `custom-fixtures.ts`
- Follow `.cursor/rules/test-generation.mdc` for structure
- Keep generated code concise and focused

