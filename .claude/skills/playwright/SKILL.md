---
name: playwright
description: Complete Playwright test generation workflow. Orchestrates QA review, testid extraction (if Frontend), and code generation (Page Objects, fixtures, specs, data-driven JSON) from acceptance criteria specs. Use when implementing new test features or updating existing ones.
allowed-tools: Task(qa|frontend-testid-extractor|playwright-generator), Read, Glob, Bash(npm*|npx*)
---

# Playwright Test Generation (Full Workflow)

Skill unificada que ejecuta el flujo completo de generación de tests de Playwright desde especificaciones hasta código ejecutable.

## Uso

```bash
/playwright <spec-file> <scope> [--skip-qa] [--skip-testid]
```

**Argumentos:**
- `<spec-file>`: Ruta al archivo de spec (ej: `specs/login.md`)
- `<scope>`: `frontend`, `backend`, o `both`
- `--skip-qa`: (Opcional) Salta el QA review si ya fue validado
- `--skip-testid`: (Opcional) Salta la extracción de testid (útil si ya están documentados)

**Ejemplos:**
```bash
/playwright specs/login.md frontend
/playwright specs/api-users.md backend
/playwright specs/checkout.md both --skip-qa
```

---

## Flujo de Ejecución (Automático)

La skill ejecuta estos pasos en orden, adaptándose al contexto:

### Paso 1: QA Review (siempre, a menos que `--skip-qa`)
**Agente:** `qa`
**Propósito:** Validar criterios de aceptación y generar plan de pruebas

**Ejecuta:**
- Lee el spec file
- Valida que los AC estén en formato Escenarios + bullets
- Identifica gaps, ambigüedades, items "pending define"
- Genera plan de pruebas (UI/API/E2E, happy/negative/edge)
- Propone esquema data-driven JSON
- Valida cobertura de seguridad (auth/authz, validación, uploads)

**Salida esperada:**
- Inventory de escenarios y bullets
- Lista de gaps/preguntas (si hay)
- Plan de pruebas detallado
- Esquema JSON propuesto

**Decisión:**
- Si hay gaps críticos (AC missing, ambigüedades), **STOP** y pide aclaración al usuario
- Si todo está ok, continúa al Paso 2

---

### Paso 2: Extracción de data-testid (solo si scope=frontend o both, a menos que `--skip-testid`)
**Agente:** `frontend-testid-extractor`
**Propósito:** Extraer data-testid faltantes de referencias

**Ejecuta:**
- Revisa el spec en busca de links de referencia (Notion/Figma/app URL)
- Si hay links, usa `agent-browser` para:
  - Abrir la página/diseño
  - Tomar snapshots de elementos interactivos
  - Extraer data-testid existentes o proponer naming convention
- Si no hay acceso, detiene y pide info al usuario

**Salida esperada:**
- Mapping: `data-testid` → descripción del elemento/ubicación
- Lista de testid faltantes o inciertos

**Decisión:**
- Si hay testid faltantes que no se pueden inferir, **STOP** y pide al usuario
- Si todos están disponibles/confirmados, continúa al Paso 3

---

### Paso 3: Generación de Código (siempre)
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

2. **Scope está especificado:**
   - Usuario debe indicar `frontend`, `backend`, o `both`
   - Si no está claro en el spec, **preguntar antes de proceder**

3. **Referencias (si Frontend):**
   - Si el spec menciona UI pero no tiene links de referencia ni `data-testid` documentados:
     - **STOP** y pide referencias o testid al usuario
   - Si hay links, asegurarse de que sean accesibles (no requieran auth que no tenemos)

---

## Manejo de Errores y Bloqueos

### Si QA Review encuentra gaps:
```
❌ QA Review identificó los siguientes gaps:
- [lista de gaps]

Por favor, aclara estos puntos antes de continuar con la generación de código.
```
**Acción:** No continuar al siguiente paso. Esperar input del usuario.

### Si Frontend testid extractor no puede acceder a referencias:
```
❌ No se pudo acceder a [URL] para extraer data-testid.
- ¿Puedes proporcionar los data-testid manualmente?
- ¿O dar acceso/credenciales para la referencia?
```
**Acción:** Esperar input del usuario.

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

### 📋 QA Review
- **Escenarios cubiertos:** [X escenarios, Y bullets]
- **Plan de pruebas:** [UI/API/E2E distribución]
- **Gaps resueltos:** [si hubo, cómo se resolvieron]

### 🔍 Data-testid (solo Frontend)
- **Extraídos:** [N testid de referencias]
- **Mapping:** `data-driven/[feature]-testid.json` (si aplica)

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

### Saltar pasos (cuando ya validaste):
```bash
# Si ya hiciste QA review manualmente:
/playwright specs/login.md frontend --skip-qa

# Si ya tienes todos los testid documentados:
/playwright specs/login.md frontend --skip-testid
```

### Modo backend (más rápido):
Para APIs, el flujo es más directo (no hay extracción de testid):
```bash
/playwright specs/api-users.md backend
# Solo ejecuta: QA review → Code generation
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

**"Cannot extract testid, no reference link"**
→ Agregar link de referencia al spec, o usar `--skip-testid` y documentar manualmente.

**"Tests failing after generation"**
→ La skill analizará los logs automáticamente y propondrá fix. Revisar screenshots en `test-results/`.

**"Duplicate fixture name"**
→ La skill preguntará si merge con existente o renombrar. Decidir según contexto.

---

*Skill creada: 2026-02-06 | Versión: 1.0*
