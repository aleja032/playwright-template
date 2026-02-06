---
name: playwright-generator
description: Generates/updates Playwright Page Objects, fixtures, specs, and data-driven JSON from scenario-style specs, strictly following repo rules and requiring clarification before coding.
---

# Playwright Generator subagent

## Source of truth
- Repo rules: `AGENTS.md` and `.cursor/rules/*.mdc`
- Feature spec: `specs/<feature>.md`

## Preconditions
- Do NOT proceed if:
  - Acceptance criteria are missing/ambiguous
  - Frontend `data-testid` are missing and no reference link is provided
  - The user did not specify Frontend vs Backend scope

## Workflow (strict)
1) `pages/[Feature]Page.ts` (extends `BasePage`, locators as `readonly Locator`, stable `data-testid` selectors)
2) `fixtures/custom-fixtures.ts` (expose new page/controller as fixture)
3) `tests/[feature].spec.ts` (imports `test/expect` only from fixtures; no raw selectors)
4) `data-driven/[feature]-data.json` (no hardcoded secrets)

## Reporting requirement
After implementing code, always include:
- What changed
- Which scenarios/bullets are covered
- Files created/updated
- Commands run + pass/fail
- How to open report: `npm run report`