# Wordpress-MCP — blog.javierledesma.com.ar

## Resumen
Control total del blog personal via Claude Code + MCP Server + WordPress REST API.
El objetivo es escribir posts en Markdown localmente y publicarlos al blog con un solo comando o conversación.

## Stack
- **CMS:** WordPress en Hostinger
- **URL blog:** https://blog.javierledesma.com.ar
- **MCP Server:** claudeus-wp-mcp (~145 herramientas para gestionar WordPress)
- **Usuario MCP:** `ClaudecodePublisher` con Application Password
- **Credenciales MCP:** `~/.claude/wp-sites.json` (nunca en el repo)
- **Theme:** Twenty Twenty-Five (FSE) — activar si no está activo
- **CSS:** GreyNoise dark theme (teal `#00d4aa`, bg `#080c14`, JetBrains Mono)
- **CSS injection:** Plugin "Insert Headers & Footers" — no child theme
- **Runtime:** Node.js 18+

## Flujo de trabajo
```
posts/*.md (Markdown local)
    ↓
node scripts/publish-to-wp.mjs
    ↓
claudeus-wp-mcp (MCP Server)
    ↓
WordPress REST API
    ↓
blog.javierledesma.com.ar (borrador para revisión)
```

## Comandos clave
```bash
# Publicar un post desde Markdown
node scripts/publish-to-wp.mjs

# Re-inyectar el CSS del dark theme
node scripts/inject-theme.mjs

# Instalar dependencias
npm install

# Verificar conexión MCP via REST API
curl -u "ClaudecodePublisher:APP_PASS" \
  https://blog.javierledesma.com.ar/wp-json/wp/v2/users/me
```

## Con el MCP activo en Claude Code
```
"Publicá el post del honeypot en el blog"
"Actualizá el CSS del dark theme"
"Creá un nuevo post sobre [tema]"
"Listá todos los posts en borrador"
"Subí esta imagen al media library"
```

## Archivos críticos
- `scripts/publish-to-wp.mjs` → convierte Markdown a HTML y crea borrador en WP
- `scripts/inject-theme.mjs` → re-inyecta CSS via API de WP
- `theme/greynoise-dark.css` → fuente de verdad del dark theme
- `posts/` → posts en Markdown listos para publicar
- `config/wp-sites.template.json` → template de credenciales (copiar a `~/.claude/wp-sites.json`)
- `docs/mcp-setup.md` → guía completa de setup del MCP

## Setup inicial (primera vez)
```bash
npm install -g claudeus-wp-mcp
cp config/wp-sites.template.json ~/.claude/wp-sites.json
# Completar con credenciales reales en ~/.claude/wp-sites.json
# Agregar MCP config en ~/.claude/settings.json (ver docs/mcp-setup.md)
# Reiniciar Claude Code
```

## Plugins activos en WordPress
- **Insert Headers & Footers** → inyección del CSS dark theme global
- **LiteSpeed Cache** → performance (servidores Hostinger LiteSpeed)
- **EWWW Image Optimizer** → optimización de imágenes

## Convenciones
- Posts siempre como borrador primero, revisar antes de publicar
- Markdown en `posts/` con nombre descriptivo en kebab-case
- CSS del tema vive en `theme/greynoise-dark.css` — editar aquí, luego inyectar
- Credenciales NUNCA en el repo (ni en código, ni en commits)

## Pendiente crítico
- Activar **Twenty Twenty-Five** en WP Admin → Apariencia → Temas → Activar
  (desbloquea inyección limpia de CSS via FSE y elimina conflictos con Kubio)

## Notion — documentación completa
- Índice del proyecto: https://www.notion.so/3556c5f682d881968111cabd1d82721e
- Setup MCP: https://www.notion.so/3556c5f682d881f2b55cf49346068969
- WordPress Stack: https://www.notion.so/3556c5f682d8814da3c3e794b98b0737
- CSS Dark Theme: https://www.notion.so/3556c5f682d881c987b4e573fc1a40e9
- Flujo de Publicación: https://www.notion.so/3556c5f682d8810caf61eab113a2a9d2
- Scripts Reference: https://www.notion.so/3556c5f682d88116bea9f0716da37ce2
- Pendientes: https://www.notion.so/3556c5f682d881109eaff0703eabaa6e

## Lo que NO necesita explicación
- Cómo funciona WordPress o la REST API de WP en general
- Cómo funciona Node.js o ES modules (.mjs)
- Conceptos básicos de MCP servers
