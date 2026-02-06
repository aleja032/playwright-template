---
description: QA review of scenario-style acceptance criteria from a spec. Produces gaps/questions, a test plan, data needs, and security considerations.
---

Input:
- Spec file: `specs/<feature>.md`

Rules:
- Do NOT create acceptance criteria.
- Ask whether this is Frontend or Backend (or both) if not explicit.
- If Frontend `data-testid` are missing and a reference link exists, open it and extract them.

Output:
- Scenario inventory
- Gaps/questions
- Test plan (UI/API/E2E)
- Data-driven JSON proposal
- Security checklist