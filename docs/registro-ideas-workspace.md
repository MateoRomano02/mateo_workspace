# Registro de ideas del workspace personal

Este archivo guarda ideas, intuiciones, preguntas, ambiciones y restricciones **casi en crudo**, pero ordenadas. La intención es **no perder nada importante** que surja en conversaciones de diseño del sistema.

No reemplaza a `objetivo-workspace-personal.md`; lo complementa:

- `objetivo-workspace-personal.md` = versión más estratégica/constitucional.
- `registro-ideas-workspace.md` = bitácora ampliada de ideas y definición del problema.

---

## 1. Idea central

Construir un sistema que funcione como:

- second brain;
- entorno de trabajo con agentes;
- memoria persistente entre proyectos;
- red de contexto de tu vida, trabajo, investigaciones y repositorios;
- dashboard visual navegable;
- base potencial para un producto futuro.

La sensación buscada no es “tener más herramientas”, sino **dejar de coordinar millones de herramientas manualmente** y que el sistema:

- te ayude a pensar;
- mantenga contexto;
- orqueste herramientas;
- optimice costo;
- recuerde estado de proyectos;
- y se vuelva cada vez más útil con el uso.

---

## 2. Ideas explícitas que mencionaste

### 2.1 Rutina diaria ideal

Te imaginás levantándote a la mañana y teniendo rápidamente:

- contexto de en qué quedó cada proyecto;
- qué fue lo último que se hizo;
- cuáles eran los próximos pasos planteados;
- qué cosas quedaron colgadas o pendientes.

Esto sugiere que el sistema debería producir algo parecido a:

- un “morning briefing”;
- un dashboard por proyecto;
- una vista de últimos cambios + next actions.

### 2.2 Integración de LLMs free

Esto es prioridad alta.

No querés un sistema que te obligue a:

- pagar muchas suscripciones en paralelo;
- depender de una sola plataforma cerrada;
- o perder valor por no usar bien los rate limits y tiers gratuitos.

Querés un sistema que:

- entienda qué modelos o herramientas tenés disponibles;
- aproveche lo gratis y barato;
- minimice costo computacional y monetario;
- use mejor modelo solo cuando realmente haga falta.

### 2.3 Potencial de producto

Hay una intuición fuerte de que esto, si funciona bien, podría convertirse más adelante en:

- un producto;
- una herramienta distribuible;
- o una especie de framework operativo para otras personas.

Por eso el MVP debería pensarse ya con cierta solidez conceptual, aunque no tenga todavía toda la complejidad del producto final.

### 2.4 Inyección de repos y recursos

Te imaginás que el sistema pueda:

- recibir repositorios nuevos como input;
- analizarlos;
- relacionarlos con tus objetivos y contexto;
- decidir si vale la pena integrarlos;
- y eventualmente monitorear recursos externos.

Ejemplo que diste:

- una herramienta que scrapee repos famosos o relevantes de la semana;
- los analice automáticamente;
- y los compare contra el contexto de tu vida/proyectos;
- para sugerir si conviene integrarlos al sistema.

### 2.5 Captura automática de repos nuevos

Te interesa que esto sea **lo más automático posible**.

Visión concreta:

- desde el mismo sistema, prompt a un agente para crear un repo nuevo;
- ese repo ya nace dentro del gran contexto;
- el agente entiende cómo debe crearlo;
- el sistema lo empieza a seguir desde el comienzo.

### 2.6 Contexto compartido, pero con límites

También marcaste un límite muy importante:

- puede haber repos externos, laborales o de empresa;
- en esos contextos no corresponde inyectar “tu vida” o proyectos personales.

Esto implica que el sistema no puede manejar el contexto como una masa única.
Necesita:

- capas;
- filtros;
- reglas de visibilidad;
- fronteras claras.

### 2.7 Dashboard web

Obsidian te interesa, pero no querés depender solo de Obsidian.

Te interesa también:

- un dashboard web;
- más personalizable;
- con diferentes vistas;
- que permita tocar un proyecto específico y ver todo lo relacionado a él.

### 2.8 Grafos por grupos o capas

Te imaginás más de un tipo de grafo:

1. uno central:
   - vos;
   - tus objetivos;
   - tus proyectos;
   - tus áreas de trabajo;

2. otro técnico:
   - relaciones entre proyectos;
   - dependencias;
   - stacks;
   - ideas compartidas;
   - recursos asociados.

Esto significa que el problema no es solo “mostrar nodos”, sino **definir modelos de relación**.

### 2.9 Cambio de paradigma

Dijiste algo clave:

- hoy muchas interacciones con IA quedan muertas en chats web;
- tenés que empezar de nuevo constantemente;
- querés que una vez que entrás a trabajar en el contexto de un proyecto, toda interacción útil vaya construyendo ese contexto.

Esto es, efectivamente, un cambio de paradigma.

No es solo “tomar notas”: es pasar a un sistema donde:

- el trabajo genera memoria;
- la memoria realimenta el trabajo;
- y el costo de recomenzar cae muchísimo.

---

## 3. Respuestas que diste a las preguntas de arquitectura

### 3.1 Datos sensibles

Dijiste que a futuro el sistema podría incluir:

- gastos;
- inversiones;
- decisiones laborales fuertes;
- salud.

Esto no significa que todo eso tenga que vivir en el mismo lugar sin reglas.
Pero sí define que el sistema final podría abarcar áreas muy sensibles.

### 3.2 Local + nube

No querés un extremo puro.

Tu intuición actual es:

- mezcla de local con nube;
- según necesidades de sync, acceso desde otros dispositivos, integraciones y automatización.

### 3.3 Vault/versionado

Te gustaría versionar el vault por seguridad, rollback y control.

Preocupaciones concretas que mencionaste:

- que se rompa algo;
- que “se inyecte algo que no corresponde”;
- necesidad de sanity checks;
- necesidad de ordenar/eliminar contenido viejo;
- riesgo de que demasiado contexto haga perder claridad.

### 3.4 “Siempre corriendo”

No tenés definida todavía la forma exacta:

- proceso local,
- servicio en background,
- VPS,
- OpenClaw,
- híbrido.

Necesitás ayuda para tomar esa decisión.

### 3.5 Dispositivos

Hoy trabajás principalmente desde tu Mac.
Pero te interesa dejar abierta la puerta a:

- acceso desde la web;
- otro dispositivo;
- celular;
- eventualmente continuar sesiones o consultar el estado fuera de tu Mac.

### 3.6 Automatización de creación de repos

Preferencia clara:

- automático;
- o al menos operable desde el mismo sistema por prompt.

Idea concreta:

- pedir a un agente crear el repo de GitHub;
- que ese repo ya nazca dentro del contexto grande;
- que use buenas prácticas e integraciones del sistema desde el inicio.

### 3.7 Herramienta principal deseada

Hoy usás varios hosts porque aprovechás sus limits/rate plans.

Pero la aspiración es:

- ojalá usar uno solo;
- o al menos tener un sistema unificado por encima de ellos.

También marcaste:

- interés en usar **Claude Code por terminal** porque “según la industria es lo mejor”;
- uso actual de Antigravity por acceso a Gemini Pro / rate limits;
- uso de Cursor, pero con intención de dejar de pagar si el sistema lo reemplaza;
- prioridad constante en **seguridad**.

### 3.8 Memoria + grafo

No querés elegir entre:

- memoria larga entre sesiones;
- y mapa explícito visible del contexto.

Querés **ambas**.

Y preguntás correctamente si no pueden combinarse.

Sí: conceptualmente se pueden combinar, pero con arquitectura separada:

- memoria operativa del agente;
- representación visual/navegable para vos;
- mecanismo de puente entre ambas.

---

## 4. Qué problema real intenta resolver este sistema

No es solo “PKM”.

Problemas reales que querés resolver:

1. **Reinicio constante de contexto**  
   Tener que volver a explicar proyectos y decisiones una y otra vez.

2. **Fragmentación de herramientas**  
   IDEs, LLM webs, chats, notas, repos, bookmarks, tweets, docs, ideas — todo separado.

3. **Costo mental**  
   Demasiadas ventanas, demasiados lugares, demasiadas decisiones pequeñas.

4. **Costo monetario y computacional**  
   Elegir mal herramienta/modelo puede hacerte pagar más por menos valor.

5. **Pérdida de conocimiento**  
   Ideas valiosas quedan en chats muertos o sesiones no reutilizables.

6. **Falta de continuidad entre proyectos**  
   No tener una red viva que relacione objetivos, repos, stacks, investigaciones y decisiones.

---

## 5. Hipótesis de valor del sistema

Si esto se construye bien, podría:

- reducir muchísimo la fricción de empezar a trabajar cada día;
- disminuir el costo de cambiar de proyecto o de volver a uno viejo;
- aumentar la calidad de las decisiones por tener mejor contexto;
- aprovechar mejor herramientas gratis/baratas;
- convertir trabajo diario en una base de conocimiento acumulativa;
- servir más adelante como producto o framework.

---

## 6. Riesgos y tensiones que ya aparecieron

### 6.1 Demasiado contexto

Si entra todo sin filtro:

- se pierde claridad;
- se vuelve caro;
- el agente se confunde;
- y el grafo deja de ayudar.

### 6.2 Contexto sensible

Si mezclás:

- vida personal,
- salud,
- dinero,
- trabajo,
- repos ajenos,

sin reglas, el sistema puede volverse inseguro o imprudente.

### 6.3 Automatización sin gobernanza

Si todo se ingiere automáticamente sin revisión:

- puede entrar ruido;
- duplicados;
- basura;
- o información que no debería estar.

### 6.4 Multi-host / multi-LLM

Aprovechar varios servicios es útil, pero también complica:

- consistencia;
- memoria;
- formato de contexto;
- experiencia diaria.

---

## 7. Intenciones no negociables que quedan registradas

- **No perder nada** importante de estas conversaciones.
- Construir un sistema que sea **útil en tu vida real**, no una demo.
- Priorizar **seguridad**.
- Priorizar **costo bajo / uso inteligente de free tiers**.
- Diseñar un MVP que no contradiga la visión futura de producto.
- Evitar que el sistema se convierta en una bolsa caótica de contexto.

---

## 8. Preguntas que siguen abiertas

Estas todavía no están cerradas y deberán responderse antes de implementar arquitectura fuerte:

1. ¿Vault dentro de este repo o arquitectura híbrida?
2. ¿Cuál es el host principal real del agente en el MVP?
3. ¿Qué capa queda “siempre corriendo” al principio?
4. ¿Cómo se modelan los límites entre contexto personal, profesional y sensible?
5. ¿Cómo se representa el grafo técnico vs el grafo de objetivos/persona?
6. ¿Qué eventos se capturan automáticamente y cuáles manualmente?
7. ¿Cómo se evita que el sistema crezca sin control?

---

## 9. Nota meta

Todo lo que aparece en este archivo debe tratarse como material de diseño serio, no como brainstorming descartable.

La consigna explícita es:

> no perder ninguna idea importante, ninguna intuición útil, ninguna decisión emergente.

Por eso este archivo existe.
