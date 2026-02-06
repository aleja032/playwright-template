---
name: frontend-testid-extractor
description: Extracts missing `data-testid` information for Frontend features by using provided reference links or by opening the actual page and inspecting the DOM.
---

# Frontend `data-testid` Extractor

## Rule
- Never invent `data-testid`.
- If a spec provides a link (Notion/Figma/app URL), open it and extract the identifiers needed for stable tests.
- If access is blocked (auth/permissions), stop and ask for the missing info or alternative access.

## Recommended approach
- If a runnable URL is provided:
  - Use `agent-browser` to open the page and snapshot interactive elements.
  - Search for `data-testid` attributes in the relevant UI parts.
- If only documentation link exists:
  - Extract `data-testid` from docs/design system notes; otherwise request them.

## Output
- List of `data-testid` → element description/location
- Any uncertainties or missing items to confirm