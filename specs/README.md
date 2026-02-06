# specs/
Esta carpeta contiene especificaciones funcionales (feature specs) que sirven como **fuente de verdad** para:
- Criterios de aceptación (AC)
- Mapeo UI (data-testid) / API (endpoints)
- Datos de prueba para enfoque data-driven
- Generación de tests (ver comandos de `.cursor/commands/`)

## Convención
- Un archivo por feature: `specs/<feature>.md`
- Usar nombres en kebab-case (ej: `checkout.md`, `user-auth.md`).

## Plantilla
- Copia `specs/_template.md` y reemplaza los placeholders.

## Recomendación
Trabaja los criterios como **Escenarios** con bullets verificables:
- Atómicos (una idea por bullet)
- Medibles y verificables (sin adjetivos vagos)
- Con precondiciones claras y resultado esperado
- Con cobertura de errores y validaciones (no solo happy path)

Reglas:
- El agente NO crea AC nuevos.
- Si falta `data-testid` (Frontend) y existe un enlace de referencia, se debe abrir y extraer la info; si no, se debe preguntar.
