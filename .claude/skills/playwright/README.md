# Playwright Skill - Quick Reference

## Instalación
La skill ya está disponible automáticamente. Verifica con:
```bash
/help
```

## Uso Básico

### Sintaxis
```bash
/playwright <spec-file> <scope>
```

### Ejemplos Comunes

**Frontend feature:**
```bash
/playwright specs/login.md frontend
```

**Backend API:**
```bash
/playwright specs/api-users.md backend
```

**Feature completo (UI + API):**
```bash
/playwright specs/checkout.md both
```

---

## Flujo Automático

La skill ejecuta estos pasos automáticamente:

```
┌─────────────────────────────────────────────────┐
│  1. Generación de Código                       │
│  • Page Objects (pages/*)                     │
│  • Fixtures (fixtures/custom-fixtures.ts)     │
│  • Test Specs (tests/*.spec.ts)               │
│  • Data-driven JSON (data-driven/*-data.json) │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│  2. Ejecución y Reporte                        │
│  • npm test tests/[feature].spec.ts           │
│  • npm run report                              │
│  • Muestra resultados                          │
└─────────────────────────────────────────────────┘
```

---

## Prerrequisitos

### Antes de usar la skill, asegúrate de tener:

**1. Spec file válido** en `specs/`:
- Formato: Escenarios + bullets
- AC completos (no "pending define")
- Usar template: `specs/_template.md`

**2. Scope definido:**
- `frontend`: Tests de UI con Playwright
- `backend`: Tests de API con APIRequestContext
- `both`: UI + API

**3. Referencias (si Frontend):**
- `data-testid` deben estar documentados en el spec

---

## Salida Esperada

La skill termina con un resumen completo:

```markdown
## ✅ Generación Completa: [Feature Name]

### 💻 Código Generado
Archivos creados:
- pages/LoginPage.ts
- fixtures/custom-fixtures.ts (actualizado)
- tests/login.spec.ts
- data-driven/login-data.json

Cobertura:
- Escenario 1 (Happy path): 4/4 bullets ✅
- Escenario 2 (Validation errors): 5/5 bullets ✅
- Escenario 3 (Unauthorized): 3/3 bullets ✅

### 🧪 Resultados de Tests
- Passed: 12 tests
- Failed: 0 tests
- Duration: 8.5s

Ver reporte completo:
npm run report
```

---

## Troubleshooting

### Error: "Spec file not found"
**Causa:** Ruta incorrecta
**Solución:** Verificar que el spec existe en `specs/`

### Error: "Scope not specified"
**Causa:** Falta el argumento `frontend|backend|both`
**Solución:** Agregar scope: `/playwright specs/login.md frontend`

### Error: "Tests failing after generation"
**Causa:** Selectores incorrectos, datos inválidos, timing issues
**Solución:** La skill analizará automáticamente y propondrá fix

### Error: "Duplicate fixture name"
**Causa:** Ya existe un Page Object con el mismo nombre
**Solución:** La skill preguntará si merge o renombrar

---

## Tips Avanzados

### 1. Feature grande → Dividir en specs pequeños
```bash
/playwright specs/checkout-step1-cart.md frontend
/playwright specs/checkout-step2-payment.md frontend
/playwright specs/checkout-step3-confirmation.md frontend
```

### 2. Usar Faker para datos dinámicos
Los tests pueden usar `@faker-js/faker` para generar datos realistas:
```typescript
import { faker } from '@faker-js/faker';
const email = faker.internet.email();
const name = faker.person.firstName();
```

### 3. Regenerar tests existentes
Si modificas un spec, vuelve a ejecutar la skill. Te preguntará si actualizar archivos existentes.

### 3. Validar antes de commit
```bash
npm test                    # Todos los tests
npm run test:chromium      # Solo Chrome
npm run report             # Ver reporte HTML
```

### 4. Integración con CI/CD
Los tests generados están listos para CI. Configurar pipeline:
```yaml
- run: npm ci
- run: npx playwright install --with-deps
- run: npm test
- run: npm run report
```

---

## Flujo de Trabajo Recomendado

### 1. Crear nuevo feature
```bash
# 1. Crear spec desde template
cp specs/_template.md specs/my-feature.md

# 2. Completar spec (AC, enlaces, testid)
# [editar specs/my-feature.md]

# 3. Ejecutar skill
/playwright specs/my-feature.md frontend

# 4. Review código generado
# [revisar pages/, tests/, data-driven/]

# 5. Ejecutar tests
npm test tests/my-feature.spec.ts

# 6. Ver reporte
npm run report

# 7. Commit
/commit
```

### 2. Actualizar feature existente
```bash
# 1. Actualizar spec
# [editar specs/existing-feature.md]

# 2. Re-ejecutar skill
/playwright specs/existing-feature.md frontend

# Skill detectará archivos existentes y preguntará cómo proceder
```

---

## Relacionado

- **Specs template:** `specs/_template.md`
- **Agent browser:** `/agent-browser` (usado internamente para extracción)
- **Commit skill:** `/commit` (para crear commits después de generar)
- **AGENTS.md:** Guía completa de arquitectura

---

*Última actualización: 2026-02-06*
