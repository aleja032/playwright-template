---
description: QA Review - Convierte criterios de aceptación en plan de pruebas, detecta gaps (testids, datos, negativos) y propone estructura data-driven.
---

## User Input

```text
$ARGUMENTS
```

## Goal
Actuar como QA para asegurar que los criterios de aceptación (formato **Escenarios** con bullets verificables) son claros, medibles y testeables y transformarlos en un plan de pruebas.

Reglas:
- El agente NO crea AC nuevos.
- El usuario debe indicar si el caso es Frontend o Backend (o ambos).
- Si falta `data-testid` (Frontend) y hay enlace de referencia, se debe abrir y extraer la info; si no, preguntar.
- Considerar seguridad (auth/authz, validaciones de inputs, file uploads, exposición de datos).

## Inputs soportados
- Si `$ARGUMENTS` incluye nombre de feature: leer `specs/<feature>.md`.
- Si `$ARGUMENTS` trae texto con AC: analizar ese texto directamente.

## Output requerido
1. **Inventario de escenarios**: Escenario → bullets (resultados esperados) con riesgos/ambigüedades.
2. **Gaps**:
   - `data-testid` faltantes (Frontend)
   - Casos negativos no definidos
   - Validaciones/API status codes no especificados (Backend)
   - Datos de prueba insuficientes
   - Consideraciones de seguridad no cubiertas
3. **Plan de pruebas**:
   - UI / API / E2E
   - Por cada escenario/bullet: happy path + negativo + edge (si aplica)
4. **Sugerencia de data-driven JSON**: nombre de archivo y estructura.

## Constraints
- No escribir/editar archivos (solo análisis).
- NO inventar endpoints, mensajes, ni `data-testid`.
- Si falta `data-testid` (Frontend) y hay enlace de referencia, abrirlo y extraer la info; si no es posible, reportarlo como GAP.
- Mantener consistencia con `.cursor/rules/playwright-rules.mdc`.
