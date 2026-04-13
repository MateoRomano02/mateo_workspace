# Manual Operativo: Skills, Herramientas y Estrategia de Contexto

Este documento es una guía viva que define **cómo y cuándo** invocar las capacidades del sistema operativo personal. Funciona como el puente entre tu inteligencia (intención), las herramientas (músculos) y las skills (cerebro).

**Documento complementario de ejecución:** [`plan-scaffolding-workspace-system.md`](./plan-scaffolding-workspace-system.md)
  
**Decisiones arquitectónicas congeladas:** [`decisiones-arquitectonicas-v1.md`](./decisiones-arquitectonicas-v1.md)

---

## 1. Filosofía: Costo Mínimo / Alta Robustez
El objetivo central es que el **sistema** sea tan robusto que incluso un modelo "pequeño" o gratuito pueda realizar un trabajo de alta calidad. 

*   **Supremacía del Contexto**: Un LLM "malo" con contexto perfecto supera a un LLM "Pro" sin contexto.
*   **Validación Estricta**: Usar skills de auditoría para compensar la falta de razonamiento de los modelos free.
*   **Ahorro Proactivo**: Cada token ahorrado es dinero para tareas de arquitectura compleja.

---

## 2. Skills Clave: El "Cerebro" del Sistema
Basado en el análisis de las +1300 skills disponibles, estas son las de mayor impacto para la **Fase A (Scaffolding)**.

### ⚠️ Fundamentales (Gestión de Tareas)
*   **`writing-plans` / `concise-planning`**: Invocación obligatoria para cualquier tarea de más de 2 pasos. Mantiene el foco y ahorra tokens.
*   **`planning-with-files`**: Enseña al agente a usar archivos MD como memoria de trabajo. Es el núcleo de la "osmotización" de ideas.
*   **`documentation` / `wiki-architect`**: Estructuran la información técnica para que sea legible tanto por humanos como por agentes.

### 🧠 Memoria y Contexto (Second Brain)
*   **`obsidian-markdown` / `obsidian-cli`**: El puente hacia tu bóveda de notas. Permite que el agente lea/escriba en tu Second Brain.
*   **`bdistill-knowledge-extraction`**: Para procesar repositorios o documentos densos y extraer solo la "esencia" técnica.
*   **`context-management-context-restore`**: Para limpiar y restaurar el contexto de la sesión, evitando que el agente se "aturda" con demasiada información.

### 🛠️ Operativas y Calidad
*   **`claude-code-expert`**: Para configurar el entorno siguiendo las mejores prácticas de Anthropic.
*   **`lint-and-validate`**: Seguro de vida para que el código y las configuraciones sean correctas.
*   **`vibe-code-auditor`**: Auditoría de calidad para código generado con modelos de bajo costo (free tiers).

---

## 2. Matriz Estratégica: Sinergia Herramienta + Skill
El sistema alcanza su máximo potencial cuando combinás una herramienta externa (músculo) con un procedimiento interno (skill).

| Escenario de Uso | Herramienta/Recurso Clave | Skill a Invocar | Por qué funciona |
| :--- | :--- | :--- | :--- |
| **Investigar nueva API** | Context7 / withoneai/knowledge | `@bdistill-knowledge-extraction` | Trae la data técnica y la resume para tu cerebro. |
| **Scaffolding de Feature** | GitHub MCP / Best Practices | `@writing-plans` | Registra el progreso en la nube siguiendo estándares. |
| **Continuidad de Sesión** | claude-mem | `@context-management-context-restore` | Recupera hechos pasados y limpia el contexto activo. |
| **Tareas de Bajo Costo** | OpenRouter :free / caveman | `@lint-and-validate` | Ahorra dinero y tokens, pero garantiza la calidad. |
| **Gestión de Notas** | Obsidian | `@obsidian-markdown` | Mantiene tu Second Brain sincronizado con el repo. |

---

## 3. Escenarios de Implementación (Playbooks)

### Escenario A: "Ingesta de Recurso Nuevo"
1.  Usar **Context7** para leer el README/Docs del recurso.
2.  Invocar **`@bdistill-knowledge-extraction`** para generar un resumen técnico.
3.  Guardar el resumen en `brain/resources/` vía **`@obsidian-markdown`**.

### Escenario B: "Desarrollo con Presupuesto Cero"
1.  Cambiar a un modelo **`:free`** en OpenRouter/Gemini.
2.  Activar **`caveman`** para respuestas ultra-cortas.
3.  Ejecutar la tarea mecánica e inmediatamente invocar **`@lint-and-validate`** para asegurar que la inteligencia del modelo free fue suficiente.

---

## 4. Evolución del Manual
Este documento crecerá con:
- [ ] Listas de `/slash commands` personalizados para este repo.
- [ ] Reglas de inyección de contexto por tipo de proyecto.
- [ ] Definición de "Agentes Especializados" (.md en `.claude/agents/`).

---
*Última actualización: Abril 2026 - Sesión de definición de Skills clave.*
