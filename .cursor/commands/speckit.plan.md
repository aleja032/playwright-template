---
description: Execute the implementation planning workflow using the plan template to generate design artifacts.
handoffs: 
  - label: Create Tasks
    agent: speckit.tasks
    prompt: Break the plan into tasks
    send: true
  - label: Create Checklist
    agent: speckit.checklist
    prompt: Create a checklist for the following domain...
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Load spec**: If `$ARGUMENTS` contains feature name, load `specs/[feature].md`. Otherwise, list available specs.

2. **Load context**: Read spec file and reference `.cursor/rules/playwright-rules.mdc` for constitution rules.

3. **Analyze requirements**: 
   - Extract acceptance criteria
   - Identify UI elements and their `data-testid`
   - Map test data requirements
   - Check against existing Page Objects and tests

4. **Generate implementation plan**:
   - List required Page Objects
   - List required test files
   - List required data JSON files
   - Identify fixtures to add/update
   - Validate against constitution principles

5. **Report**: Output structured plan showing what will be generated.

## Implementation Plan Structure

### 1. Page Objects to Create

For each feature/page identified:
- File: `pages/[Feature]Page.ts`
- Extends: `BasePage`
- Elements: List of `data-testid` selectors
- Methods: Business flow methods needed

### 2. Tests to Create

For each acceptance criterion:
- File: `tests/[feature].spec.ts`
- Test cases: One per acceptance criterion
- Data dependencies: Which JSON data file needed

### 3. Data Files to Create

- File: `data-driven/[feature]-data.json`
- Scenarios: List of test data scenarios needed

### 4. Fixtures to Update

- File: `fixtures/custom-fixtures.ts`
- New fixtures: List of Page Object fixtures to add

### 5. Constitution Validation

- Check against `.cursor/rules/playwright-rules.mdc`:
  - ✅ POM pattern followed
  - ✅ Data-driven testing
  - ✅ TypeScript strict mode
  - ✅ Deterministic tests

## Key rules

- Reference existing files instead of duplicating
- Follow generation order: Page Object → Fixture → Test → Data
- Validate against constitution before generating
