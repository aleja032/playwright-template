# Ejemplo de escenarios.md

Este es un ejemplo de cómo debe verse el archivo `escenarios.md` generado por el agente qa-tester.

```markdown
# Test Scenarios Report

## 1. Functional Scenarios

| ID | Escenario | Resultado Esperado | Estado | Issue |
|----|-----------|-------------------|--------|-------|
| F-001 | Usuario ingresa credenciales válidas y hace clic en Login | El sistema autentica al usuario y redirige al dashboard | ✅ | |
| F-002 | Usuario ingresa email inválido y hace clic en Login | El sistema muestra mensaje de error "Email inválido" | ✅ | |
| F-003 | Usuario deja campos vacíos y hace clic en Login | El sistema muestra mensajes de validación en ambos campos | ❌ | El mensaje de validación no aparece para el campo password. ![screenshot](./issues/F-003.png) |
| F-004 | Usuario hace clic en "Olvidé mi contraseña" | El sistema muestra formulario de recuperación de contraseña | ✅ | |

## 2. Security Scenarios

| ID | Escenario | Resultado Esperado | Estado | Issue |
|----|-----------|-------------------|--------|-------|
| S-001 | Intento de SQL injection en campo email | El sistema rechaza el input y no ejecuta queries maliciosas | ✅ | |
| S-002 | Intento de XSS en campo password | El sistema escapa caracteres especiales y no ejecuta scripts | ✅ | |
| S-003 | Acceso directo a dashboard sin autenticación | El sistema redirige a la página de login | ❌ | El dashboard es accesible sin autenticación. ![screenshot](./issues/S-003.png) |
| S-004 | Rate limiting en intentos de login fallidos | Después de 5 intentos, el sistema bloquea temporalmente la cuenta | ✅ | |
```

## Notas importantes:

1. **IDs secuenciales**: F-001, F-002... para funcional, S-001, S-002... para seguridad
2. **Sin emojis** excepto en la columna Estado (solo ✅ o ❌)
3. **Screenshots obligatorios** para escenarios fallidos
4. **Sin secciones adicionales** más allá de las dos tablas requeridas
5. **Idioma español** en todo el documento
