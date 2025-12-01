# Playwright Template - Escalable 

Template de automatización con Playwright siguiendo el patrón Page Object Model y mejores prácticas.

## 📁 Estructura del Proyecto

```
playwright-template/
├── pages/              # Page Object Models
│   ├── BasePage.ts    # Clase base con métodos comunes
│   └── LoginPage.ts   # Ejemplo de página específica
├── tests/             # Tests organizados por funcionalidad
│   └── login.spec.ts
├── fixtures/          # Custom fixtures de Playwright
│   └── custom-fixtures.ts
├── data-driven/       # Datos de prueba en JSON
│   ├── test-data.json
│   ├── login-data.json
│   └── users.data.json
├── utils/             # Utilidades y helpers
│   └── helpers.ts
└── playwright.config.ts  # Configuración principal
```

## 🚀 Instalación

```bash
npm install
npx playwright install
```

## 🧪 Ejecutar Tests

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

## 📝 Buenas Prácticas

1. **Page Object Model (POM)**: Separación de lógica de UI y tests
2. **BasePage**: Clase base con métodos reutilizables
3. **Custom Fixtures**: Inyección de dependencias para pages
4. **Data-driven testing**: Datos separados en carpeta `data-driven/`
5. **TypeScript**: Tipado fuerte y autocompletado
6. **Path aliases**: Imports limpios con @pages, @utils, @data, etc.
7. **Configuración multi-browser**: Chrome, Firefox, Safari, Mobile
8. **Reporters múltiples**: HTML, JSON, List
9. **Screenshots y videos**: Solo en fallos
10. **Retry logic**: Reintentos automáticos en CI

## 📊 Estándar de Nomenclatura para Data-Driven

Los archivos JSON en `data-driven/` deben seguir este estándar:

### Convención de Nombres:
- **Formato**: `{feature}-data.json` o `{module}.data.json`
- **Ejemplos**:
  - `test-data.json` - Datos generales de prueba
  - `login-data.json` - Datos específicos de login
  - `users.data.json` - Datos de usuarios
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

## 🔧 Configuración

Copia `.env.example` a `.env` y ajusta las variables:

```bash
cp .env.example .env
```

## 📖 Cómo Agregar Nuevos Tests

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

2. Agrega el fixture en `fixtures/custom-fixtures.ts`
3. Crea tu test en `tests/`
4. Usa data-testid para selectores estables
