# Informe (techo 1000 líneas): motor de trabajo con skills, MCP, memoria y APIs baratas

Este documento **ordena recursos**, **incrusta fragmentos reales de READMEs** (Apéndices **A–V**) y explica **ventajas, implementaciones posibles y uso conjunto**. **Techo:** ~1000 líneas (`wc -l` ≈ 760–800 según versión); no caben READMEs enteros tipo RuFlo.

**Leé primero tu “constitución” del repo:** [objetivo-workspace-personal.md](./objetivo-workspace-personal.md) (second brain, fases, qué queda afuera por ahora).

**Enfoque acordado:** priorizar **scaffolding del entorno** (agente + contexto + MCP + costo). Recursos **puramente visuales / diseño** quedan en **fase 2** (puntero en §12).

**Fecha:** abril 2026. Cuotas y precios cambian — verificá en la fuente.

---

## 1. Motor de trabajo integrado (cómo encajar todo)

### 1.1 Flujo mental en tres capas

```text
[ Humano: Obsidian / notas en repo ]  ←→  [ Agente: CLAUDE.md + rules + skills ]
                                              ↓
                    [ Herramientas: MCP 3–5 ] → [ APIs / Git / DB / Browser ]
                                              ↓
         [ Memoria de sesión: claude-mem | compress caveman | SQLite/Chroma ]
                                              ↓
              [ Modelo: gratis/barato vía free-coding-models + listas API ]
```

**Ventajas de esta separación**

- **No perdés contexto** entre “qué quiero” (notas) y “qué debe hacer el agente” (rules/skills).
- **No quemás tokens** en docstrings de 40 MCP: mantenés **3–5** integraciones que usás cada semana.
- **Costo predecible**: tareas mecánicas → modelo rápido gratis (Groq/Cerebras/Gemini según tabla); razonamiento duro → modelo mejor dentro de tu cupo **10–20 USD/mes** si hace falta.

### 1.2 Orden de adopción recomendado (para tu objetivo)

| Paso | Qué activás | Resultado |
|------|-------------|-----------|
| 1 | Repo + notas + **un** `CLAUDE.md` maestro (cuando implementes código) | Single source of truth mínima |
| 2 | **Context7** MCP + **GitHub** MCP | Docs frescas + repo sin salir del IDE |
| 3 | Subconjunto de **antigravity-awesome-skills** (bundle o `--category`) | Playbooks sin instalar 1.4k skills |
| 4 | **claude-mem** (si usás Claude Code con plugins) | Memoria entre sesiones |
| 5 | **caveman** o política de respuesta corta | Menos tokens de salida / memorias comprimidas |
| 6 | **free-coding-models** + **cheahjs** / **mnfst** | Elegir proveedor gratis o casi gratis |
| 7 | **OpenClaw** (opcional) | Canales + cron + asistente 24/7 |
| 8 | **RuFlo** (solo si el dolor es multi-agente masivo) | Orquestación pesada |

### 1.3 Implementaciones posibles (sin código aún)

- **Workspace monorepo:** `docs/` (informes), `brain/` (Obsidian vault), `.claude/` o `.cursor/` según herramienta, `playbooks/` (checklists).
- **Doble entrada:** cada recurso importante = **una nota humana** + **un enlace** desde `CLAUDE.md` (“ver `brain/resources/…`”).
- **MCP por proyecto vs usuario:** globales (`--scope user`) solo para GitHub/Context7; el resto por repo si tocá APIs sensibles.
- **One Knowledge + MCP**: cuando el agente deba integrar **muchas APIs de productos**, la base [withoneai/knowledge](https://github.com/withoneai/knowledge) reduce alucinaciones de auth/params (ver Apéndice F).

### 1.4 Riesgos a vigilar

- **Secretos** en env de MCP y en hooks; nunca en notas versionadas.
- **AGPL** de claude-mem si modificás y servís en red.
- **Sobrecarga de skills** en Antigravity/OpenCode — usar filtros del instalador y `agent-overload-recovery` del doc del catálogo.

---

## 2. Lista MCP (hilo @zodchiii, abr 2026)

**Origen:** texto del post (archivado acá; `x.com` dio 403 a bots). Canal autor: [t.me/zodchixquant](https://t.me/zodchixquant).

**Idea clave:** 3–5 servidores; más = costo de contexto en descripciones de tools.

```bash
claude mcp add server-name -- npx -y @package/server
claude mcp add server-name -e API_KEY=your-key -- npx -y @package/server
claude mcp add --scope user server-name -- npx -y @package/server
claude mcp list && claude mcp remove server-name
```

**Claude Desktop:**

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@package/server"],
      "env": { "API_KEY": "your-key" }
    }
  }
}
```

### 2.1 Tabla por categoría

| Cat | # | Servidor | Resumen | URL |
|-----|---|----------|---------|-----|
| Search | 01 | Tavily | Búsqueda para agentes; ~1k queries/mo free | [tavily-mcp](https://github.com/tavily-ai/tavily-mcp) |
| Search | 02 | Exa | Búsqueda semántica; ~1k/mo free | [exa-mcp-server](https://github.com/exa-labs/exa-mcp-server) |
| Search | 03 | Brave | 6 tools; ~$5/mo | [anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts) |
| Search | 04 | Perplexity | Respuestas sintetizadas | [perplexity-mcp](https://github.com/ppl-ai/perplexity-mcp) |
| Search | 05 | Context7 | Docs en vivo OSS | [context7](https://github.com/context-labs/context7) |
| Scrape | 06 | Firecrawl | URL→markdown; 500 créditos | [firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server) |
| Scrape | 07 | Apify | 3000+ actors; $5/mo credits | [actors-mcp-server](https://github.com/apify/actors-mcp-server) |
| Scrape | 08 | Bright Data | Anti-bot; pago | [bright-data-mcp](https://github.com/nicholasgriffintn/bright-data-mcp) |
| Scrape | 09 | Crawl4AI | OSS crawl | [crawl4ai](https://github.com/unclecode/crawl4ai) |
| Browser | 10 | Playwright | Control Chrome | [anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts) |
| Browser | 11 | Browserbase | Browser cloud; 100 sesiones/mo | [mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase) |
| Dev | 12 | GitHub | PRs, issues, CI | [github-mcp-server](https://github.com/github/github-mcp-server) |
| Dev | 13 | Linear | Issues | [linear-mcp-server](https://github.com/linear/linear-mcp-server) |
| Dev | 14 | Sentry | Errores prod | [mcp.sentry.dev](https://mcp.sentry.dev) |
| Dev | 15 | Vercel | Deploys/logs | [mcp-server-vercel](https://github.com/vercel/mcp-server-vercel) |
| Dev | 16 | Atlassian | Jira | [mcp-server-atlassian](https://github.com/atlassian/mcp-server-atlassian) |
| DB | 17 | Supabase | Postgres stack | [mcp-server-supabase](https://github.com/supabase/mcp-server-supabase) |
| DB | 18 | PostgreSQL | NL queries | [anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts) |
| DB | 19 | MongoDB | 40+ tools | [mongodb-mcp-server](https://github.com/mongodb/mongodb-mcp-server) |
| DB | 20 | Neo4j | Grafos | [neo4j-mcp-server](https://github.com/neo4j/neo4j-mcp-server) |
| Vector | 21 | Pinecone | 2GB free | [pinecone-mcp](https://github.com/pinecone-io/pinecone-mcp) |
| Vector | 22 | Qdrant | OSS | [mcp-server-qdrant](https://github.com/qdrant/mcp-server-qdrant) |
| Vector | 23 | Chroma | Ligero | [chroma-mcp](https://github.com/chroma-core/chroma-mcp) |
| Vector | 24 | Memory | Quickstarts | [anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts) |
| Collab | 25 | Notion | quickstarts | [anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts) |
| Collab | 26 | Slack | quickstarts | [anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts) |
| Collab | 27 | Todoist | [todoist-mcp-server](https://github.com/abhiz123/todoist-mcp-server) |
| Collab | 28 | Zapier | 100 tasks/mo | [zapier-mcp-server](https://github.com/zapier/zapier-mcp-server) |
| Biz | 29 | Stripe | test mode | [agent-toolkit](https://github.com/stripe/agent-toolkit) |
| Biz | 30 | HubSpot | CRM | [mcp-server-hubspot](https://github.com/hubspot/mcp-server-hubspot) |
| Design | 31 | Figma | [figma-mcp](https://github.com/nicholasgriffintn/figma-mcp) |
| Design | 32 | Bannerbear | 30 img/mo | [bannerbear-mcp](https://github.com/bannerbear/bannerbear-mcp) |
| Infra | 33 | Cloudflare | [mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) |
| Infra | 34 | Docker | [docker-mcp](https://github.com/docker/docker-mcp) |
| Infra | 35 | Grafana | [mcp-grafana](https://github.com/grafana/mcp-grafana) |

**Starter packs del hilo:** Dev → GitHub+Sentry+Context7+Playwright · Research → Tavily+Firecrawl+Exa · PM → Linear+Slack+Notion · Business → Stripe+HubSpot+Zapier · Data → Supabase+Firecrawl+Apify.

---

## 3. Catálogo de skills — antigravity-awesome-skills

**Repo:** [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills)

- **Qué es:** miles de `SKILL.md` instalables vía `npx antigravity-awesome-skills` con flags por host (`--cursor`, `--claude`, `--gemini`, `--codex`, `--antigravity`, `--kiro`, `--path`).
- **Por qué:** biblioteca + bundles/workflows + catálogo web; ver **Apéndice A** para tablas literales del README.
- **Cuidado:** en OpenCode/Antigravity con poco contexto, usar `--category`, `--risk`, `--tags` y doc `agent-overload-recovery`.
- **Starters citados en README:** `@brainstorming`, `@test-driven-development`, `@debugging-strategies`, `@lint-and-validate`, `@security-auditor`, `@frontend-design`, `@api-design-principles`, `@create-pr`.

---

## 4. Claude Code best practice (mapa)

**Repo:** [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice)

- Índice vivo: **conceptos oficiales** ↔ `best-practice/` ↔ `implementation/`.
- Patrón **Research → Plan → Execute → Review → Ship** y tabla de workflows (Superpowers, Spec Kit, etc.).
- Tabla **CONCEPTS** embedida en **Apéndice B** (extracto).

---

## 5. Memoria — claude-mem

**Repo:** [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

- Hooks + worker **:37777** + SQLite + Chroma + skill `mem-search`; MCP en 3 pasos (`search` → `timeline` → `get_observations`).
- `npx claude-mem install` o marketplace; **no** uses solo `npm i -g` para el stack completo.
- OpenClaw: `curl -fsSL https://install.cmem.ai/openclaw.sh | bash`
- **Licencia AGPL-3.0**; `ragtime/` PolyForm Noncommercial.
- Extracto en **Apéndice D**.

---

## 6. Caveman (tokens)

**Repo:** [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)

- Respuestas breves + `caveman-compress` para `CLAUDE.md`; niveles lite/full/ultra + 文言文.
- Instalación multi-agente en **Apéndice C**.
- Paper: [arXiv:2604.00025](https://arxiv.org/abs/2604.00025).

---

## 7. RuFlo (orquestación opcional)

**Repo:** [ruvnet/ruflo](https://github.com/ruvnet/ruflo)

- Plataforma masiva (swarms, RuVector, MCP, Rust/WASM). **Evaluar después** del núcleo; README enorme — validar en issues antes de comprometer tiempo.

---

## 8. OpenClaw + video Pelado Nerd

- **openclaw.ai:** gateway, canales, tools, skills, cron, memoria en archivos.
- **Video:** [JVA09oUTXzM](https://www.youtube.com/watch?v=JVA09oUTXzM) — guía [peladonerd openclaw/2](https://github.com/pablokbs/peladonerd/blob/master/openclaw/2/README.md).

---

## 9. APIs y modelos baratos

| Repo | Rol |
|------|-----|
| [vava-nessa/free-coding-models](https://github.com/vava-nessa/free-coding-models) | Benchmark 238+ modelos + escribe config en muchos CLIs |
| [cheahjs/free-llm-api-resources](https://github.com/cheahjs/free-llm-api-resources) | Lista detallada free + trials |
| [mnfst/awesome-free-llm-apis](https://github.com/mnfst/awesome-free-llm-apis) | Free tier permanente compacto |
| [inmve/free-ai-coding](https://github.com/inmve/free-ai-coding) | IDEs con modelos “pro” en free |
| [amardeeplakshkar/awesome-free-llm-apis](https://github.com/amardeeplakshkar/awesome-free-llm-apis) | Tablas OpenAI-compat + Pollinations |

**Táctica de costo:** gratis para “chores”; reservá **10–20/mo** para un cuello (más RPD, mejor modelo en tareas críticas).

---

## 10. One Knowledge (APIs para agentes)

**Repo:** [withoneai/knowledge](https://github.com/withoneai/knowledge)

- Base estructurada **250+ plataformas**, **40k+ tools**; CLI `one init` conecta Claude Code, Cursor, Desktop, Windsurf, MCP.
- API REST con header `x-one-secret` — ver **Apéndice F**.
- Complementa **Context7** (libs) vs **One** (APIs de productos).

---

## 11. WebGPU skill (solo si el proyecto es 3D web)

**Repo:** [dgreenheck/webgpu-claude-skill](https://github.com/dgreenheck/webgpu-claude-skill) — Three.js r171+ WebGPU + TSL; copiar `.cursor/rules` + `skills/` juntos.

---

## 12. Diseño / motion / UI (fase 2 — no bloquean el motor)

| Recurso | Uso cuando toque |
|---------|------------------|
| [impeccable.style](https://impeccable.style/) | Comandos + anti-patrones + CLI |
| [emilkowal.ski/skill](https://emilkowal.ski/skill) | Motion/UI; `npx skills add emilkowalski/skill` |
| animations.dev, Aceternity, Stitch, Awwwards, getdesign.md | Referencia y prototipos visuales |

---

## 13. Obsidian

**[obsidian.md](https://obsidian.md)** — second brain local; enlazar con repo vía vault en carpeta versionada; skills Obsidian citados en créditos del catálogo (p. ej. kepano/obsidian-skills).

---

## 14. MCP vs Skills (elección rápida)

| Necesidad | Usar |
|-----------|------|
| API externa estable | MCP |
| Procedimiento / estándar repo | Skill / rules |
| Docs librerías actualizadas | Context7 MCP |
| Menos tokens respuesta | Caveman |
| Continuidad sesiones | claude-mem |
| Muchas APIs SaaS con params/auth | One Knowledge + MCP |

---

## 15. Tabla resumen

| Recurso | Rol |
|---------|-----|
| Hilo MCP zodchiii | Curated 35 servers |
| antigravity-awesome-skills | Biblioteca skills |
| shanraisshan/… | Mapa Claude Code |
| claude-mem | Memoria persistente |
| caveman | Compresión tokens |
| ruflo | Orquestación heavy (opcional) |
| OpenClaw + video | Asistente 24/7 (opcional) |
| Listas APIs + free-coding-models | Costo ~0 |
| withoneai/knowledge | API knowledge agents |
| webgpu-claude-skill | Especialista 3D |
| obsidian | Second brain humano |

---

## Apéndice A — Extracto README `antigravity-awesome-skills` (instalación + hosts)

*Fuente: README en `main` del repo (abril 2026). Ligeramente condensado.*

```text
## Installation
npx antigravity-awesome-skills
# verify: test -d ~/.gemini/antigravity/skills && echo OK

## Choose Your Tool (tabla original)
| Tool        | Install |
| Claude Code | npx antigravity-awesome-skills --claude o plugin marketplace |
| Cursor      | npx antigravity-awesome-skills --cursor |
| Gemini CLI  | npx antigravity-awesome-skills --gemini |
| Codex CLI   | npx antigravity-awesome-skills --codex |
| Antigravity | npx antigravity-awesome-skills --antigravity |
| Kiro CLI    | npx antigravity-awesome-skills --kiro |
| Kiro IDE    | npx antigravity-awesome-skills --path ~/.kiro/skills |
| Copilot     | manual paste |
| OpenCode    | npx antigravity-awesome-skills --path .agents/skills --category development,backend --risk safe,none |
| Custom      | npx antigravity-awesome-skills --path ./my-skills |
```

---

## Apéndice B — Extracto `claude-code-best-practice` tabla CONCEPTS

*Sin badges de imagen; solo contenido útil.*

| Feature | Location | Description (resumen) |
|---------|----------|------------------------|
| Subagents | `.claude/agents/.md` | Actor aislado con tools/permissions propias |
| Commands | `.claude/commands/` | Plantillas `/slash` |
| Skills | `.claude/skills/` + `SKILL.md` | Conocimiento progresivo |
| Workflows | commands orquestadores | Patrón Command→Agent→Skill |
| Hooks | `.claude/hooks/` | Scripts en eventos del ciclo |
| MCP | `.claude/settings.json`, `.mcp.json` | Tools externas |
| Plugins | paquetes | Bundles skills+hooks+MCP |
| Settings | `.claude/settings.json` | Permisos, modelo, sandbox |
| Status line | settings | Coste/contexto en barra |
| Memory | `CLAUDE.md`, `.claude/rules/` | Reglas persistentes |
| Checkpointing | git | `/rewind` |

*(La tabla “Hot” del README lista Ultraplan, Web, Agent SDK, Auto Mode, Channels, Slack, Code Review, Chrome, Scheduled Tasks, Agent Teams, Worktrees, Ralph Wiggum, etc. — ver repo para beta flags.)*

---

## Apéndice C — Extracto `caveman` — instalación rápida

| Agent | Install |
|-------|---------|
| Claude Code | `claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman` |
| Cursor | `npx skills add JuliusBrussee/caveman -a cursor` |
| Gemini CLI | `gemini extensions install https://github.com/JuliusBrussee/caveman` |
| Otros | `npx skills add JuliusBrussee/caveman` o `-a <agent>` |

---

## Apéndice D — Extracto `claude-mem` — inicio y componentes

```bash
npx claude-mem install
npx claude-mem install --ide gemini-cli
# marketplace: /plugin marketplace add thedotmack/claude-mem
```

**Core (README):** (1) Lifecycle hooks (2) Worker HTTP :37777 + Bun (3) SQLite (4) mem-search skill (5) Chroma híbrido (6) MCP: search → timeline → get_observations.

---

## Apéndice E — Extracto `free-coding-models` — proveedores (muestra)

*Primeras filas del README; el archivo completo lista 25 proveedores.*

| # | Provider | Models (aprox) | Env var |
|---|----------|----------------|---------|
| 1 | NVIDIA NIM | 46 | NVIDIA_API_KEY |
| 2 | Groq | 8 | GROQ_API_KEY |
| 3 | Cerebras | 4 | CEREBRAS_API_KEY |
| 4 | Google AI Studio | 6 | GOOGLE_API_KEY |
| 5 | Cloudflare Workers AI | 15 | CLOUDFLARE_* |
| 6 | OpenRouter | 25 | OPENROUTER_API_KEY |
| 7 | DeepInfra | 4 | DEEPINFRA_API_KEY |
| 8 | Hugging Face | 2 | HUGGINGFACE_API_KEY |
| 9 | Perplexity | 4 | PERPLEXITY_API_KEY |
| 10 | SambaNova | 13 | SAMBANOVA_API_KEY |

---

## Apéndice F — Extracto `withoneai/knowledge`

**Why (README):** APIs documentadas dispersas; agentes alucinan auth/params; One Knowledge = conocimiento verificado, estructurado, “free forever” según el sitio.

**Quick start:**

```bash
npm install -g @withone/cli
one init
```

**API (header `x-one-secret`):**

| Endpoint | Descripción |
|----------|-------------|
| GET /open/knowledge/:platform | Overview |
| GET /open/knowledge/:platform/auth | Auth |
| GET /open/knowledge/:platform/actions | Lista acciones |
| GET /open/knowledge/:platform/actions/search?query= | Buscar |
| GET /open/knowledge/:platform/actions/:actionId | Detalle |

Base: `https://api.withone.ai`

---

## Apéndice G — Esquema `cheahjs/free-llm-api-resources`

**Secciones del README:** Free Providers → OpenRouter, Google AI Studio, NVIDIA NIM, Mistral La Plateforme, Mistral Codestral, HuggingFace Inference, Vercel AI Gateway, OpenCode Zen, Cerebras, Groq, Cohere, GitHub Models, Cloudflare Workers AI. Luego **Providers with trial credits:** Fireworks, Baseten, Nebius, Novita, AI21, Upstage, NLP Cloud, Alibaba Model Studio, Modal, Inference.net, Hyperbolic, SambaNova Cloud, Scaleway. Cada sección lista modelos y límites con links a docs del proveedor.

---

## Apéndice H — `antigravity-awesome-skills`: FAQ, bundles y troubleshooting (extracto)

*Del README oficial (Quick FAQ, Bundles & Workflows, Troubleshooting).*

**¿Qué es?** Biblioteca instalable de playbooks `SKILL.md` para Claude Code, Cursor, Codex CLI, Gemini CLI, Antigravity y afines, con instalador npm, bundles, workflows y documentación.

**¿Cómo instalo?** `npx antigravity-awesome-skills` y flags por host (`--claude`, `--cursor`, `--gemini`, `--codex`, `--antigravity`, `--kiro`, `--path`). Para **plugin-safe** vs volcar todo el filesystem: `docs/users/plugins.md`.

**Bundles:** grupos recomendados por rol (p. ej. `Web Wizard`, `Security Engineer`, `OSS Maintainer`). Son **guías de selección**, no paquetes npm separados. Combos citados en README: SaaS MVP = Essentials + Full-Stack Developer + QA & Testing; hardening = Security Developer + DevOps & Cloud + Observability & Monitoring; OSS = Essentials + OSS Maintainer.

**Workflows:** `docs/users/workflows.md` y `data/workflows.json` describen cadenas tipo MVP SaaS, auditorías de seguridad, sistemas de agentes, QA con browser, trabajo orientado a DDD.

**Troubleshooting:** `docs/users/usage.md` post-instalación; Windows → `docs/users/windows-truncation-recovery.md`; Antigravity/OpenCode con demasiados skills → `docs/users/agent-overload-recovery.md`; para `.agents/skills` preferir instalación filtrada (`--category`, `--risk`, `--tags`) en lugar del catálogo completo.

**Exploración adicional:** `CATALOG.md`, `skills_index.json`, app web y GitHub Pages (`sickn33.github.io/antigravity-awesome-skills/`), comparativas tipo `antigravity-awesome-skills-vs-awesome-claude-skills.md`.

---

## Apéndice I — `caveman`: benchmarks y matices (extracto README)

- **Objetivo:** misma sustancia técnica con **menos tokens de salida**; `caveman-compress` reduce texto en memorias que el modelo **relee** al iniciar (backup `*.original.md`).
- **Benchmarks del repo (orden de magnitud):** en la tabla publicada, ahorros por tarea van **~22%–87%**; el **promedio** reportado en esa tabla es **~65%** (salida).
- **Paper:** [arXiv:2604.00025](https://arxiv.org/abs/2604.00025) — la brevedad puede cambiar rankings de desempeño en ciertos evals.
- **No hace magia con:** “thinking/reasoning tokens” internos; el win principal es **salida** y, con compress, **lectura de CLAUDE.md**.

---

## Apéndice J — `claude-mem`: bullets del README (producto)

- Memoria persistente entre sesiones; **progressive disclosure** para costo de tokens visible.
- Skill **mem-search**; **MCP** con flujo `search` → `timeline` → `get_observations`.
- **Web UI** en `http://localhost:37777` y API de observaciones por id.
- Skill para Claude Desktop (según README).
- Tags para **excluir** contenido sensible del almacenamiento.
- **Beta:** Endless Mode y switch desde el viewer.
- **OpenClaw:** `curl -fsSL https://install.cmem.ai/openclaw.sh | bash` + guía `docs.claude-mem.ai/openclaw-integration`.
- **Requisitos:** Node 18+, Claude Code con plugins, Bun/uv autogestionados según docs, SQLite empaquetado.

---

## Apéndice K — `inmve/free-ai-coding`: TL;DR (extracto de tabla)

*Solo como snapshot; el README ordena por “generosidad” del free tier.*

| Tool | Modelos pro (ejemplos) | Free tier (idea) | Tarjeta |
|------|-------------------------|------------------|---------|
| Qwen Code | Qwen3-Coder-480B | miles de req/día | No |
| Rovo Dev CLI | Claude Sonnet 4 | millones tokens/día en beta | No |
| Gemini CLI | Gemini 3 / 2.5 | cientos de req/día según modelo | No |
| Cursor | Codex-Max tier | según política vigente en README | No |
| Kilo Code | Claude/Gemini/GPT | créditos iniciales | Sí |
| Warp | GPT-5, Claude, Gemini | créditos/mes | No |
| Trae | Claude, GPT, Gemini | fast/slow requests/mes | No |
| Amazon Q | Claude Sonnet 4 | pocas req agenticas/mes | Sí |
| Copilot | GPT-4.1, Claude, Gemini… | chat+completions/mes | No |
| Windsurf | multi | créditos/mes | Sí |
| Jules | Gemini 2.5 Pro | tareas/día | No |
| AWS Kiro | Claude | créditos/mes | No |

---

## Apéndice L — `cheahjs/free-llm-api-resources`: anotaciones por bloque (extracto)

- **OpenRouter:** límites tipo **20 rpm / 50 rpd** y **hasta ~1000 rpd** con recarga de créditos (ver doc enlazada en README); lista larga de modelos `:free`.
- **Google AI Studio:** tablas por modelo (Flash, Pro, Gemma…); nota sobre uso de datos fuera de ciertas regiones.
- **NVIDIA NIM:** verificación por teléfono; **40 rpm** en README; muchos modelos abiertos.
- **Mistral:** La Plateforme (límites altos en tokens/mes con condiciones) y **Codestral** gratuito con límites de RPM/día según README.
- **Groq / Cerebras:** tablas por modelo con RPD/TPM variables.
- **GitHub Models:** límites atados a tier Copilot; lista enorme de modelos frontier + open.
- **Cloudflare Workers AI:** **10k neurons/day**; decenas de modelos `@cf/...`.
- **Trial credits:** Fireworks ($1), Baseten ($30), Nebius, Novita, AI21, Upstage, NLP Cloud, Alibaba, Modal, Inference.net, Hyperbolic, SambaNova, Scaleway — cada uno con condiciones en el README.
- **Ética:** el README pide explícitamente **no abusar** de los tiers gratuitos.

---

## Apéndice M — `mnfst/awesome-free-llm-apis` vs `amardeeplakshkar/awesome-free-llm-apis`

- **mnfst:** lista compacta *permanent free* — separa APIs de quien entrena el modelo vs *inference hosts*; notas al pie (OpenAI SDK, regiones Gemini, Ollama Cloud no drop-in).
- **amardeeplakshkar:** formato “directorio” con **OpenAI compat**, **SDKs**, **speed tier**, snippet Python `OpenAI(base_url=...)`; incluye **Pollinations** (texto + imagen + video + audio + MCP).

---

## Apéndice N — Día tipo: cómo conviven las piezas

1. **Humano (Obsidian/nota):** 5 líneas con intención del día + enlaces a issues/ADRs.
2. **Arranque del agente:** lee `CLAUDE.md` + rules; **claude-mem** sugiere observaciones pasadas; activás **caveman** solo si querés salidas ultracortas.
3. **Codificación:** **Context7** para libs; **GitHub** para PR/issues; **Playwright** solo si hay UI que validar.
4. **Integración API nueva:** si son muchas SaaS, **One Knowledge** o MCP específico; si es solo una API, documentación oficial + skill puntual.
5. **Cierre:** resumen en nota humana + actualizar lista de “next”; opcional ping semanal con **free-coding-models** para revisar latencia/stability de tu modelo gratis.

---

## Apéndice O — README `antigravity-awesome-skills` (extracto largo, inglés)

*Texto tomado del README en `main` (abril 2026). Se conserva en inglés como en la fuente. Útil como “mini-manual” embebido. Fence de 4 backticks para permitir bloques ``` internos.*

````markdown
## Why This Repo

- **Installable, not just inspirational**: use `npx antigravity-awesome-skills` to put skills where your tool expects them.
- **Built for major agent workflows**: Claude Code, Cursor, Codex CLI, Gemini CLI, Antigravity, Kiro, OpenCode, Copilot, and more.
- **Broad coverage with real utility**: 1,404+ skills across development, testing, security, infrastructure, product, and marketing.
- **Faster onboarding**: bundles and workflows reduce the time from "I found this repo" to "I used my first skill".
- **Useful whether you want breadth or curation**: browse the full catalog, start with top bundles, or compare alternatives before installing.

## Installation

### Full library install

```bash
# Default: ~/.gemini/antigravity/skills (Antigravity global). Use --path for other locations.
npx antigravity-awesome-skills
```

The npm installer uses a shallow clone by default so first-run installs stay lighter than a full repository history checkout.

### Verify the install

```bash
test -d ~/.gemini/antigravity/skills && echo "Skills installed in ~/.gemini/antigravity/skills"
```

### Run your first skill

```text
Use @brainstorming to plan a SaaS MVP.
```

### Prefer plugins for Claude Code or Codex?

- Use the full library install when you want the broadest catalog and direct control over your installed skills directory.
- Use the plugin route when you want a marketplace-style, plugin-safe distribution for Claude Code or Codex.
- Read Plugins for Claude Code and Codex for the full breakdown of full-library install vs plugin install vs bundle plugins.

## Choose Your Tool

| Tool | Install | First Use |
| Claude Code | `npx antigravity-awesome-skills --claude` or Claude plugin marketplace | `>> /brainstorming help me plan a feature` |
| Cursor | `npx antigravity-awesome-skills --cursor` | `@brainstorming help me plan a feature` |
| Gemini CLI | `npx antigravity-awesome-skills --gemini` | `Use brainstorming to plan a feature` |
| Codex CLI | `npx antigravity-awesome-skills --codex` | `Use brainstorming to plan a feature` |
| Antigravity | `npx antigravity-awesome-skills --antigravity` | `Use @brainstorming to plan a feature` |
| Kiro CLI | `npx antigravity-awesome-skills --kiro` | `Use brainstorming to plan a feature` |
| Kiro IDE | `npx antigravity-awesome-skills --path ~/.kiro/skills` | `Use @brainstorming to plan a feature` |
| GitHub Copilot | _No installer — paste skills or rules manually_ | `Ask Copilot to use brainstorming to plan a feature` |
| OpenCode | `npx antigravity-awesome-skills --path .agents/skills --category development,backend --risk safe,none` | `opencode run @brainstorming help me plan a feature` |
| AdaL CLI | `npx antigravity-awesome-skills --path .adal/skills` | `Use brainstorming to plan a feature` |
| Custom path | `npx antigravity-awesome-skills --path ./my-skills` | Depends on your tool |

## Quick FAQ (abridged)

### What is Antigravity Awesome Skills?

Installable library of reusable `SKILL.md` playbooks … installer CLI, bundles, workflows, generated catalogs, and docs.

### How do I install it?

`npx antigravity-awesome-skills` or flags `--codex`, `--cursor`, `--gemini`, `--claude`, `--antigravity`.

### Where do I browse bundles, workflows, and the full catalog?

Bundles, Workflows, CATALOG.md, GitHub Pages hosted catalog.

## Best Skills By Tool (pointers)

- Claude Code skills, Cursor skills, Codex CLI skills, Gemini CLI skills, AI agent skills guide (paths in repo docs/users/).

### Universal starter skills

- `@brainstorming` … `@test-driven-development` … `@debugging-strategies` … `@lint-and-validate` … `@security-auditor` … `@frontend-design` … `@api-design-principles` … `@create-pr`

### Real prompt examples

```text
Use @brainstorming to turn this product idea into a concrete MVP plan.
```

```text
Use @security-auditor to review this API endpoint for auth and validation risks.
```

## Bundles & Workflows

Bundles are curated groups … `Web Wizard`, `Security Engineer`, `OSS Maintainer`.

Good starter combinations:
- SaaS MVP: `Essentials` + `Full-Stack Developer` + `QA & Testing`
- Production hardening: `Security Developer` + `DevOps & Cloud` + `Observability & Monitoring`
- OSS shipping: `Essentials` + `OSS Maintainer`

Workflows: docs/users/workflows.md + data/workflows.json — SaaS MVP, security audits, agent systems, QA/browser, DDD-oriented design.

### Need fewer active skills at runtime?

If Antigravity hits context limits, see docs/users/agent-overload-recovery.md.

For OpenCode prefer reduced install: `--risk`, `--category`, `--tags`.

## Browse 1,404+ Skills — repository contents

- skills/, CATALOG.md, skills_index.json, data/, apps/web-app, GitHub Pages, bundles, workflows, docs/

### Compare alternatives

- Antigravity Awesome Skills vs Awesome Claude Skills
- Best Claude Code skills on GitHub
- Best Cursor skills on GitHub

## Troubleshooting

- Usage Guide docs/users/usage.md
- Windows: docs/users/windows-truncation-recovery.md
- Linux/macOS overload: docs/users/agent-overload-recovery.md
- OpenCode reduced install example with --path .agents/skills --category development,backend --risk safe,none
- Plugins: docs/users/plugins.md
- CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md

## Contributing (rules)

- Add skills under skills/.../SKILL.md
- npm run validate before PR
- Community PRs: do not commit generated CATALOG.md, skills_index.json, data/*.json
- skill-review bot + manual review for risky guidance
````

---

## Apéndice P — `shanraisshan/claude-code-best-practice`: tabla “Hot” (extracto)

*Filas relevantes para tu scaffolding; descripciones condensadas del README.*

| Feature | Trigger / ubicación | Qué aporta |
|---------|---------------------|------------|
| Power-ups | `/powerup` | Tutoriales interactivos de features |
| Ultraplan | `/ultraplan` | Planes en cloud con revisión en browser |
| Claude Code Web | `claude.ai/code` | Tareas largas, PR fix, paralelo |
| Agent SDK | npm/pip | Claude Code como librería |
| No Flicker Mode | `CLAUDE_CODE_NO_FLICKER=1` | UI terminal estable |
| Computer Use | MCP computer-use | Control de pantalla (macOS) |
| Auto Mode | `--enable-auto-mode` | Menos prompts de permisos |
| Channels | `--channels` | Telegram/Discord/webhooks → sesión |
| Slack | `@Claude` | Tareas desde Slack |
| Code Review | GitHub App | Multi-agent PR review |
| GitHub Actions | workflows | CI agentico |
| Chrome | `--chrome` | Automación browser |
| Scheduled Tasks | `/loop`, `/schedule` | Tareas recurrentes local/cloud |
| Voice | `/voice` | Dictado |
| Simplify & Batch | `/simplify`, `/batch` | Skills bundled |
| Agent Teams | env | Paralelo en mismo repo |
| Remote Control | `/remote-control` | Sesión desde otro dispositivo |
| Git Worktrees | built-in | Ramas aisladas por agente |
| Ralph Wiggum | plugin | Loop autónomo largo |

---

## Apéndice Q — Escenarios de implementación conjunta (en español)

**Escenario A — Solo Cursor/Antigravity (sin Claude Code aún)**  
Instalás subset de skills con `npx antigravity-awesome-skills --cursor` o ruta de Antigravity. MCP vía configuración del IDE si está disponible. Memoria: **Obsidian** + `CLAUDE.md` en repo (cuando exista). Sin claude-mem hasta usar host compatible.

**Escenario B — Claude Code como hub**  
`CLAUDE.md` + `.claude/rules` + 3 MCP (GitHub, Context7, +1 específico). Plugin **claude-mem**. Skills: bundle “Essentials” del catálogo, no todo. **caveman** en sesiones de debugging o cuando el costo de salida moleste.

**Escenario C — Presupuesto casi cero**  
`free-coding-models` elige proveedor; **cheahjs** valida límites. OpenRouter free + Google AI Studio + Groq suele alcanzar para tareas medianas. Reservás **$10–20/mes** solo si te bloqueás por RPD.

**Escenario D — Muchas integraciones SaaS**  
**One Knowledge** (`one init`) + MCP puntuales (Stripe, Slack…) en vez de inventar cada OAuth a mano en prompts.

**Escenario E — Asistente 24/7**  
OpenClaw en VPS (video Pelado Nerd) + modelo barato (Gemini free u OpenRouter) + **claude-mem** opcional en gateway. Aislar secretos y superficie (no en la laptop principal si podés evitarlo).

**Escenario F — Orquestación heavy**  
Solo si A–E ya quedaron cortos: evaluar **RuFlo**; de lo contrario **subagents + MCP + workflows** del repo shanraisshan suelen bastar.

---

## Apéndice R — Recursos de tu otra conversación (cola “fase diseño / proyectos”)

*No forman parte del motor mínimo; guardalos en el vault cuando toque.*

| Recurso | Por qué queda en cola |
|---------|------------------------|
| basementstudio/basement-laboratory | Lab creativo / inspiración |
| JCodesMore/ai-website-cloner-template | Proyecto clonado, no scaffolding |
| unicorn.studio | WebGL no-code |
| animations.dev, awwwards, aceternity, stitch, pomelli | UI / referencia visual |
| getdesign.md | DESIGN.md de marcas |
| outreach blog, motionsites.ai | Marketing / motion promo |
| projectnomad.us | Stack offline/hardware distinto |
| geo-seo-claude, ascii-studio, vansh-nagar/* | Verticales específicos |
| Google Doc carousel IG | Contenido, no dev environment |
| Lista larga de tuits X | Archivar como notas si aportan setup |

---

## Apéndice S — Checklist de “conexión al second brain” (sin código aún)

1. **Inventario:** cada URL guardada → una nota con “qué es / cuándo usar / depende de qué”.  
2. **Duplicados:** si dos listas cubren APIs gratis, elegí **una primaria** (p. ej. cheahjs para detalle, mnfst para permanente).  
3. **Política de contexto:** qué va a Obsidian vs qué va a `CLAUDE.md` vs qué va a memoria automática.  
4. **MCP budget:** máximo N servidores activos; revisión mensual.  
5. **Skills budget:** un bundle o `--category`; expansión solo con necesidad medible.  
6. **Cost review:** semanal: qué modelo usaste y si free tier alcanzó.  
7. **Seguridad:** API keys fuera del repo; `.env` local sin commitear.  
8. **Licencias:** AGPL (claude-mem) si algún día servís modificado en red.  
9. **Exit criteria 30 días:** definilo en `objetivo-workspace-personal.md` y tick boxes en notas.

---

## Apéndice T — `antigravity-awesome-skills`: “Official Sources” (primeras entradas del README)

*Lista parcial del ledger de créditos — ver `docs/sources/sources.md` en el repo para el archivo completo.*

1. anthropics/skills — document manipulation, brand, comms  
2. anthropics/claude-cookbooks  
3. remotion-dev/skills — video/React  
4. vercel-labs/agent-skills — React + web design guidelines  
5. openai/skills — Codex catalog  
6. supabase/agent-skills — Postgres  
7. microsoft/skills — Azure / enterprise  
8. google-gemini/gemini-skills  
9. apify/agent-skills — scraping  
10. expo/skills  
11. huggingface/skills  
12. neondatabase/agent-skills  
13. scopeblind/scopeblind-gateway — MCP governance / Cedar policies  

*(Siguen decenas de entradas “Community Contributors” en el mismo README: manage-skills, global-chat, styleseed, guardian prompts, technical-change-skill, antigravity-skills enterprise, etc.)*

---

## Apéndice U — `cheahjs/free-llm-api-resources`: modelos OpenRouter con sufijo `:free` (muestra)

*Lista parcial tal como aparece en el README del repo; sirve para ver el “shape” del catálogo free. Los límites agregados están en la sección OpenRouter del mismo archivo.*

- google/gemma-3-12b-it:free  
- google/gemma-3-27b-it:free  
- google/gemma-3-4b-it:free  
- nousresearch/hermes-3-llama-3.1-405b:free  
- meta-llama/llama-3.2-3b-instruct:free  
- meta-llama/llama-3.3-70b-instruct:free  
- mistralai/mistral-small-3.1-24b-instruct:free  
- arcee-ai/trinity-large-preview:free  
- arcee-ai/trinity-mini:free  
- cognitivecomputations/dolphin-mistral-24b-venice-edition:free  
- google/gemma-3n-e2b-it:free  
- google/gemma-3n-e4b-it:free  
- liquid/lfm-2.5-1.2b-instruct:free  
- liquid/lfm-2.5-1.2b-thinking:free  
- nvidia/nemotron-3-nano-30b-a3b:free  
- nvidia/nemotron-nano-12b-v2-vl:free  
- nvidia/nemotron-nano-9b-v2:free  
- openai/gpt-oss-120b:free  
- openai/gpt-oss-20b:free  
- qwen/qwen3-4b:free  
- qwen/qwen3-coder:free  
- qwen/qwen3-next-80b-a3b-instruct:free  
- stepfun/step-3.5-flash:free  
- z-ai/glm-4.5-air:free  

*(El README completo incluye decenas de entradas más en otras secciones: Google AI Studio, Groq por modelo, GitHub Models, Cloudflare Workers AI, etc.)*

---

## Apéndice V — Documentación Mintlify “Claude Code — how it works” (puntero)

*No se incrusta el cuerpo completo (sitio dinámico); el enlace que guardaste sirve como lectura oficial paralela a `shanraisshan/claude-code-best-practice`:*

- [Mintlify — Claude Code concepts / how it works](https://www.mintlify.com/VineeTagarwaL-code/claude-code/concepts/how-it-works) *(URL tal cual en tu conversación; si el doc migra, buscá en docs.anthropic.com / code.claude.com).*

**Cómo usarlo con este repo:** leé Mintlify/code.claude.com para **semántica** (“qué es el loop agentico”), y usá **shanraisshan** + este informe para **patrones de archivos** (commands, skills, MCP) y **recetas**.

---

## Fuentes

READMEs y sitios oficiales (abr 2026); hilo MCP provisto por vos; YouTube/metadata; x.com no fiable para extracción automática; extractos literales o parafraseados en Apéndices A–V (O: README sickn33; U: lista OpenRouter tomada de cheahjs).
