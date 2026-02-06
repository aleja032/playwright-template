# .opencode/
Configuración para OpenCode.

## Fuentes de verdad
- Reglas del repo: `AGENTS.md` y `.cursor/rules/*.mdc`
- Specs por feature (AC): `specs/*.md` (formato Escenarios + bullets verificables)

## Reglas clave
- El agente NO crea criterios de aceptación nuevos.
- Frontend: si faltan `data-testid` y hay link de referencia (Notion/Figma/URL del sitio), se debe abrir y extraer la info; si no es posible, preguntar.
- Backend: validar contratos API (status codes, payloads) y considerar seguridad.

## Subagents
Ver `.opencode/agents/`:
- `qa` (review AC + gaps + plan)
- `playwright-generator` (genera POM/fixtures/tests/data)
- `frontend-testid-extractor` (extrae `data-testid`)
- `security-review` (riesgos + cobertura)