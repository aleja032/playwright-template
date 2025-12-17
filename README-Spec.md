# Spec-Driven Development - Guía Completa

## ¿Qué es Spec-Driven Development?

Sistema de generación automática de tests de Playwright basado en criterios de aceptación. Escribes especificaciones en formato markdown y la IA genera automáticamente todo el código siguiendo las mejores prácticas del proyecto.

## ¿Cómo Funcionan los Comandos .md?

Los archivos `.md` en `.cursor/commands/` son **comandos personalizados** que puedes ejecutar directamente en el chat de Cursor.

### Cómo Ejecutarlos

1. Abre el chat de Cursor (Cmd+L en Mac, Ctrl+L en Windows/Linux)
2. Escribe `/` seguido del nombre del comando
3. Agrega argumentos si es necesario
4. Presiona Enter

**Ejemplo visual:**
```
┌─────────────────────────────────────┐
│ Chat de Cursor                      │
├─────────────────────────────────────┤
│ /generate-tests login               │
│                                     │
│ [La IA ejecuta el comando y        │
│  genera el código automáticamente] │
└─────────────────────────────────────┘
```

## Flujo Completo de Trabajo

### Paso 1: Crear una Spec

Crea un archivo en `specs/[feature].md` siguiendo el template:

```markdown
# Feature: Login

## Descripción
Sistema de autenticación que permite a usuarios iniciar sesión.

## URL Base
`/login`

## Criterios de Aceptación
- [ ] Usuario puede iniciar sesión con credenciales válidas
- [ ] Sistema muestra error con credenciales inválidas
- [ ] Sistema valida campos requeridos

## Elementos de UI
- `[data-testid="email-input"]` - Campo de email
- `[data-testid="password-input"]` - Campo de contraseña
- `[data-testid="login-button"]` - Botón de login
- `[data-testid="error-message"]` - Mensaje de error

## Datos de Prueba
```json
{
  "validUser": {
    "email": "user@example.com",
    "password": "SecurePass123!"
  },
  "invalidUser": {
    "email": "invalid@example.com",
    "password": "wrongpass"
  }
}
```

## Notas Adicionales
- El dashboard se encuentra en `/dashboard`
```

### Paso 2: Generar el Código

En el chat de Cursor, ejecuta:
```
/generate-tests login
```

### Paso 3: Revisar y Ejecutar

La IA habrá generado:
- `pages/LoginPage.ts` - Page Object
- `tests/login.spec.ts` - Tests
- `data-driven/login-data.json` - Datos de prueba
- Actualización de `fixtures/custom-fixtures.ts`

Ejecuta los tests:
```bash
npm test
```

## Template de Spec

Usa este template para crear nuevas specs en `specs/[feature].md`:

```markdown
# Feature: [Nombre de la Feature]

## Descripción
Breve descripción de la funcionalidad a testear.

## URL Base
URL relativa o absoluta donde se encuentra la feature (ej: `/login`, `/dashboard`)

## Criterios de Aceptación

Lista funcional de criterios que deben cumplirse:

- [ ] Criterio 1: Descripción clara y accionable
- [ ] Criterio 2: Incluye condiciones de éxito y validaciones
- [ ] Criterio 3: Especifica comportamiento esperado

## Elementos de UI

Lista de elementos interactivos con sus `data-testid`:

- `[data-testid="elemento-1"]` - Descripción del elemento
- `[data-testid="elemento-2"]` - Descripción del elemento

## Datos de Prueba

Estructura de datos necesarios para los tests:

```json
{
  "scenario1": {
    "field1": "valor1",
    "field2": "valor2"
  },
  "scenario2": {
    "field1": "valor3",
    "field2": "valor4"
  }
}
```

## Notas Adicionales

Cualquier información adicional relevante para la generación de tests.
```

## Comandos Disponibles

### 1. `/generate-tests [feature]`

**Qué hace:** Genera automáticamente todo el código de tests desde una spec.

**Uso:**
```
/generate-tests login
/generate-tests dashboard
```

**Genera:**
- Page Object en `pages/[Feature]Page.ts`
- Test spec en `tests/[feature].spec.ts`
- Data JSON en `data-driven/[feature]-data.json`
- Actualización de fixtures en `fixtures/custom-fixtures.ts`

**Requisitos:**
- El archivo `specs/[feature].md` debe existir
- Debe seguir el formato del template

### 2. `/speckit.analyze [feature]`

**Qué hace:** Analiza la cobertura de tests vs criterios de aceptación.

**Uso:**
```
/speckit.analyze login
```

**Salida:**
- Reporte de cobertura (qué criterios tienen tests)
- Criterios faltantes por cubrir
- Validaciones contra la constitución del proyecto
- Métricas de calidad

### 3. `/speckit.plan [feature]`

**Qué hace:** Genera un plan de implementación desde una spec.

**Uso:**
```
/speckit.plan login
```

**Salida:**
- Lista de Page Objects a crear
- Lista de tests a crear
- Lista de archivos de datos necesarios
- Fixtures a agregar/actualizar
- Validación contra principios del proyecto

### 4. `/speckit.constitution`

**Qué hace:** Actualiza la constitución del proyecto (principios y reglas).

**Uso:**
```
/speckit.constitution
```

Luego describe los cambios que quieres hacer a los principios del proyecto.

## Estructura de Archivos Generados

### Page Object (`pages/[Feature]Page.ts`)

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('[data-testid="email-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  async login(email: string, password: string) {
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }
}
```

**Características:**
- Extiende `BasePage`
- Usa `data-testid` para selectores
- Encapsula flujos de negocio en métodos

### Test Spec (`tests/[feature].spec.ts`)

```typescript
import { test, expect } from '../fixtures/custom-fixtures';
import loginData from '../data-driven/login-data.json';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto('/login');
  });

  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    const { email, password } = loginData.validUser;
    
    await loginPage.login(email, password);
    
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    const { email, password } = loginData.invalidUser;
    
    await loginPage.login(email, password);
    
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
```

**Características:**
- Importa desde `custom-fixtures`
- Usa datos de JSON importado
- NO usa selectores raw
- Tests paralelizables y determinísticos

### Data JSON (`data-driven/[feature]-data.json`)

```json
{
  "validUser": {
    "email": "user@example.com",
    "password": "SecurePass123!"
  },
  "invalidUser": {
    "email": "invalid@example.com",
    "password": "wrongpass"
  }
}
```

**Características:**
- Nombre descriptivo: `[feature]-data.json`
- NO incluye datos sensibles reales
- Estructura clara por escenario

### Fixture (`fixtures/custom-fixtures.ts`)

```typescript
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type CustomFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
```

**Características:**
- Única fuente de `test` y `expect`
- Expone Page Objects como fixtures
- Preserva fixtures existentes al agregar nuevos

## Reglas y Principios

### Orden de Generación OBLIGATORIO

1. **Page Object** (`pages/[Feature]Page.ts`)
2. **Fixture** (actualizar `fixtures/custom-fixtures.ts`)
3. **Test Spec** (`tests/[feature].spec.ts`)
4. **Data JSON** (`data-driven/[feature]-data.json`)

### Nomenclatura

- **Page Objects**: PascalCase, sufijo `Page` (ej: `LoginPage`, `DashboardPage`)
- **Tests**: kebab-case, sufijo `.spec.ts` (ej: `login.spec.ts`)
- **Data JSON**: kebab-case, sufijo `-data.json` (ej: `login-data.json`)
- **Fixtures**: camelCase (ej: `loginPage`, `dashboardPage`)

### Validaciones Automáticas

Antes de generar, la IA verifica:
- ✅ Page Object extiende `BasePage`
- ✅ Todos los selectores usan `data-testid`
- ✅ Test importa desde `custom-fixtures`
- ✅ Test usa datos de JSON importado
- ✅ No hay selectores raw en tests
- ✅ TypeScript strict mode compatible
- ✅ Sigue estructura del proyecto

### Principios del Proyecto

El código generado sigue estrictamente:

1. **Page Object Model (POM)** - REQUIRED
   - Todos los tests interactúan con UI a través de Page Objects
   - Page Objects extienden `BasePage`
   - Selectores estables con `data-testid`

2. **Fixtures como Single Source of Truth**
   - `fixtures/custom-fixtures.ts` es la única fuente de `test` y `expect`
   - Page Objects expuestos como fixtures nombradas

3. **Data-Driven Testing**
   - Datos almacenados en JSON bajo `data-driven/`
   - NO datos hardcodeados en tests

4. **TypeScript Strict Mode**
   - Todo el código usa TypeScript strict mode
   - Preferir utilidades reutilizables

5. **Tests Determinísticos y Paralelizables**
   - Tests corren en paralelo
   - NO asunciones sobre orden de ejecución
   - Sin flakiness

## Ejemplo Completo

### 1. Crear Spec

Archivo: `specs/dashboard.md`

```markdown
# Feature: Dashboard

## Descripción
Panel principal que muestra estadísticas y resumen de datos.

## URL Base
`/dashboard`

## Criterios de Aceptación
- [ ] Usuario puede ver el resumen de estadísticas
- [ ] Usuario puede filtrar datos por fecha
- [ ] Usuario puede exportar reporte

## Elementos de UI
- `[data-testid="stats-summary"]` - Resumen de estadísticas
- `[data-testid="date-filter"]` - Filtro de fecha
- `[data-testid="export-button"]` - Botón de exportar

## Datos de Prueba
```json
{
  "dateRange": {
    "startDate": "2024-01-01",
    "endDate": "2024-12-31"
  }
}
```
```

### 2. Ejecutar Comando

En Cursor:
```
/generate-tests dashboard
```

### 3. Resultado

La IA genera:
- `pages/DashboardPage.ts`
- `tests/dashboard.spec.ts`
- `data-driven/dashboard-data.json`
- Actualiza `fixtures/custom-fixtures.ts`

### 4. Ejecutar Tests

```bash
npm test
```

## Troubleshooting

### ¿El comando no aparece en Cursor?

- Verifica que el archivo esté en `.cursor/commands/`
- El nombre del archivo debe ser `[nombre].md`
- Reinicia Cursor si es necesario
- Verifica que el frontmatter tenga `description:`

### ¿No genera el código correctamente?

- Verifica que la spec siga el formato del template
- Asegúrate de incluir todos los `data-testid` necesarios
- Revisa que los criterios de aceptación estén claros
- Verifica que el archivo `specs/[feature].md` exista

### ¿El código generado tiene errores?

- Verifica que `BasePage.ts` exista y esté correcto
- Revisa que `fixtures/custom-fixtures.ts` tenga la estructura correcta
- Asegúrate de que `tsconfig.json` tenga `resolveJsonModule: true`
- Ejecuta `npm install` para asegurar dependencias

### ¿Los tests fallan?

- Verifica que los `data-testid` existan en la aplicación
- Revisa que la URL base sea correcta
- Asegúrate de que los datos de prueba sean válidos
- Verifica la configuración de `playwright.config.ts`

## Referencias

- **Constitución del proyecto**: `.cursor/rules/playwright-rules.mdc`
- **Reglas de generación**: `.cursor/rules/test-generation.mdc`
- **BasePage**: `pages/BasePage.ts`
- **Fixtures**: `fixtures/custom-fixtures.ts`
- **Comando principal**: `.cursor/commands/generate-tests.md`

## Mejores Prácticas

1. **Escribe specs claras y completas**
   - Criterios de aceptación específicos y accionables
   - Todos los `data-testid` documentados
   - Datos de prueba realistas pero no sensibles

2. **Revisa el código generado**
   - Aunque la IA sigue las reglas, siempre revisa
   - Ajusta métodos del Page Object si es necesario
   - Agrega validaciones adicionales si se requieren

3. **Mantén las specs actualizadas**
   - Actualiza specs cuando cambien los criterios
   - Regenera código cuando sea necesario
   - Usa `/speckit.analyze` para verificar cobertura

4. **Usa análisis regularmente**
   - Ejecuta `/speckit.analyze` periódicamente
   - Identifica criterios sin cobertura
   - Mantén alta cobertura de tests

## Optimización de Tokens

El sistema está optimizado para ahorrar tokens:

- Los comandos referencian archivos en lugar de duplicar contenido
- Se usan patrones existentes de `BasePage.ts` y `custom-fixtures.ts`
- Las reglas están en archivos separados y se referencian
- El código generado es conciso y enfocado

---

