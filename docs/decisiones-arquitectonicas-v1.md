# Decisiones arquitectónicas v1

Este documento congela las primeras decisiones arquitectónicas de alto impacto para el sistema de workspace personal.  
Objetivo: evitar que el siguiente LLM implementador vuelva a abrir debates base y reducir riesgo de cambios caros más adelante.

Estas decisiones se toman con foco en:

- second brain + contexto persistente;
- múltiples repos y fuentes de información;
- límites entre contexto personal / proyecto / externo;
- dashboard futuro;
- costo mínimo con LLMs free / baratos;
- evolución futura a producto.

---

## Decisión 1 — Sí a múltiples fuentes derivadas desde el día 1

### Decisión

El sistema **sí** va a trabajar con **múltiples fuentes derivadas** desde el comienzo.

### Qué significa

No va a existir una sola representación “final” del estado. En cambio, habrá:

1. **Fuentes canónicas primarias**  
   Markdown, registries, logs, metadata de repos, archivos de configuración, etc.

2. **Proyecciones derivadas**  
   Briefings, índices de búsqueda, vistas de dashboard, grafo, resúmenes de contexto, snapshots.

### Por qué esta es la mejor decisión

- Encaja con tu visión de sistema vivo, no solo vault pasivo.
- Permite morning briefing, grafo, tracking multi-repo y recomendaciones sin deformar los documentos base.
- Escala mejor hacia producto: podés cambiar una proyección sin romper la base.
- Hace posible operar con varios hosts/LLMs sin casar todo con una sola capa.

### Riesgo principal

Si no se define bien qué es fuente primaria y qué es derivado, el sistema termina con múltiples “verdades”.

### Regla resultante

**Múltiples fuentes derivadas: sí. Múltiples fuentes canónicas conflictivas: no.**

---

## Decisión 2 — El authority model será “workspace-hub-first”

### Decisión

La autoridad principal del sistema será el **workspace hub** (este repo y su capa de registries/eventos), no GitHub solo, ni filesystem solo.

### Modelo exacto

- **Workspace hub:** autoridad canónica del sistema de conocimiento y orquestación.
- **GitHub:** fuente externa de verdad para estado remoto de repos, PRs, issues, metadata.
- **Filesystem:** fuente externa de verdad para presencia local de repos, archivos y actividad local.

### Por qué esta es la mejor decisión

Si elegís GitHub-first:

- perdés repos locales, experimentales, no publicados o privados fuera del flujo;
- todo queda demasiado atado a GitHub como plataforma.

Si elegís filesystem-first:

- no tenés buena visión remota, PRs, issues, forks, stars, workflows;
- cuesta convertirlo a producto o coordinar con nube.

Si elegís workspace-hub-first:

- podés registrar un proyecto aunque todavía no exista en GitHub;
- podés importar desde GitHub o desde disco;
- podés modelar repos “externos” o “observados” sin poseerlos;
- el sistema sigue siendo tu centro de verdad conceptual.

### Regla resultante

Todo repo/proyecto/recurso relevante debe tener una identidad registrada en el workspace hub.  
GitHub y filesystem alimentan esa identidad; no la reemplazan.

---

## Decisión 3 — El manejo de sensibilidad será híbrido por diseño

### Decisión

La arquitectura inicial será **híbrida**, no totalmente “todo dentro del repo”.

### Modelo exacto

1. **En este repo**
   - contexto operativo;
   - documentación arquitectónica;
   - notas de proyectos;
   - recursos;
   - decisiones;
   - registries;
   - proyecciones seguras y compartibles.

2. **En una capa separada futura o desde el inicio si hace falta**
   - salud;
   - finanzas;
   - inversiones;
   - decisiones laborales delicadas;
   - información que no puede viajar a repos externos.

### Por qué esta es la mejor decisión

Porque tu visión explícitamente incluye futuro contenido sensible y también repos de empresa/trabajo.  
Si mezclamos todo desde el día 1 dentro del mismo árbol sin fronteras, el costo de separar después será mucho mayor.

### Regla resultante

El sistema debe asumir desde hoy que existe más de un nivel de sensibilidad:

- `global-safe`
- `project-safe`
- `restricted-personal`
- `restricted-employer`
- `highly-sensitive`

Y ningún mecanismo de inyección puede tratar esos niveles como equivalentes.

---

## Decisión 4 — El dashboard leerá proyecciones derivadas, no markdown crudo

### Decisión

El dashboard futuro **no** debe leer directamente todo el Markdown crudo como fuente primaria de UI.

### Modelo exacto

El dashboard debe consumir una capa derivada como:

- `system/indexes/`
- `system/briefings/`
- `data/graph/`
- `data/projects/`
- `data/events/`

Estas proyecciones se generan a partir de:

- notas;
- registries;
- eventos;
- metadata local/remota;
- resúmenes.

### Por qué esta es la mejor decisión

Si la UI lee Markdown crudo:

- queda acoplada a formato editorial;
- cuesta versionar cambios de estructura;
- las consultas complejas son frágiles;
- el grafo y el morning briefing quedan atados a parsing difuso.

Si la UI lee proyecciones:

- podés cambiar la UI sin tocar el vault;
- podés mantener varias vistas simultáneas;
- podés versionar el contrato de datos;
- podés llegar luego a API o producto sin rehacer todo.

### Regla resultante

**Markdown = fuente humana/canónica.**  
**Proyecciones = fuente de lectura para dashboard/briefing/grafo.**

---

## Decisión 5 — Estrategia de operación: free-first, premium-escalation

### Decisión

La estrategia inicial del sistema será:

- **free-first por defecto**
- **premium only when needed**

### Qué significa

1. **Tareas baratas o mecánicas**
   - resúmenes;
   - ingestión;
   - clasificación;
   - scaffolding simple;
   - transformaciones de texto;
   - validaciones ligeras;

   → deben intentar resolverse con tiers gratis/baratos primero.

2. **Tareas de arquitectura, decisiones complejas, debugging profundo o cambios críticos**
   → pueden escalar a Claude Code o a un modelo mejor cuando lo justifique el valor.

### Por qué esta es la mejor decisión

- Respeta tu restricción económica.
- Aprovecha que hoy ya operás con Gemini Pro + Cursor Pro.
- Permite construir el sistema aunque más adelante cambie el proveedor principal.
- Hace al producto más atractivo: no depende de un solo vendor premium.

### Sobre integrar chats de Antigravity/Cursor

Sí: **integrar directamente los chats cerrados de IDEs/webs es difícil y frágil**.

### Por qué

- muchas herramientas no exponen historial de forma estable;
- los formatos cambian;
- a veces no hay API/export serio;
- scrappear chats como base del sistema sería frágil y potencialmente inseguro.

### Mejor enfoque

No hacer de los chats la fuente canónica.

En cambio:

- capturar los **outputs útiles**;
- resumirlos a notas, decisiones, progress logs o registries;
- eventualmente crear comandos/hábitos de “distill this session into the system”.

### Regla resultante

Los chats son **fuentes efímeras**.  
El sistema debe persistir **artefactos derivados útiles**, no depender del historial completo del chat como base estructural.

---

## Decisión 6 — Host strategy inicial

### Decisión

La estrategia recomendada hoy es:

- **núcleo conceptual:** terminal-first / Claude Code mindset;
- **operación práctica actual:** Antigravity + Cursor mientras aprovechás tus límites y suscripciones actuales;
- **capa futura de background/remote:** OpenClaw solo después de estabilizar el modelo de contexto.

### Por qué

- Claude Code sigue siendo una referencia fuerte en la industria para flujos agentic en terminal.
- Hoy tu realidad operativa ya incluye Antigravity y Cursor.
- Forzar una migración total inmediata sería prematuro.
- OpenClaw tiene mucho valor potencial, pero sería un error introducirlo antes de tener bien definidos:
  - context boundaries,
  - registries,
  - event model,
  - morning briefing,
  - routing policy.

---

## Decisión 7 — El sistema necesitará un event model explícito

### Decisión

Aunque el sistema use múltiples fuentes derivadas, debe existir un **event model explícito** desde el MVP arquitectónico.

### Eventos mínimos a contemplar

- repo registered
- repo imported
- repo updated
- branch created
- branch switched
- branch merged
- commit captured
- commit summarized
- resource captured
- resource distilled
- note created
- decision recorded
- next step updated
- briefing generated
- context restored

### Por qué

Sin esto:

- el morning briefing será inconsistente;
- el dashboard será heurístico;
- el grafo se volverá ambiguo;
- y será difícil reconstruir historia o hacer debugging del sistema.

### Regla resultante

No todo tiene que implementarse de inmediato, pero el plan y los archivos deben nacer con espacio para un event model claro.

---

## Decisión 7.1 — Commits y ramas serán fuente fuerte de verdad operativa

### Decisión

Los **commits**, las **ramas** y sus transiciones serán tratados como una de las fuentes más fuertes de verdad operativa para reconstruir el estado de un proyecto.

### Qué significa

El sistema no debe depender solo de notas humanas para entender “qué pasó” en un proyecto.
También debe poder usar:

- historial de commits;
- branch actual;
- merges;
- divergencia respecto a `main`/`master`;
- y, más adelante, PRs/issues relacionados.

### Por qué conviene

- Los commits son una señal real de trabajo hecho.
- Permiten reconstruir evolución sin depender de memoria subjetiva.
- Ayudan a generar morning briefings y “último estado” con mejor fidelity.
- Son escalables entre muchos repos y más portables que un chat cerrado.

### Limitación importante

Los commits **no alcanzan solos**:

- no siempre explican el porqué;
- a veces tienen mensajes mediocres;
- no reemplazan decisiones, objetivos ni próximos pasos.

### Regla resultante

El sistema debe combinar:

- **commits/branches** para “qué cambió”;
- **notas/decisiones/next steps** para “por qué importa y qué sigue”.

---

## Decisión 8 — El sistema debe ser auditable por capas

### Decisión

El sistema debe poder auditarse en cuatro capas:

1. **Arquitectura** — si la estructura sigue siendo coherente.
2. **Contexto** — si la información se está mezclando o creciendo sin control.
3. **Costo** — si el routing de modelos sigue siendo eficiente.
4. **Seguridad** — si algún flujo filtra contexto donde no debe.

### Implicación

No alcanza con tener `lint`.
Necesitamos también:

- auditoría de calidad estructural;
- auditoría de contexto;
- auditoría de riesgo de inyección;
- auditoría de drift del sistema.

---

## Resumen ejecutivo

Las decisiones cerradas en esta versión son:

1. **Sí a múltiples fuentes derivadas**, pero con fuentes canónicas bien delimitadas.
2. **Workspace-hub-first** como modelo de autoridad.
3. **Arquitectura híbrida** para separar sensibilidad desde temprano.
4. **Dashboard sobre proyecciones derivadas**, no sobre markdown crudo.
5. **Free-first / premium-escalation** como estrategia operativa.
6. **Claude Code mindset + Antigravity/Cursor como puente actual**.
7. **Event model explícito** desde la base arquitectónica.
8. **Auditoría por capas** como principio estructural.

---

## Qué debería cambiar ahora en el plan de implementación

El próximo plan/LLM implementador debería incorporar explícitamente:

- una fase de **trust model + context routing**;
- una fase de **event model**;
- una **host capability matrix**;
- una **data sensitivity matrix**;
- una definición clara de **proyecciones derivadas** para dashboard y briefing.

---

*Versión inicial congelada durante la revisión arquitectónica de abril 2026.*
