---
description: QA Runbook - Ejecuta tests Playwright, resume resultados/fallos y guía para abrir reportes.
---

## Goal
Estandarizar cómo ejecutar y reportar resultados de tests.

## Run
- Ejecutar todo: `npm test`
- Ejecutar un spec: `npx playwright test tests/<feature>.spec.ts`
- Abrir reporte: `npm run report`

## Output requerido (en la respuesta del agente)
- Qué comando(s) se ejecutaron
- Resultado (pass/fail)
- Si falla: lista corta de fallos (spec/test name) y sospecha (selector, flake, timeout, data)
- Ubicación de artifacts relevantes (screenshots/videos/traces si aplica)
- Recordatorio: `npm run report`

## Notes
- Evitar `waitForTimeout`.
- Si hay flakiness: proponer fix (esperas web-first, `waitForPageLoad()`, assertions).
