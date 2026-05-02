# Setup MCP WordPress para Claude Code

## Requisitos

- Node.js 18+
- Claude Code CLI instalado
- Acceso admin al WordPress

## Instalación

### 1. MCP Server

```bash
npm install -g claudeus-wp-mcp
```

### 2. Credenciales WordPress

Crear `~/.claude/wp-sites.json` (nunca commitear):

```json
{
  "javierledesma-blog": {
    "URL": "https://blog.javierledesma.com.ar",
    "USER": "ClaudecodePublisher",
    "PASS": "tu-application-password"
  }
}
```

**Application Password:** WP Admin → Users → ClaudecodePublisher → Edit → Application Passwords → "Add New"

### 3. Claude Code settings

Agregar en `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "claudeus-wp-mcp",
      "env": {
        "WP_SITES_PATH": "C:\\Users\\TU_USUARIO\\.claude\\wp-sites.json"
      }
    }
  }
}
```

### 4. Reiniciar Claude Code

El MCP server se carga al iniciar sesión. Reiniciá Claude Code para activarlo.

## Verificar conexión

```bash
# Test directo via REST API
curl -u "ClaudecodePublisher:tu-app-password" \
  https://blog.javierledesma.com.ar/wp-json/wp/v2/users/me
```

## Herramientas disponibles (post-restart)

Después de reiniciar Claude Code con el MCP activo, tenés acceso a:

- `wordpress__create_post` — crear post
- `wordpress__update_post` — actualizar post  
- `wordpress__get_posts` — listar posts
- `wordpress__upload_media` — subir imagen
- `wordpress__get_categories` — listar categorías
- Y ~140 herramientas más del claudeus-wp-mcp

## Publicar desde Markdown

```bash
node scripts/publish-to-wp.mjs
```

El script convierte el Markdown a HTML, maneja bloques Mermaid como `<pre class="mermaid">` y crea el post como borrador para revisión.

## Plugin stack actual

| Plugin | Función | Estado |
|---|---|---|
| insert-headers-and-footers | CSS/JS injection global | ✅ Activo |
| litespeed-cache | Performance (LiteSpeed) | ✅ Activo |
| ewww-image-optimizer | Optimización imágenes | ✅ Activo |
| hostinger suite | Onboarding + reach | ✅ Activo |
