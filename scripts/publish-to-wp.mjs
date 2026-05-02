import { readFileSync } from 'fs';
import { marked } from 'marked';

// ── Config ──────────────────────────────────────────────────────────────────
const WP_URL  = 'https://blog.javierledesma.com.ar';
const WP_USER = 'ClaudecodePublisher';
const WP_PASS = 'G80M vHjx 3Ojt f4J6 UgZ9 kxBx';
const MD_FILE = 'C:\\Workspaces\\Other Honeypot\\blog-post-honeypot.md';

// ── Custom renderer: Mermaid blocks → styled <pre> ─────────────────────────
const renderer = new marked.Renderer();
renderer.code = ({ text, lang }) => {
  if (lang === 'mermaid') {
    return `<figure class="wp-block-image mermaid-diagram">
<pre class="mermaid" style="background:#0d1117;color:#e6edf3;padding:1.5rem;border-radius:8px;overflow-x:auto;font-size:0.78rem;line-height:1.5">${text}</pre>
<figcaption style="text-align:center;font-size:0.85rem;color:#888;margin-top:0.5rem">📊 Diagrama interactivo</figcaption>
</figure>`;
  }
  return `<pre style="background:#0d1117;color:#e6edf3;padding:1.2rem;border-radius:6px;overflow-x:auto"><code>${text}</code></pre>`;
};

marked.use({ renderer });

// ── Read & convert Markdown ──────────────────────────────────────────────────
const md   = readFileSync(MD_FILE, 'utf8');
const html = marked.parse(md);

// ── Auth header ─────────────────────────────────────────────────────────────
const auth = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

// ── Create post as DRAFT ────────────────────────────────────────────────────
const body = JSON.stringify({
  title:   'Puse una trampa en internet. En 48 horas la encontraron.',
  content: html,
  status:  'draft',
  slug:    'honeypot-analisis-forense-cryptominer',
  excerpt: 'Armé un honeypot SSH en internet y en menos de 48 horas fue comprometido. Análisis forense completo: dos actores coordinados, un backdoor de Cloudflare Tunnel y un cryptominer disfrazado de systemd.',
  categories: [],
  tags: [],
  meta: {}
});

const res  = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
  method:  'POST',
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type':  'application/json',
  },
  body,
});

const data = await res.json();

if (res.ok) {
  console.log('✅ Post creado exitosamente!');
  console.log('   ID:     ', data.id);
  console.log('   Título: ', data.title?.rendered);
  console.log('   Estado: ', data.status);
  console.log('   Editar: ', `${WP_URL}/wp-admin/post.php?post=${data.id}&action=edit`);
  console.log('   Preview:', data.link);
} else {
  console.error('❌ Error:', data.code, data.message);
}
