# Roadmap y checklist de implementación

Este archivo es el tablero operativo del proyecto.
Se actualiza en cada iteración para evitar perder foco entre planificación e implementación.

---

## Estado global

- **Fase actual:** Fase 2 (modelo de datos operativo)
- **Última actualización:** 2026-04-13
- **Objetivo activo:** convertir decisiones y plan en estructuras ejecutables de datos/estado/UI

---

## Checklist por fases

## Fase 0 - Fundaciones estratégicas (docs)

- [x] Objetivo y alcance del sistema definidos (`docs/objetivo-workspace-personal.md`)
- [x] Registro extendido de ideas y restricciones (`docs/registro-ideas-workspace.md`)
- [x] Informe consolidado de recursos (`docs/informe-recursos-ai-agentes.md`)
- [x] Manual de skills operativo (`docs/manual-operativo-skills.md`)
- [x] Plan de scaffolding detallado (`docs/plan-scaffolding-workspace-system.md`)
- [x] Decisiones arquitectónicas congeladas (`docs/decisiones-arquitectonicas-v1.md`)
- [x] Protocolo de ejecución con IA por micro-fases (`docs/protocolo-ejecucion-con-ia.md`)

**Criterio de cierre de fase:** cumplido.

---

## Fase 1 - Bootstrap técnico del proyecto

- [x] App base creada en `app/` (React + TypeScript + Vite)
- [x] Tailwind v4 integrado
- [x] Router base configurado
- [x] Estado global base con Zustand
- [x] Query layer base con TanStack Query
- [x] Tooling de calidad (`eslint`, `prettier`, `lint-staged`)
- [x] Validación técnica: `format`, `lint`, `typecheck`, `build`

**Criterio de cierre de fase:** cumplido.

---

## Fase 2 - Modelo de datos operativo (en curso)

- [x] Definir contratos TypeScript de entidades core:
  - project
  - repository
  - branch
  - commit-summary
  - next-step
  - briefing
- [x] Definir modelo mínimo de eventos (`repo registered`, `commit summarized`, etc.)
- [x] Crear dataset inicial de mock operativo validado
- [x] Conectar store global a ese contrato
- [x] Reflejar estado real en dashboard inicial

**Criterio de cierre de fase:** dashboard muestra estado coherente basado en contrato unificado.

---

## Fase 3 - Git intelligence v1

- [x] Contrato de resumen de commits por proyecto
- [x] Contrato de estado de rama activa
- [x] Regla para distinguir progreso mainline vs experimental
- [x] Digest por proyecto para briefing diario
- [ ] Vinculación commit -> next steps / decisiones
- [x] Ingesta real inicial desde repos locales configurados

**Criterio de cierre de fase:** un proyecto puede resumirse con branch + cambios recientes + próximos pasos.

---

## Fase 4 - Morning briefing v1

- [x] Esquema del briefing diario
- [x] Pipeline de generación desde estado del sistema
- [x] Vista inicial en dashboard
- [ ] Reglas de prioridad (urgente, bloqueado, siguiente acción)

---

## Fase 5 - Context boundaries y seguridad operativa

- [x] Matriz de sensibilidad aplicada a entidades
- [ ] Reglas de inyección de contexto por tipo de repo
- [ ] Política de exclusión para repos externos/laborales
- [ ] Validaciones para evitar mezcla accidental de contextos
- [x] Contexto de persona usuaria incorporado al estado y dashboard

---

## Fase 6 - Ingesta de recursos y repos

- [x] Contrato de captura de recurso
- [x] Ciclo de vida (`captured`, `distilled`, `linked`, `active`, `archived`, `rejected`)
- [ ] Criterios de relevancia y descarte
- [x] Primer flujo manual completo documentado

---

## Fase 7 - Dashboard contract y evolución visual

- [x] Contrato de nodos/aristas del grafo
- [x] Contrato de vista por proyecto
- [x] Contrato de feed de eventos
- [ ] Primera vista de grafo técnico basada en datos reales
- [x] Shell de dashboard con sidebar izquierda + panel derecho
- [x] Flujo inicial de alta de proyecto desde UI

---

## Riesgos actuales a vigilar

- [ ] Evitar crear estructuras que no tengan retrieval model claro
- [ ] Evitar mezclar notas humanas con proyecciones de máquina sin contrato
- [ ] Evitar sobre-automatizar antes de cerrar event model y sensitivity model

---

## Próximos 3 pasos (secuencia activa)

1. Vincular commits y eventos con next steps/decisiones por proyecto.
2. Persistir estado de sesión del dashboard y alta de proyectos.
3. Pasar de preview de grafo a visualización interactiva navegable.
