---
description: Generate Playwright code (POM + fixtures + specs + data-driven JSON) from `specs/<feature>.md` following repo rules.
---

Rules:
- Must NOT create acceptance criteria.
- Stop and ask if anything is ambiguous/incomplete.
- Frontend requires `data-testid`; if missing, extract from the reference link(s) or ask.

Order:
1) Page Object
2) Fixture
3) Spec
4) Data JSON

Always finish with a delivery summary + report instructions (`npm run report`).