# Playwright Template - Escalable 

Template de automatización con Playwright siguiendo el patrón Page Object Model y mejores prácticas.

## Estructura del Proyecto

```
playwright-template/
├── pages/              # Page Object Models (UI y API)
│   ├── BasePage.ts     # Clase base con métodos comunes
│   ├── LoginPage.ts    # Ejemplo de página de UI
│   └── UserController.ts # "Page Object" de API para usuarios
├── tests/              # Tests organizados por funcionalidad/tipo
│   └── login.spec.ts
├── fixtures/           # Custom fixtures de Playwright (fuente única de test/expect)
│   └── custom-fixtures.ts
├── data-driven/        # Datos de prueba en JSON (UI, API, E2E) solo para datos estaticos o api faker para datos que cambian constantemente
│   ├── test-data.json
│   ├── login-data.json
│   └── users.data.json
├── utils/             # Utilidades y helpers
│   └── helpers.ts
└── playwright.config.ts  # Configuración principal
```

## Instalación

### Dependencias requeridas

- **Playwright** (`@playwright/test`): runner y API de automatización.
- **Faker** (`@faker-js/faker`): generación de datos variados/dinámicos para evitar hardcode.
- **agent-browser** (CLI): automatización de navegador para agentes (extracción de `data-testid`, navegación rápida, screenshots, etc.).
  - Verifica que está disponible con: `agent-browser --help`
  - Referencia: `.claude/skills/agent-browser/SKILL.md`
- **playwright-cli** (alternativa): si `agent-browser` presenta problemas de instalación o no está disponible, usa `playwright-cli` como reemplazo.
  - Instalar: `npm install -g @playwright/cli@latest`
  - Para indicarle al agente que use esta alternativa, incluye en tu prompt: `Use playwright skills to test`

```bash
npm install
npx playwright install
npm install -g agent-browser
npm install -D @faker-js/faker

# Alternativa si agent-browser presenta problemas de instalación o no está disponible:
npm install -g @playwright/cli@latest
```

## Ejecutar Tests

```bash
# Todos los tests
npm test

# Con interfaz visual
npm run test:ui

# En modo debug
npm run test:debug

# Solo en Chromium
npm run test:chromium

# Ver reporte
npm run report
```

## Buenas Prácticas

1. **Page Object Model (POM)**: Separación de lógica de UI y tests api como "controladores"
2. **BasePage**: Clase base con métodos reutilizables
3. **Custom Fixtures**: Inyección de dependencias para Page Objects de UI y controllers de API (una sola fuente de `test` y `expect`)
4. **Data-driven testing**: Datos separados en carpeta `data-driven/`
5. **TypeScript**: Tipado fuerte y autocompletado (solo se usa donde se vea necesario)
6. **Path aliases**: Imports limpios con @pages, @utils, @data, etc.
7. **Configuración multi-browser**: Chrome, Firefox, Safari, Mobile
8. **Reporters múltiples**: HTML, JSON, List
9. **Screenshots y videos**: Solo en fallos
10. **Retry logic**: Reintentos automáticos en CI

## Tipos de Tests (UI, Web/E2E, API)

- **Tests de UI / Web (navegador):**
  - Usan Page Objects en `pages/` (por ejemplo `LoginPage` que extiende `BasePage`).
  - Importan siempre `test` y `expect` desde `fixtures/custom-fixtures.ts` y consumen la fixture `loginPage`.
  - No usan selectores raw; todo va a través de las propiedades `Locator` del Page Object.

- **Tests de API (sin UI):**
  - Usan “Page Objects” de API como `UserController` en `pages/UserController.ts`.
  - Reutilizan el mismo `test` y `expect` desde `fixtures/custom-fixtures.ts` y acceden a la fixture `userController`.
  - Los payloads y escenarios se definen en JSON bajo `data-driven/` para evitar duplicar datos en los tests o usar la libreria faker.

- **Tests E2E completos (UI + API):**
  - Combinan fixtures de UI (`loginPage`, etc.) y de API (`userController`) en un mismo test.
  - La lógica de negocio se encapsula en métodos de Page Objects y controllers, manteniendo los tests muy delgados.
  - Siempre que se pueda, se reutilizan métodos y datos existentes para reducir código repetido y consumo de tokens.

## Estándar de Nomenclatura para Data-Driven

Los archivos JSON en `data-driven/` deben seguir este estándar:

### Convención de Nombres:
- **Formato**: `{feature}-data.json` o `{module}.data.json`
- **Ejemplos**:
  - `login-data.json` - Datos específicos de login
  - `products.data.json` - Datos de productos
  - `api-endpoints.data.json` - Endpoints de API

### Importación:
```typescript
// Usando path relativo
import testData from '../data-driven/test-data.json';

// Usando path alias (configurado en tsconfig.json)
import loginData from '@data/login-data.json';
import usersData from '@data/users.data.json';
```
### Librería Faker para la data

Ejemplo de uso:

```typescript
import { faker } from '@faker-js/faker';

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email();
```

## Configuración

Copia `.env.example` a `.env` y ajusta las variables:

```bash
cp .env.example .env
```

## Cómo Agregar Nuevos Tests (Manual)

1. Crea un nuevo Page Object en `pages/`:
```typescript
export class HomePage extends BasePage {
  readonly searchInput: Locator;
  
  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('[data-testid="search"]');
  }
}
```
1. Agrega el fixture correspondiente en `fixtures/custom-fixtures.ts` (o reutiliza una existente si aplica).
2. Crea tu test en `tests/` (UI, API o E2E) consumiendo solo fixtures y datos de `data-driven/`.
3. Usa `data-testid` para selectores estables y evita lógica de negocio duplicada en los tests.

**Recomendación**: Usa el sistema spec-driven (`README-Spec.md`) para generar código automáticamente siguiendo las mejores prácticas del proyecto y minimizar consumo de tokens.
