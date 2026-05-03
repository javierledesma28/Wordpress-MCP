# 002 — CSS dark theme via plugin, no child theme

**Fecha:** 2026-05
**Estado:** Vigente

## Contexto
Se necesitaba una forma de inyectar el CSS del GreyNoise dark theme en WordPress sin conflictos con el tema base.

## Decisión
Usar el plugin **Insert Headers & Footers** para inyectar CSS globalmente, en lugar de crear un child theme.

## Motivos
- Más simple que crear y mantener un child theme
- El CSS es editable desde `theme/greynoise-dark.css` y se re-inyecta con `inject-theme.mjs`
- No depende de la estructura del tema padre
- Permite cambiar el tema base sin perder el CSS customizado

## Impacto
- El CSS no sobrevive automáticamente a cambios de tema si el plugin se desactiva
- Actualizar el CSS requiere correr `node scripts/inject-theme.mjs`
- El plugin debe mantenerse activo siempre
