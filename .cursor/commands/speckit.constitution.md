---
description: Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync.
handoffs: 
  - label: Build Specification
    agent: speckit.specify
    prompt: Implement the feature specification based on the updated constitution. I want to build...
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

You are updating the project constitution at `.cursor/rules/playwright-rules.mdc`. This file defines the core principles for Playwright test generation. Your job is to (a) review current principles, (b) update based on user input, and (c) ensure consistency with generation rules.

Follow this execution flow:

1. Load the existing constitution at `.cursor/rules/playwright-rules.mdc`.
   - Review current principles and structure.

2. Process user input:
   - If user provides new principles or modifications, integrate them.
   - If user requests removal of principles, mark for review.
   - Update version and date if changes are made:
     - `CONSTITUTION_VERSION` follows semantic versioning:
       - MAJOR: Backward incompatible principle removals/redefinitions
       - MINOR: New principle/section added
       - PATCH: Clarifications, wording fixes
     - `LAST_AMENDED_DATE` is today if changes made

3. Draft the updated constitution:
   - Preserve existing structure and principles unless explicitly changed
   - Ensure each Principle section: succinct name, non-negotiable rules, explicit rationale
   - Ensure Governance section includes versioning and amendment procedure

4. Consistency validation:
   - Verify alignment with `.cursor/rules/test-generation.mdc`
   - Check that commands in `.cursor/commands/` reference correct constitution path
   - Ensure README.md reflects current principles if it mentions them

5. Validation before final output:
   - Version line matches changes
   - Dates ISO format YYYY-MM-DD
   - Principles are declarative, testable, and use MUST/SHOULD appropriately

6. Write the updated constitution back to `.cursor/rules/playwright-rules.mdc`.

7. Output summary:
   - Version change (if any)
   - Modified principles
   - Suggested commit message

Formatting & Style Requirements:

- Use Markdown headings exactly as in the template (do not demote/promote levels).
- Wrap long rationale lines to keep readability (<100 chars ideally) but do not hard enforce with awkward breaks.
- Keep a single blank line between sections.
- Avoid trailing whitespace.

If the user supplies partial updates (e.g., only one principle revision), still perform validation and version decision steps.

If critical info missing (e.g., ratification date truly unknown), insert `TODO(<FIELD_NAME>): explanation` and include in the Sync Impact Report under deferred items.

Always operate on the existing `.cursor/rules/playwright-rules.mdc` file.
