# Objetivo: espacio de trabajo personal + second brain + agentes (contexto vivo)

Este archivo captura **tu intención** para este repo y lo que conversaste (con otro chat y acá), **sin implementar código todavía**. Sirve como “constitución” para que futuras decisiones (skills, MCP, Obsidian, presupuesto) no se desvíen.

**Documentos hermanos:**

- [`informe-recursos-ai-agentes.md`](./informe-recursos-ai-agentes.md) — inventario técnico, **Apéndices A–V** (README embebido de antigravity-awesome-skills, tablas MCP, escenarios de uso conjunto, cola “fase diseño”, lista muestra OpenRouter `:free`, puntero Mintlify), APIs gratis y **cómo encajar piezas**. **Techo ~1000 líneas** (ver `wc -l` en el archivo).
- [`registro-ideas-workspace.md`](./registro-ideas-workspace.md) — captura ampliada de ideas, intuiciones, restricciones y frases casi textuales de las conversaciones para no perder contexto fino.
- [`plan-scaffolding-workspace-system.md`](./plan-scaffolding-workspace-system.md) — plan operativo detallado para el próximo LLM implementador, con fases, criterios de auditoría e invocaciones explícitas a las skills verificadas.
- [`decisiones-arquitectonicas-v1.md`](./decisiones-arquitectonicas-v1.md) — decisiones cerradas de alto impacto (authority model, sensibilidad, event model, dashboard projections, free-first routing, host strategy).

---

## 1. Problema que querés resolver

- Tenés **muchos recursos** (repos, listas, herramientas, ideas de proyectos) y **perdés ritmo**: es difícil **recordar qué es cada cosa**, **cómo se relacionan**, y **por dónde empezar**.
- Querés **construir** proyectos personales y flujos modernos con IA, pero el **primer proyecto** en realidad es **el propio entorno**: un lugar donde **acumular contexto de forma ordenada** y que los agentes (Claude Code, Cursor, Antigravity, terminal, etc.) **entiendan quién sos, qué estás haciendo y qué reglas valen**.
- Te interesa explícitamente el concepto de **second brain** (Obsidian o equivalente markdown/Git), **registro de tareas/proyectos**, y a futuro **visibilidad** (dashboard de estado de agentes, colas, memorias) — pero **después** del scaffolding sólido.

---

## 2. Restricciones y realidad (lo que ya definiste)

| Tema | Tu respuesta |
|------|----------------|
| **Background** | Podés hacer “de todo”; el foco ahora es **mejorar flujos con IA**, no una sola tecnología. |
| **Presupuesto** | Preferís **casi $0** al inicio; podés gastar algo **mínimo (~USD 10–20/mes)** si compensa. |
| **Entorno actual** | GitHub + IDEs (**Cursor**, **Antigravity**). Querés sumar **agentes por terminal** (p. ej. Claude Code) cuando tenga sentido según los recursos. |
| **PKM previo** | **Nada todavía** — hay que elegir un sistema simple y sostenible. |
| **Orden de trabajo** | Primero **entender y ordenar recursos**; luego **materializar** el repo-espacio de trabajo. |

---

## 3. Visión del “repo motor” (qué debería ser)

Un **repositorio (o monorepo ligero)** que funcione como **sistema operativo personal de trabajo**:

1. **Capa humana (second brain)**  
   Notas en Markdown (idealmente **Obsidian** apuntando a la misma carpeta, o solo Git + editor). Ahí van: resúmenes de recursos, decisiones, “por qué elegimos X”, lista de proyectos, logs cortos.

2. **Capa agente (contexto inyectable)**  
   Archivos que los agentes leen al arrancar: en Claude Code típicamente **`CLAUDE.md`**, rules, skills, `.mcp.json` / settings. Objetivo: **pocas fuentes de verdad**, bien enlazadas, sin duplicar novelas.

3. **Capa herramientas (MCP + skills + plugins)**  
   Conectar **solo** lo que usás: GitHub, Context7, búsqueda, DB si aplica. El hilo de @zodchiii insiste en **3–5 MCP** para no quemar contexto.

4. **Capa memoria automática (opcional pero alineada con tu dolor)**  
   **claude-mem** u otra estrategia para **no perder el hilo** entre sesiones; debe respetar privacidad y costo.

5. **Capa orquestación avanzada (opcional, más tarde)**  
   **RuFlo** u otros solo si el problema ya es **multi-agente a escala**; no es prerequisito del MVP del espacio de trabajo.

6. **Capa “asistente 24/7” (opcional)**  
   **OpenClaw** si querés canales (Telegram, etc.) y tareas programadas; encaja con API barata (Gemini free tier, etc.) según el video/guía que guardaste.

---

## 3.1 Visión ampliada (nueva capa de producto)

La visión ya no es solo “tener notas y contexto”, sino construir un **motor operativo personal** que:

- te muestre **cada mañana** en qué quedó cada proyecto, qué fue lo último que pasó y cuáles eran los próximos pasos;
- integre **LLMs free o baratos** para maximizar output con el **menor costo computacional y monetario** posible;
- reduzca drásticamente la cantidad de herramientas que tenés que abrir y coordinar manualmente;
- pueda **orquestar herramientas** por vos según el tipo de tarea;
- detecte o registre automáticamente **repos nuevos**, investigaciones, ideas y recursos relevantes;
- conecte información de **múltiples repositorios** sin mezclar contextos que no deberían mezclarse;
- te deje construir, con el tiempo, una **capa de producto distribuible** basada en esta infraestructura.

En otras palabras: este repo no es solo un vault ni un dashboard, sino la semilla de un **sistema de trabajo continuo**, con memoria, grafo, automatización, costo controlado y potencial de convertirse en producto.

---

## 4. Alcance por fases (acordado con vos)

### Fase A — Scaffolding (ahora)

**Meta:** “Mega motor de trabajo” **sin** meterte aún en diseño visual fino.

Incluye:

- Elegir **qué host principal** usás para agentes de código (Cursor / Antigravity / Claude Code) y documentar **un flujo mínimo** por cada uno que quieras mantener.
- Definir **estructura de carpetas** del repo: `docs/`, `brain/` o `notes/`, `playbooks/`, `.claude/` o equivalente cuando toque implementar.
- Curar **lista corta** de repos/recursos que sí entran al motor (ver sección 6).
- Reglas de **gobernanza de contexto**: qué va en notas humanas vs qué va en `CLAUDE.md`, cómo nombrar proyectos, cómo archivar links muertos.

**Fuera de Fase A (explícitamente postergado):**

- Bibliotecas UI (Aceternity, Awwwards como inspiración, Stitch, Pomelli, Unicorn Studio, basement-laboratory como moodboard).
- Plantillas “clonar web” salvo que el proyecto **sea** scraping/clonado.
- Contenido marketing (Outreach blog) salvo que el proyecto **sea** growth.

### Fase B — Second brain operativo

- Obsidian vault **en** el repo o en submódulo/carpeta sincronizada.
- Plantillas de nota: `resource`, `project`, `decision`, `session-log`.
- Enlace bidireccional entre notas y **issues**/milestones si usás GitHub Projects.

### Fase C — Visualización y “observabilidad” del agente

- Dashboard liviano (web local o estático) con: últimas sesiones, MCP activos, costos si hay API, estado de memorias — **después** de que el flujo de datos exista.
- Subvistas o capas de grafo: una capa centrada en **vos / objetivos / proyectos**, otra en **relaciones técnicas entre repos**, y otras futuras para áreas específicas (finanzas, aprendizaje, salud, etc.).

### Fase D — Diseño y motion (cuando el motor ya corre)

- **animations.dev**, skill de Emil Kowalski, **Impeccable**, getdesign.md, herramientas Google de UI, etc.

---

## 5. Recursos de la otra conversación — clasificación

### 5.1 Encajan en Fase A (scaffolding / motor)

| Recurso | Por qué |
|---------|---------|
| [antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | Catálogo instalable de skills multi-herramienta. |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Mapa de Claude Code: MCP, hooks, memory, plugins. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | Memoria entre sesiones; encaja con “no pierdo contexto”. |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Menos tokens en salida/memorias (ahorro + foco). |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | Solo si explícitamente querés orquestación masiva; **no** día 1. |
| Listas APIs gratis + [free-coding-models](https://github.com/vava-nessa/free-coding-models) | Elegir modelo **barato** para tareas simples dentro de tu presupuesto. |
| Hilo MCP @zodchiii (archivado en informe) | Integraciones concretas (GitHub, Context7, etc.). |
| [withoneai/knowledge](https://github.com/withoneai/knowledge) | Base de conocimiento de APIs para agentes (complementa MCP cuando integrás muchas APIs). |
| [obsidian.md](https://obsidian.md/) | Second brain local-first. |
| OpenClaw + video Pelado Nerd | Opcional: asistente 24/7 y canales; **después** del núcleo. |
| [dgreenheck/webgpu-claude-skill](https://github.com/dgreenheck/webgpu-claude-skill) | Solo si un proyecto **es** WebGPU/Three; no parte del motor genérico. |
| [claude.com/partners](https://claude.com/partners) | Referencia de ecosistema; no bloquea nada. |
| Mintlify doc “how it works” (Claude Code) | Conceptos; bookmark, no repo. |

### 5.2 Fase D o inspiración (diseño / marketing / contenido)

| Recurso | Nota |
|---------|------|
| [animations.dev](https://animations.dev/), [emilkowal.ski/skill](https://emilkowal.ski/skill), [impeccable.style](https://impeccable.style/), [getdesign.md](https://getdesign.md/) | Diseño y motion para cuando el scaffolding esté. |
| [ui.aceternity.com](https://ui.aceternity.com/), [stitch.withgoogle.com](https://stitch.withgoogle.com/), Pomelli, Unicorn Studio | UI / experimentación visual. |
| [basementstudio/basement-laboratory](https://github.com/basementstudio/basement-laboratory) | Lab creativo; inspiración, no núcleo del motor. |
| [JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template) | Proyecto concreto de clonado; no scaffolding. |
| [awwwards.com/.../sites_of_the_month](https://www.awwwards.com/websites/sites_of_the_month/) | Referencia visual. |
| [projectnomad.us](https://www.projectnomad.us/) | Hardware/offline stack distinto; solo si ese es el proyecto. |
| [outreach.io/.../customer-retention](https://www.outreach.io/resources/blog/customer-retention-strategies) | Marketing B2B; fuera del motor dev. |
| [motionsites.ai](https://motionsites.ai/) | Motion marketing; fase D. |
| Google Doc (carousel Instagram) | Contenido/creative ops; no motor dev. |
| [zubair-trabzada/geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude) | Vertical SEO; proyecto aparte. |
| Tweets X (varios) | Ideas sueltas; **no** dependencia del plan hasta archivarlos en `docs/`. |

---

## 6. Duplicación y solapes (para no volverte loco)

Conceptos que **se pisan** pero **no son lo mismo**:

| Tema | Piezas | Cómo pensarlo |
|------|--------|----------------|
| **“Skills”** | Antigravity catalog, Impeccable, Emil, WebGPU skill | Skills = **conocimiento/procedimiento**. Podés tener **pocas** activas; el catálogo es biblioteca, no “instalar todo”. |
| **Memoria** | `CLAUDE.md`, claude-mem, Memory MCP, Obsidian | Obsidian = **humano**; `CLAUDE.md` = **instrucciones agente**; claude-mem = **hechos de sesión** comprimidos; no mezclar los tres en un solo archivo gigante. |
| **Orquestación** | RuFlo vs workflows del repo shanraisshan vs MCP | RuFlo = plataforma pesada; mucha gente alcanza con **MCP + subagents + commands**. |
| **API knowledge** | Context7 (docs libs) vs One Knowledge (APIs productos) | Context7 = **Next/React/etc.**; One Knowledge = **Stripe, Slack, …** vía dataset + CLI. |
| **Costo** | free-coding-models vs listas cheahjs/mnfst | Primero **elige herramienta/host**; después **asigná modelo barato** a tareas aburridas y caro a razonamiento. |

---

## 7. Principios de implementación (cuando toquemos código)

- **Una fuente de verdad** por tipo de dato (decisiones en notas; comandos en repo; secretos fuera del repo).
- **Pocos MCP**, bien justificados; revisar trimestralmente si siguen usándose.
- **Skills acotadas**: bundles del catálogo o subset filtrado (`--category`, `--risk`) para no saturar contexto.
- **Presupuesto**: empezar en **free tier**; usar tu cupo **10–20/mo** para **un** proveedor que desbloquee el cuello (p. ej. más RPD en OpenRouter o API clave).
- **Seguridad**: todo lo que ejecute código o tenga OAuth (MCP, OpenClaw) va con **superficie mínima** y cuentas dedicadas cuando sea posible.
- **No perder conversaciones**: toda intuición importante debe caer en Markdown estructurado; no dejar definiciones críticas “muertas” en chats web.
- **Contexto por capas**: hay contexto global tuyo, contexto por proyecto, y contexto restringido para repos ajenos (por ejemplo trabajo/empresa).
- **Automatización con límites**: priorizar auto-detección e ingestión automática, pero con filtros, sanity checks y capacidad de revertir o archivar ruido.
- **Observabilidad del contexto**: el sistema debe poder avisar cuando el contexto global, el de un proyecto o el de un agente se esté volviendo demasiado grande, borroso o costoso.

---

## 8. Respuestas clave ya dadas (y por qué importan)

### 8.1 Por qué pregunté si querías incluir temas sensibles (salud, finanzas, decisiones laborales)

Esa pregunta importa porque **cambia toda la arquitectura**:

- Si el sistema va a incluir **gastos, inversiones, salud o decisiones delicadas**, ya no alcanza con pensar “notas lindas + IA”.
- Hay que separar:
  - qué puede vivir en **Markdown versionado**;
  - qué debe vivir en **secciones privadas o repos no públicos**;
  - qué cosas puede leer un **LLM cloud** y cuáles deberían quedar **solo localmente**;
  - qué contexto puede viajar a un repo de trabajo y cuál **jamás** debería cruzarse.

Complicaciones concretas:

- **Privacidad:** un resumen inocente puede filtrar información sensible si se lo inyecta a un agente en el repo equivocado.
- **Retención externa:** algunos proveedores gratis o baratos pueden usar datos para mejora del servicio o tener retención que no te convenga.
- **Licencias / compliance / trabajo:** si consultás desde un repo de empresa, mezclar “vida personal + otros proyectos” puede ser directamente incorrecto.
- **Costo de contexto:** cuanto más amplio el grafo de tu vida, más importante es no inyectarlo entero; hay que hacer capas, resúmenes y filtros.

Conclusión: **sí podés aspirar** a que el sistema incluya todo eso, pero desde el inicio hay que diseñar **fronteras** entre:

1. contexto global tuyo;
2. contexto por área sensible;
3. contexto público o compartible;
4. contexto estrictamente laboral/externo.

### 8.2 Decisión arquitectónica preliminar sobre el vault

Con lo que dijiste hasta ahora, la mejor hipótesis inicial es:

- que exista un **vault/versionado muy cerca de este repo**,
- que este repo sea el **núcleo del sistema**,
- pero que el contenido tenga una estructura preparada para **separar niveles de sensibilidad** si más adelante hace falta.

Eso significa:

- este repo puede ser el **hub**;
- pero no deberíamos asumir desde ya que **todo** va a convivir plano y mezclado dentro del mismo árbol sin restricciones.

### 8.3 Tu preferencia actual sobre versionado

Quedó explícito que querés **versionar el vault**, por seguridad, historia, rollback y control de daños si “se inyecta algo que no corresponde”.

También quedó explícito que:

- querés **sanity checks** constantes;
- querés poder **ordenar, resumir o eliminar** lo que deje de tener sentido;
- te preocupa que un exceso de información haga que el sistema “pierda la idea”.

Esto es correcto y pasa siempre en PKM/agent memory: no solo hay que **agregar**, también hay que **podar**.

---

## 9. Nuevas decisiones e intuiciones capturadas

### 9.1 Experiencia diaria deseada

- Levantarte y tener un **estado matinal** de proyectos:
  - qué fue lo último que se hizo;
  - en qué quedó;
  - cuáles eran los próximos pasos;
  - qué bloqueos o decisiones quedaron abiertas.

### 9.2 Objetivo de costo y orquestación

- Integrar **LLMs free** es una prioridad central.
- El sistema debería ayudarte a elegir **qué modelo o herramienta usar** según:
  - costo,
  - calidad,
  - límite de rate,
  - sensibilidad del contexto,
  - tipo de tarea.

### 9.3 Ambición de producto

- Si el sistema funciona bien para vos, existe interés real en **convertirlo en producto** a futuro.
- Eso obliga a pensar el MVP no como un hack descartable, sino como una base que ya enseñe:
  - arquitectura modular,
  - capas de contexto,
  - portabilidad,
  - políticas de seguridad,
  - observabilidad.

### 9.4 Descubrimiento automático de recursos y repos

- Querés que el sistema pueda:
  - recibir un repo nuevo “inyectado” manual o automáticamente;
  - analizarlo;
  - relacionarlo con tus objetivos y proyectos;
  - decidir si merece quedar incorporado al sistema;
  - eventualmente **scrapear o monitorear** repos relevantes de la semana y evaluarlos contra tu contexto.

### 9.5 Shared context con límites

- Te interesa tener **contexto compartido**, pero entendés perfectamente que **no todo puede viajar a todos los repos**.
- Caso explícito: repo de empresa/trabajo donde **no corresponde** inyectar contexto de tu vida personal o de otros proyectos.

### 9.6 Dashboard y grafos por capas

- Obsidian te interesa, pero no querés quedarte limitado a su vista.
- Te interesa un **dashboard web** con vistas filtrables:
  - grafo central de vos + objetivos + proyectos;
  - grafo técnico de relaciones entre proyectos/repos;
  - capas o filtros por dominio;
  - navegación hacia un proyecto específico para ver todo lo relacionado.

### 9.7 Cambio de paradigma personal

- Hoy usás mucho LLM en webs o chats aislados y el conocimiento “muere” ahí.
- Querés que **cada interacción útil** se convierta en parte del contexto persistente del sistema.
- Esto no es una mejora incremental: es un **cambio de paradigma** en tu forma de trabajar.

---

## 10. Próximos pasos sugeridos (sin código aún)

1. **Congelar** la lista “Fase A” de la sección 5.1 (ya está).
2. Leer en `informe-recursos-ai-agentes.md` la sección **“Motor de trabajo integrado”** y decidir: **un** host principal para la primera semana de práctica.
3. Escribir (a mano) **10 líneas** en una nota: “Qué es éxito para mí en 30 días” (ej. “tengo vault + CLAUDE.md + 3 MCP + 5 proyectos catalogados”).
4. Cuando des el OK para código: crear estructura mínima de carpetas + un solo `CLAUDE.md` maestro que **enlace** a `docs/objetivo-workspace-personal.md` y al informe.

### 10.1 Próximas decisiones arquitectónicas que siguen abiertas

- ¿El vault sensible vive **dentro** de este repo, en **subcarpetas separadas**, o en un repo/carpeta hermana con puentes controlados?
- ¿Cuál será el **host principal** del sistema en la práctica inicial: Claude Code, Antigravity o un híbrido transitorio?
- ¿La capa “siempre corriendo” del MVP será:
  - solo markdown + scripts + Obsidian;
  - un proceso local;
  - o algo híbrido con componente web/local?
- ¿Cómo se define el **límite de inyección de contexto** por repo para evitar fugas y costo excesivo?

---

## 11. Preguntas abiertas (para refinar después)

- ¿Querés que **Obsidian** viva **dentro** del mismo repo Git o en carpeta hermana sincronizada?
- ¿Claude Code va a ser **obligatorio** en tu flujo o Cursor/Antigravity bastan los primeros meses?
- ¿Necesitás **OpenClaw** pronto o es “nice to have” tras el vault?
- ¿Algún requisito de **privacidad** (todo local vs APIs cloud) que limite claude-mem u OpenClaw?

---

*Última actualización del documento: alineado con tu conversación extendida de abril 2026 sobre second brain, dashboards, multi-repo, LLMs free y producto futuro.*
