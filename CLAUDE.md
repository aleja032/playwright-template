# CLAUDE.md

Guía para Claude Code (claude.ai/code) al trabajar en este repositorio.

# Reglas universales (NO HACER)

- NO introducir/pegar secretos (tokens, passwords). Si detectas secretos, pedir que se usen variables de entorno.
- NO correr suites de tests muy pesadas por defecto; preferir tests específicos y preguntar antes de algo costoso.
- NO crear tests innecesarios/redundantes:
  - Evitar “combinatoria” sin valor (ej: si hay 5 campos obligatorios, NO crear 5 tests separados dejando vacío 1 campo a la vez solo para verificar "required").
  - Preferir 1 test que valide el comportamiento de "campos obligatorios" con TODOS los campos obligatorios vacíos (o el set mínimo representativo).
  - Solo separar en tests individuales si cada campo tiene reglas/errores/UX distintos (mensajes diferentes, validaciones diferentes, formatos, dependencias).
  - Si se necesita cobertura por campo, preferir un test parametrizado/data-driven en lugar de duplicar código.

## Fuentes de verdad (evitar duplicación)
- Reglas y arquitectura: `AGENTS.md` y `.cursor/rules/playwright-rules.mdc`
- Reglas de generación: `.cursor/rules/test-generation.mdc`
- QA/DoD y entregables: `.cursor/rules/qa-deliverables.mdc`
- Specs por feature (criterios de aceptación): `specs/*.md` (ver `specs/_template.md`)

## Notas sobre criterios de aceptación
- El agente NO crea criterios de aceptación nuevos.
- Se trabaja con AC en formato **Escenarios** con bullets verificables.
- Frontend: si faltan `data-testid`, abrir el enlace de referencia y extraer la info; si no es posible, preguntar.
- Considerar seguridad cuando aplique (auth/authz, validación inputs, uploads, no leakage).

## Comandos
- Tests: `npm test`
- Spec único: `npx playwright test tests/login.spec.ts`
- Test por nombre: `npx playwright test -g "test name"`
- Headed: `npm run test:headed`
- UI mode: `npm run test:ui`
- Debug: `npm run test:debug`
- Reporte HTML: `npm run report`

## Browser Automation (agent-browser)
Usar `agent-browser` para navegación/interacción rápida con sitios web.
- Docs: `.claude/skills/agent-browser/SKILL.md`

## Entregable obligatorio (para cualquier feature/cambio)
Al finalizar cambios de código, terminar la respuesta con:

### Resumen de Implementación
- Qué se implementó / cambió
- AC cubiertos
- Archivos creados/actualizados
- Comandos ejecutados y resultado
- Cómo ver el reporte (`npm run report`)
