# WordPress MCP — blog.javierledesma.com.ar

Control total del blog via Claude Code + WordPress REST API + MCP Server.

## Stack

| Componente | Detalle |
|---|---|
| **CMS** | WordPress en Hostinger |
| **URL** | https://blog.javierledesma.com.ar |
| **Theme** | Twenty Twenty-Five (FSE) |
| **MCP Server** | claudeus-wp-mcp |
| **CSS** | GreyNoise dark theme (custom) |

### Plugins activos
- **Insert Headers & Footers** — inyección de CSS/JS global
- **LiteSpeed Cache** — performance (Hostinger LiteSpeed servers)
- **EWWW Image Optimizer** — optimización de imágenes
- **Hostinger** suite — onboarding, reach (native)

## Setup Claude Code MCP

```bash
# 1. Instalar el MCP server
npm install -g claudeus-wp-mcp

# 2. Crear config de sites (copiar template y completar)
cp config/wp-sites.template.json ~/.claude/wp-sites.json
# Editar con credenciales reales

# 3. El MCP ya está registrado en ~/.claude/settings.json
# Reiniciar Claude Code para cargar el servidor
```

## Credenciales WordPress

- **URL:** https://blog.javierledesma.com.ar
- **Usuario MCP:** ClaudecodePublisher
- **Application Password:** ver `~/.claude/wp-sites.json` (no commitear)

## Scripts disponibles

```bash
# Publicar un post desde Markdown
node scripts/publish-to-wp.mjs

# Re-inyectar el CSS del dark theme
node scripts/inject-theme.mjs

# Publicar el post del honeypot
node scripts/publish-honeypot-post.mjs
```

## Estructura del repo

```
Wordpress-MCP/
├── config/
│   └── wp-sites.template.json    # Template de credenciales (sin datos reales)
├── scripts/
│   ├── publish-to-wp.mjs         # Publica Markdown → WordPress
│   └── inject-theme.mjs          # Inyecta CSS del dark theme
├── theme/
│   └── greynoise-dark.css        # CSS completo del tema oscuro
├── posts/
│   └── honeypot-analisis-forense.md   # El post del honeypot
├── docs/
│   └── mcp-setup.md              # Guía de setup del MCP
└── .claude/
    └── settings-template.json    # Template de settings.json para Claude Code
```

## Flujo de trabajo

```
Claude Code → MCP Server (claudeus-wp-mcp) → WordPress REST API → blog
     ↓
  Git repo (este) ← persiste scripts, CSS, posts en Markdown
```

## Uso desde Claude Code (post MCP reiniciado)

```
"Publicá el post del honeypot en el blog"
"Actualizá el CSS del dark theme con estos cambios"
"Creá un nuevo post sobre X"
"Listá todos los posts borrador"
```
