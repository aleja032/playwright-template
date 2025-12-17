# Feature: Login

## Descripción
Sistema de autenticación que permite a usuarios iniciar sesión con email y contraseña.

## URL Base
`/login`

## Criterios de Aceptación

- [ ] Usuario puede iniciar sesión con credenciales válidas y es redirigido al dashboard
- [ ] Sistema muestra mensaje de error cuando las credenciales son inválidas
- [ ] Sistema valida que los campos email y contraseña sean requeridos
- [ ] Usuario puede ver/ocultar la contraseña usando el botón de toggle

## Elementos de UI

- `[data-testid="email-input"]` - Campo de entrada para email
- `[data-testid="password-input"]` - Campo de entrada para contraseña
- `[data-testid="login-button"]` - Botón para enviar el formulario
- `[data-testid="error-message"]` - Mensaje de error
- `[data-testid="toggle-password"]` - Botón para mostrar/ocultar contraseña

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
  },
  "emptyCredentials": {
    "email": "",
    "password": ""
  }
}
```

## Notas Adicionales

- El dashboard se encuentra en `/dashboard`
- El mensaje de error debe ser visible y contener texto descriptivo

