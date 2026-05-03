# 001 — claudeus-wp-mcp como MCP server

**Fecha:** 2026-05
**Estado:** Vigente

## Contexto
Se necesitaba una forma de controlar WordPress desde Claude Code sin escribir una integración custom desde cero.

## Decisión
Usar **claudeus-wp-mcp** como MCP server pre-construido.

## Motivos
- ~145 herramientas listas para usar (posts, media, plugins, temas, usuarios, etc.)
- Instalación simple: `npm install -g claudeus-wp-mcp`
- Soporte nativo para Application Passwords de WordPress
- Evita escribir y mantener un MCP server propio

## Impacto
- Depende de un paquete externo (monitorear actualizaciones)
- Las credenciales se manejan via `~/.claude/wp-sites.json` (fuera del repo)
- Si el paquete deja de mantenerse, evaluar fork o custom server
