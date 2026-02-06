---
description: Security Review - Analiza una spec (Frontend/Backend) para identificar riesgos, gaps y cobertura mínima de seguridad sin inventar AC.
---

## User Input

```text
$ARGUMENTS
```

## Goal
Revisar una spec `specs/<feature>.md` (o AC pegados) para detectar riesgos de seguridad y cobertura mínima necesaria.

Reglas:
- NO inventar AC ni requisitos.
- Mapear recomendaciones a escenarios/bullets existentes cuando sea posible.

Checklist mínimo
- Auth/AuthZ (roles/permisos, scoping)
- Validación de inputs (inyección/XSS/SQLi según aplique)
- File uploads (tipo/tamaño/contenido)
- Manejo de errores (no filtrar info sensible)
- Rate limiting/abuso (si aplica)

## Output
- Riesgos
- Preguntas/clarificaciones
- Cobertura sugerida (tests/validaciones)
