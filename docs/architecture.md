# Arquitectura — Wordpress-MCP

## Diagrama de flujo

```
┌─────────────────────────────────────────────────────┐
│  LOCAL (Claude Code)                                 │
│                                                      │
│  posts/*.md  →  publish-to-wp.mjs  →  REST API call │
│                      ↓                              │
│              claudeus-wp-mcp                        │
│              (MCP Server, ~145 tools)               │
│                      ↓                              │
│  theme/greynoise-dark.css  →  inject-theme.mjs      │
│                      ↓                              │
│  ~/.claude/wp-sites.json  (credenciales, local only) │
└──────────────────────────┬──────────────────────────┘
                           │ HTTPS / WordPress REST API
┌──────────────────────────▼──────────────────────────┐
│  HOSTINGER (WordPress)                               │
│                                                      │
│  blog.javierledesma.com.ar                          │
│  ├── Theme: Twenty Twenty-Five (FSE)                │
│  ├── CSS: GreyNoise dark (via Insert H&F plugin)    │
│  ├── User: ClaudecodePublisher (Application Pass)   │
│  └── Plugins: LiteSpeed Cache, EWWW Optimizer       │
└─────────────────────────────────────────────────────┘
```

## Componentes

### claudeus-wp-mcp
- MCP Server instalado globalmente (`npm install -g claudeus-wp-mcp`)
- Expone ~145 herramientas a Claude Code
- Lee credenciales desde `~/.claude/wp-sites.json`
- Configurado en `~/.claude/settings.json` (global, no en el repo)

### publish-to-wp.mjs
- Lee un archivo `.md` de `posts/`
- Convierte Markdown → HTML (librería `marked`)
- Maneja bloques Mermaid como `<pre class="mermaid">`
- Crea el post como **borrador** (no publica directamente)
- Requiere MCP activo o llama a la REST API directamente

### inject-theme.mjs
- Lee `theme/greynoise-dark.css`
- Lo inyecta en WordPress via el plugin Insert Headers & Footers
- Reemplaza el CSS anterior

### GreyNoise Dark Theme
- Fuente de verdad: `theme/greynoise-dark.css`
- Colores: teal `#00d4aa`, fondo `#080c14`
- Tipografía: JetBrains Mono
- Inyectado via plugin, no child theme (decisión de simplicidad)

## Credenciales

| Credencial | Dónde vive | Commiteable |
|---|---|---|
| Application Password WP | `~/.claude/wp-sites.json` | No |
| MCP config con path | `~/.claude/settings.json` | No (global) |
| Template sin datos | `config/wp-sites.template.json` | Sí |
| Template MCP | `.claude/settings-template.json` | Sí |
