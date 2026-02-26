## Tipo de solicitud (obligatorio)
- Frontend | Backend | Ambos

## Enlaces / Referencias (obligatorio si Frontend)
- Link de UX/UI (Notion/Figma): <url>
- URL del sitio/página (si existe): <url>
- Link de ticket/story: <url>

## Rutas / URLs
- UI path principal: `/<ruta>`
- Base URL esperada (si aplica): `BASE_URL`

## Contrato API (si aplica)
documentacion en caso que exista
## Datos de Prueba (data-driven)
Archivo sugerido: `data-driven/<feature>-data.json`

## Criterios de Aceptación (AC)
Regla:
- El agente NO crea AC nuevos.
- Si hay cosas **pendiente definir**, marcarlo explícitamente como GAP y listar preguntas.
- Antes de crear tests/código, se debe **resolver cualquier duda/vacío** (no asumir).

## Seguridad (según aplique)
- Auth / AuthZ (roles/permisos)
- Validación de inputs (inyección, XSS, SQLi, etc.)
- File uploads (tipo/tamaño, contenido malicioso, permisos)
- Manejo de errores (no filtrar info sensible)
- Rate limits / abuso (si aplica)

## Reportes / Evidencia
- Se debe poder ver el HTML report con `npm run report`.
- Debe generarse/actualizarse `test-results/results.json` (reporter json).
- **Screenshots**: Capturados automáticamente en cada fallo
- **Traces**: Timeline completo guardado en fallos para debugging (`npx playwright show-trace test-results/<trace-file>.zip`)

## Definition of Done (DoD) QA
- Tests determinísticos (sin `waitForTimeout`)
- Sin selectores raw en `.spec.ts`
- Page Objects extienden `BasePage`
- `test/expect` importados desde `fixtures/custom-fixtures.ts`
- Datos de prueba en JSON (`data-driven/`)
- Reporte visible y fallos accionables
