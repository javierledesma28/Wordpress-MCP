# 003 — Twenty Twenty-Five (FSE) sobre Kubio

**Fecha:** 2026-05
**Estado:** Vigente — pendiente activar en WP Admin

## Contexto
El blog arrancó con Kubio como tema. Se evaluaron alternativas para tener mejor control via Full Site Editing (FSE).

## Decisión
Migrar a **Twenty Twenty-Five** (tema FSE nativo de WordPress).

## Motivos
- FSE permite editar header, footer y templates globales directamente
- Mejor integración con la inyección de CSS via Global Styles
- Elimina conflictos que existían con Kubio
- Tema oficial de WordPress, mantenido a largo plazo

## Pendiente
- Activar manualmente: WP Admin → Apariencia → Temas → Twenty Twenty-Five → Activar
- Validar que el CSS del dark theme se aplica correctamente post-activación
- Re-inyectar CSS con `node scripts/inject-theme.mjs` después de activar
