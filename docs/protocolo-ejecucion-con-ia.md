# Protocolo de ejecución con IA

Este documento responde una pregunta práctica:

**¿Cómo llevo todo este plan a la realidad sin tirarle un documento gigante por la cabeza al modelo?**

La respuesta es: **por capas, por sprints, y con documentos de control pequeños**.

Este archivo está pensado para vos, no para el implementador técnico.

---

## 1. Regla principal

No le des a la IA:

- toda la visión,
- todos los docs,
- todas las decisiones,
- y toda la implementación,

en un solo prompt.

Eso suele generar uno de estos problemas:

- te devuelve algo superficial;
- se pierde en el medio;
- implementa de más;
- mezcla decisiones ya cerradas con decisiones abiertas;
- o hace “vibe coding” sin respetar la arquitectura.

### En cambio

Vos tenés que operar así:

1. **Elegir una micro-fase**
2. **Dar solo los docs mínimos necesarios**
3. **Pedir un output concreto**
4. **Revisar**
5. **Congelar**
6. **Seguir con la próxima**

---

## 2. Cómo pensar el trabajo

No estás implementando “el sistema completo”.

Estás implementando, en orden:

1. **arquitectura base**
2. **modelo de información**
3. **flujos operativos**
4. **automatizaciones**
5. **visualización**

Si intentás hacer 1–5 a la vez, se rompe.

---

## 3. Qué documentos existen y para qué sirven

### 3.1 Documentos estratégicos

- `docs/objetivo-workspace-personal.md`  
  Tu constitución. Qué querés lograr y por qué.

- `docs/registro-ideas-workspace.md`  
  Bitácora ampliada de ideas, intuiciones y restricciones.

### 3.2 Documentos técnicos

- `docs/informe-recursos-ai-agentes.md`  
  Base técnica y de investigación.

- `docs/manual-operativo-skills.md`  
  Qué skills conviene usar y para qué.

- `docs/decisiones-arquitectonicas-v1.md`  
  Decisiones congeladas. Esto no debería reabrirse sin motivo fuerte.

- `docs/plan-scaffolding-workspace-system.md`  
  Plan detallado para el implementador.

### 3.3 Documento operativo para vos

- `docs/protocolo-ejecucion-con-ia.md`  
  Este archivo. Cómo hablar con la IA sin que todo explote.

---

## 4. Forma correcta de trabajar con otro LLM

### 4.1 No le mandes “todo el plan”

Mandarle el plan entero puede servir como referencia, pero **no como prompt principal**.

La mejor forma es:

- darle el plan **como contexto de fondo**;
- pedirle que trabaje **solo una fase**;
- y darle un output súper específico.

### 4.2 Fórmula de prompt recomendada

Siempre seguir esta estructura:

1. **Rol**
2. **Objetivo puntual**
3. **Docs fuente**
4. **Decisiones cerradas**
5. **Alcance**
6. **Output esperado**
7. **Skills que debe invocar**
8. **Qué no debe hacer**

---

## 5. Cómo dividir el plan en sesiones reales

### Sprint 0 — Arquitectura congelada

**Meta:** que el LLM no implemente nada grande sin respetar decisiones base.

**Qué le pasás:**

- `docs/objetivo-workspace-personal.md`
- `docs/decisiones-arquitectonicas-v1.md`
- `docs/plan-scaffolding-workspace-system.md`

**Qué le pedís:**

- solo que te devuelva:
  - trust model,
  - data sensitivity matrix,
  - host capability matrix,
  - event model v1.

**No le pedís todavía:**

- código,
- dashboard,
- scripts,
- integración Obsidian real.

### Sprint 1 — Modelo de archivos y notas

**Meta:** definir la estructura real del repo.

**Qué le pasás:**

- decisiones arquitectónicas
- plan
- manual de skills

**Qué le pedís:**

- árbol de carpetas
- tipos de notas
- frontmatter
- schemas markdown/json

### Sprint 2 — Bootstrap de proyectos/repos

**Meta:** que el sistema sepa cómo nace un repo nuevo.

**Qué le pedís:**

- flujo para crear repo
- flujo para registrar repo existente
- tipos de repo
- contexto que sí/no se comparte

### Sprint 3 — Resource ingestion

**Meta:** capturar links, repos, docs y decidir si valen la pena.

### Sprint 4 — Morning briefing + commit intelligence

**Meta:** ver estado por proyecto, commits resumidos, branch actual, next steps.

### Sprint 5 — Dashboard contract

**Meta:** definir el contrato de datos antes de tocar UI.

### Sprint 6 — Implementación del dashboard

**Meta:** recién acá frontend.

---

## 6. Lo que sí conviene pedirle en cada sesión

Pedile una sola de estas cosas por vez:

- “definime el trust model”
- “proponeme el data sensitivity matrix”
- “diseñame el event model v1”
- “dame el árbol de carpetas”
- “dame los templates de project/resource/decision”
- “diseñame el flujo de bootstrap de un repo”
- “diseñame el commit digest”
- “diseñame el morning briefing schema”
- “diseñame el graph data contract”

### Lo que no conviene pedirle así

- “implementame todo el sistema”
- “haceme el second brain completo”
- “integrame Obsidian, GitHub, dashboard, MCP y OpenClaw todo junto”

---

## 7. Qué skills pedirle que use en cada caso

### Para arquitectura / diseño del sistema

- `@writing-plans`
- `@concise-planning`
- `@wiki-architect`
- `@documentation`
- `@claude-code-expert`

### Para notas / second brain / vault

- `@obsidian-markdown`
- `@obsidian-cli`

### Para recursos / investigación

- `@bdistill-knowledge-extraction`

### Para memoria / resumen / continuidad

- `@context-management-context-restore`

### Para revisar lo que implementó

- `@lint-and-validate`
- `@vibe-code-auditor`

---

## 8. Ejemplos de prompts que sí sirven

### 8.1 Prompt para Sprint 0

```text
Use @writing-plans and @concise-planning.

I do NOT want implementation yet.
I want you to work only on the architectural control layer of this system.

Read:
- docs/objetivo-workspace-personal.md
- docs/decisiones-arquitectonicas-v1.md
- docs/plan-scaffolding-workspace-system.md

Return only:
1. trust model
2. host capability matrix
3. data sensitivity matrix
4. event model v1

Do not create UI.
Do not create automation yet.
Do not reopen frozen decisions.
```

### 8.2 Prompt para Sprint 1

```text
Use @writing-plans, @wiki-architect, and @obsidian-markdown.

Work only on the repository information architecture.

Read:
- docs/decisiones-arquitectonicas-v1.md
- docs/plan-scaffolding-workspace-system.md
- docs/manual-operativo-skills.md

Return:
1. exact directory tree
2. note types
3. frontmatter schema
4. links between project/resource/decision/repository

Do not implement automation.
Do not build dashboard.
```

### 8.3 Prompt para commits y ramas

```text
Use @writing-plans and @documentation.

I want a design for commit and branch intelligence for this workspace system.

Read:
- docs/decisiones-arquitectonicas-v1.md
- docs/plan-scaffolding-workspace-system.md

Return:
1. commit summary schema
2. branch state schema
3. how project status is derived from commits + notes
4. how to avoid over-trusting low-quality commit messages

No implementation yet.
```

---

## 9. Cómo revisar lo que te devuelve la IA

No le preguntes solo:

- “está bien?”

Preguntate:

1. **¿Respetó decisiones congeladas?**
2. **¿Se fue de scope?**
3. **¿Me dio artefactos concretos o puro humo?**
4. **¿Está claro qué archivos tocaría?**
5. **¿Esto hace más simple el sistema o más confuso?**

Si falla, no sigas.
Primero corregí esa fase.

---

## 10. Qué hacer cuando un output te gusta

Cuando un output esté bueno:

1. guardarlo en `docs/`
2. enlazarlo desde el documento correcto
3. congelarlo si es decisión importante
4. recién ahí pasar a la siguiente fase

Esto evita que el sistema se vuelva inconsistente.

---

## 11. Cómo pensar los commits dentro del sistema

Tu intuición de usar commits como base de verdad es muy buena, pero hay que usarlos bien.

### Los commits te dan

- secuencia real de trabajo;
- granularidad temporal;
- ramas;
- merges;
- señales de actividad real.

### Los commits no te dan solos

- intención estratégica;
- objetivo del proyecto;
- próximos pasos;
- relevancia real del cambio;
- decisiones de alto nivel.

### Regla práctica

El sistema debería usar:

- **commits/branches** para “qué cambió”;
- **notas/briefings/decisiones** para “qué significa”;
- **next steps** para “qué sigue”.

---

## 12. Mi recomendación concreta para vos como operador

Si hoy vas a hablar con otro LLM, no le mandes todo.

### Mi recomendación

Hace esto:

1. **Primera sesión**
   - solo arquitectura de control:
     - trust model
     - sensitivity matrix
     - host matrix
     - event model

2. **Segunda sesión**
   - filesystem + note schemas

3. **Tercera sesión**
   - bootstrap de repos + commit/branch intelligence

4. **Cuarta sesión**
   - morning briefing + graph/dashboard contract

5. **Quinta sesión**
   - recién ahí implementación concreta

---

## 13. Principio final

Tu plan no está mal por ser grande.

El error sería:

- ejecutarlo como si fuera una sola tarea.

La forma correcta es:

- **gran visión**
- **pequeñas fases**
- **decisiones congeladas**
- **auditoría constante**
- **cada output útil se convierte en parte del sistema**

Eso es exactamente el paradigma que querés construir.
