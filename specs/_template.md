# Feature: <NOMBRE>

## Objetivo
Explica en 2-5 líneas qué problema resuelve y para quién.

## Alcance
- **Incluye**:
  - 
- **No incluye**:
  - 

## Dependencias / Suposiciones
- Front:
- Back/API:
- Flags/roles:

## Tipo de solicitud (obligatorio)
- Frontend | Backend | Ambos

## Enlaces / Referencias (obligatorio si Frontend)
- Link de UX/UI (Notion/Figma): <url>
- URL del sitio/página (si existe): <url>
- Link de ticket/story: <url>

## Rutas / URLs
- UI path principal: `/<ruta>`
- Base URL esperada (si aplica): `BASE_URL`

## Mapeo UI (data-testid)
Lista los elementos clave que deben existir para que los tests sean estables.
- `<data-testid>`: Descripción breve del elemento / página

Regla:
- Si falta algún `data-testid`, se debe ir al enlace de referencia y extraer la info adicional.
- Si aún no se puede confirmar, se debe preguntar (no inventar).

## Contrato API (si aplica)
- `METHOD /endpoint`
  - Request: campos relevantes
  - Response: campos relevantes
  - Status codes: 200/201/400/401/403/404/409/etc.

## Datos de Prueba (data-driven)
Archivo sugerido: `data-driven/<feature>-data.json`
- Escenario `happyPath`: 
- Escenario `validationError`: 
- Escenario `unauthorized`: 

## Criterios de Aceptación (AC)
Trabajar AC como **Escenarios** (como el ejemplo provisto) con bullets verificables.

Regla:
- El agente NO crea AC nuevos.
- Si hay cosas **pendiente definir**, marcarlo explícitamente como GAP y listar preguntas.
- Antes de crear tests/código, se debe **resolver cualquier duda/vacío** (no asumir).

### Escenario 1: <título>
- <Resultado esperado verificable>
- <Resultado esperado verificable>

**Validación (si aplica):**
- <regla de validación 1>
- <regla de validación 2>

### Escenario 2: <título>
- <Resultado esperado verificable>

## Casos borde / validaciones
- 

## Seguridad (según aplique)
- Auth / AuthZ (roles/permisos)
- Validación de inputs (inyección, XSS, SQLi, etc.)
- File uploads (tipo/tamaño, contenido malicioso, permisos)
- Manejo de errores (no filtrar info sensible)
- Rate limits / abuso (si aplica)

## Reportes / Evidencia
- Se debe poder ver el HTML report con `npm run report`.
- Debe generarse/actualizarse `test-results/results.json` (reporter json).

## Definition of Done (DoD) QA
- Tests determinísticos (sin `waitForTimeout`)
- Sin selectores raw en `.spec.ts`
- Page Objects extienden `BasePage`
- `test/expect` importados desde `fixtures/custom-fixtures.ts`
- Datos de prueba en JSON (`data-driven/`)
- Reporte visible y fallos accionables
