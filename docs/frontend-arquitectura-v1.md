# Frontend arquitectura v1

Este documento congela decisiones iniciales de frontend para el workspace system.

---

## 1. Objetivo de la interfaz

La UI debe comportarse como panel operativo del sistema:

- navegación rápida por áreas;
- visibilidad del estado actual;
- acciones directas para operar el sistema (no solo visualizar).

---

## 2. Estructura base de pantalla

Se adopta una estructura de dos columnas:

1. **Sidebar izquierda fija**
   - navegación principal (`Overview`, `Projects`, `Events`, `New project`);
   - contexto de producto (Workspace OS / Control panel).

2. **Panel derecho dinámico**
   - vista activa según navegación;
   - cards y listas de estado;
   - formularios operativos.

Esta decisión responde al requerimiento explícito: “items a la izquierda y vista de cada pantalla a la derecha”.

---

## 3. Vistas iniciales definidas

- **Overview:** resumen de proyectos, repositorios, acciones urgentes, señal de branch.
- **Context profile:** contexto de la persona usuaria (focus, skills, instituciones).
- **Projects:** digest operativo por proyecto.
- **Resources:** recursos rastreados y estado de lifecycle.
- **Events:** últimos eventos relevantes del sistema.
- **Graph:** preview de contrato de nodos/aristas.
- **New project:** formulario para crear proyecto + registrar repo en un solo flujo.

---

## 4. Flujo de alta de proyecto (v1)

### Input mínimo

- `projectName`
- `repositoryName`
- `sensitivity`

### Resultado esperado

1. se crea entidad `project`;
2. se crea entidad `repository`;
3. se agregan eventos (`repo-registered`, `next-step-updated`);
4. se recalcula snapshot derivado:
   - `projectDigests`
   - `briefing`
   - métricas de overview.

---

## 5. Estado y arquitectura frontend

- Store global en Zustand (`useWorkspaceStore`).
- Estado fuente: `coreState`.
- Estado derivado: `snapshot` (mediante `deriveWorkspaceSnapshot`).
- Regla: la UI consume `snapshot`; las acciones modifican `coreState`.

Esto evita que la pantalla calcule lógica de dominio ad hoc.

---

## 6. Decisiones visuales v1

- Tema oscuro por defecto.
- Jerarquía clara de cards y bloques operativos.
- Tipografía no genérica:
  - display: `Chakra Petch`
  - body: `Manrope`

---

## 7. Límites de v1

- Ya existe ingestión Git local v1, pero solo para repos configurados manualmente.
- Aún no hay persistencia en backend/API.
- La vista de grafo actual es contractual (preview), no visualización interactiva final.

---

## 8. Próximas decisiones frontend (v2)

1. Persistencia local de sesión del dashboard (localStorage).
2. Integración de fuente real de repos/commits.
3. Definición de layout para detalle de proyecto.
4. Introducción de sistema de componentes base reutilizables.

---

## 9. Fuente de datos real (v1.1)

Se adopta una estrategia incremental para pasar de mock a estado real:

1. Script de ingesta local:
   - `scripts/ingest-workspace-state.mjs`
2. Configuración de repos rastreados:
   - `system/config/tracked-repositories.json`
3. Salida generada para el frontend:
   - `app/public/data/workspace-core-state.json`
4. Carga en runtime:
   - store intenta cargar JSON real al iniciar;
   - si no existe, usa fallback mock.

Esta decisión mantiene la UI operativa mientras se habilita ingestión real progresiva.

---

## 10. Contexto personal y recursos (v1.2)

Se incorporan dos capas explícitas en el frontend:

1. **Context profile**
   - fuente: `system/config/profile-context.json`
   - objetivo: representar a la persona usuaria como entidad de primer nivel.

2. **Resource registry**
   - fuente: `system/registries/resources.json`
   - objetivo: vincular recursos guardados con proyectos activos y futuro grafo técnico.

Estas capas respetan la visión original de second brain + contexto personal + recursos conectados.

---

*Versión: v1 (abril 2026).*
