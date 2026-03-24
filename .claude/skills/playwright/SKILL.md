---
name: playwright
description: Complete Playwright test generation workflow. Generates Page Objects, fixtures, test specs, and data-driven JSON from acceptance criteria specs. Use when implementing new test features or updating existing ones.
allowed-tools: Task(playwright-generator), Read, Glob, Bash(npm*|npx*)
---

# Playwright Test Generation (Full Workflow)

Skill unificada que ejecuta el flujo completo de generación de tests de Playwright desde especificaciones hasta código ejecutable.

## Uso

```bash
/playwright <spec-file> <scope>
```

**Argumentos:**
- `<spec-file>`: Ruta al archivo de spec (ej: `specs/login.md`)
- `<scope>`: `frontend`, `backend`, o `both`

**Ejemplos:**
```bash
/playwright specs/login.md frontend
/playwright specs/api-users.md backend
/playwright specs/checkout.md both
```

---

## Flujo de Ejecución (Automático)

La skill ejecuta la generación de código completo siguiendo la arquitectura del repo:

### Generación de Código
**Agente:** `playwright-generator`
**Propósito:** Generar código completo siguiendo arquitectura del repo

**Ejecuta (en orden estricto):**

1. **Page Object** (`pages/[Feature]Page.ts`)
   - Extiende `BasePage`
   - Locators como `readonly Locator`
   - Selectores estables (`data-testid` primero)
   - Métodos de negocio encapsulados

2. **Fixture** (`fixtures/custom-fixtures.ts`)
   - Registra nuevo Page/Controller como fixture
   - Actualiza exports de `test` y `expect`

3. **Test Spec** (`tests/[feature].spec.ts`)
   - Importa `test`/`expect` desde `custom-fixtures` únicamente
   - Sin selectores raw
   - Cobertura de todos los escenarios/bullets del spec
   - Tests happy/negative/edge según plan QA

4. **Data-Driven JSON** (`data-driven/[feature]-data.json`)
   - Datos organizados por escenario
   - Sin hardcoded secrets
   - Siguiendo esquema propuesto en QA review
   - Dynamic data usando `@faker-js/faker` (names, emails, dates, etc.)

**Post-generación:**
- Ejecuta: `npm test tests/[feature].spec.ts`
- Genera reporte: `npm run report`
- Muestra resultado (pass/fail)

**Salida esperada:**
- Listado de archivos creados/actualizados
- Escenarios/bullets cubiertos
- Resultado de tests
- Instrucciones para ver reporte

---

## Precondiciones (OBLIGATORIAS)

**Antes de ejecutar la skill, verificar:**

1. **Spec file existe y es válido:**
   - Formato: Escenarios + bullets verificables
   - AC completos (no "pending define" sin resolver)
   - Para Frontend: `data-testid` deben estar documentados en el spec

2. **Scope está especificado:**
   - Usuario debe indicar `frontend`, `backend`, o `both`
   - Si no está claro en el spec, **preguntar antes de proceder**

---

## Manejo de Errores y Bloqueos

### Si Playwright generator encuentra código conflictivo:
```
⚠️ Ya existe pages/LoginPage.ts.
- ¿Actualizar el existente?
- ¿Crear con otro nombre?
```
**Acción:** Preguntar al usuario antes de sobrescribir.

### Si los tests fallan después de generación:
```
❌ Tests fallaron: [resumen de errores]

Revisando causa raíz...
[análisis de logs/screenshots]

Propuesta de fix: [...]
```
**Acción:** Analizar, proponer fix, y preguntar si aplicar o investigar más.

---

## Salida Final (Template)

Al completar todo el flujo, reportar en este formato:

```markdown
## ✅ Generación Completa: [Feature Name]

### 💻 Código Generado
**Archivos creados:**
- `pages/[Feature]Page.ts`
- `fixtures/custom-fixtures.ts` (actualizado)
- `tests/[feature].spec.ts`
- `data-driven/[feature]-data.json`

**Cobertura:**
- Escenario 1: [bullets cubiertos]
- Escenario 2: [bullets cubiertos]
- ...

### 🧪 Resultados de Tests
```bash
npm test tests/[feature].spec.ts
```
- **Passed:** X tests
- **Failed:** Y tests (si >0, detalle abajo)
- **Duration:** Zs

**Ver reporte completo:**
```bash
npm run report
```

### 📝 Próximos Pasos
- [Cualquier cosa pendiente, mejora sugerida, o nota importante]
```

---

## Tips de Uso

### Flujo iterativo (feature grande):
Si una feature es muy grande, divídela en specs más pequeños y ejecuta la skill múltiples veces:
```bash
/playwright specs/checkout-cart.md frontend
/playwright specs/checkout-payment.md frontend
/playwright specs/checkout-confirmation.md frontend
```

### Re-generación (actualizar tests):
Si necesitas actualizar tests existentes, la skill detectará archivos duplicados y preguntará cómo proceder.

### Modo backend:
Para APIs, el flujo genera directamente los controladores y tests:
```bash
/playwright specs/api-users.md backend
```

---

## Integración con Otros Workflows

### Después de crear una nueva spec:
1. Crear spec: `specs/new-feature.md` (usar template `specs/_template.md`)
2. Ejecutar skill: `/playwright specs/new-feature.md frontend`
3. Review manual del código generado
4. Commit: `/commit` (usa otra skill de commit)

### Antes de PR:
```bash
# Asegurar que todos los tests pasen:
npm test

# Generar reporte para adjuntar al PR:
npm run report
```

### CI/CD:
Los tests generados están listos para CI. Asegurar que el pipeline ejecute:
```bash
npx playwright test --reporter=html
```

---

## Troubleshooting

**"Spec file not found"**
→ Verificar que la ruta sea correcta desde el root del proyecto.

**"Scope not specified"**
→ Agregar `frontend`, `backend`, o `both` como segundo argumento.

**"Tests failing after generation"**
→ La skill analizará los logs automáticamente y propondrá fix. Revisar screenshots en `test-results/`.

**"Duplicate fixture name"**
→ La skill preguntará si merge con existente o renombrar. Decidir según contexto.

---

*Skill creada: 2026-02-06 | Versión: 1.0*
