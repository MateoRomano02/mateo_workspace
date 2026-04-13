# Workspace System Scaffolding Plan

> **For the implementing agent:** This plan is intentionally detailed and assumes zero prior context. Follow it phase-by-phase, keep state on disk, and do not skip audit gates.

**Goal:** Build the first solid scaffolding for a personal workspace system that acts as a second brain, agent operating system, multi-repository context layer, and future product foundation.

**Architecture intent:** Start with a local-first, repo-centered control plane that can later expand into a background service, web dashboard, and selective cloud integrations. The system must preserve context, support low-cost/free LLM workflows, respect context boundaries between personal and external/work repos, and remain auditable.

**Primary design constraints:**

- The system must not depend on a single paid tool.
- The system must support gradual automation, not “all magic on day one.”
- The system must preserve human-readable source-of-truth documents.
- The system must be safe to use alongside external/private/company repositories.
- The system must be able to surface “where each project stands” with recent work and next actions.
- The implementation must respect the frozen decisions in `docs/decisiones-arquitectonicas-v1.md` unless the user explicitly reopens them.

**Current strategic documents to treat as source of truth:**

- `docs/objetivo-workspace-personal.md`
- `docs/registro-ideas-workspace.md`
- `docs/informe-recursos-ai-agentes.md`
- `docs/manual-operativo-skills.md`
- `docs/decisiones-arquitectonicas-v1.md`

**Verified available skills in the current environment:**

- `@writing-plans`
- `@concise-planning`
- `@planning-with-files`
- `@documentation`
- `@wiki-architect`
- `@obsidian-markdown`
- `@obsidian-cli`
- `@bdistill-knowledge-extraction`
- `@context-management-context-restore`
- `@claude-code-expert`
- `@lint-and-validate`
- `@vibe-code-auditor`

**How to invoke skills in Cursor/Antigravity style:**

```text
@skill-name <task>
```

Example:

```text
@planning-with-files create persistent plan files for this repository
```

---

## 0. Operating rules for the implementing agent

1. Use `@planning-with-files` before any substantial work.
2. Keep a persistent `task_plan.md`, `findings.md`, and `progress.md` in the project root while implementing.
3. Use `@writing-plans` whenever a phase expands beyond a simple change.
4. Use `@lint-and-validate` after every code/config change.
5. Use `@vibe-code-auditor` before calling any phase “done.”
6. Do not introduce automation that merges personal and external/company contexts by default.
7. Prefer reversible, inspectable, text-first mechanisms over opaque magic.
8. Every automation must have a manual fallback path.

---

## 1. Scope of this scaffolding phase

### In scope

- Define the repository structure for the workspace system.
- Define the source-of-truth model for notes, projects, decisions, and resource ingestion.
- Define how global context, project context, and restricted/external context are separated.
- Define the first dashboard data model and first morning briefing pipeline.
- Define the first “new project bootstrap” flow.
- Define the first “new resource ingestion” flow.
- Define the first low-cost model routing strategy.
- Define the first integration contract for Obsidian.
- Define the first integration contract for multi-repository tracking.
- Define all core configuration files the repo will eventually need.

### Out of scope for this phase

- Final production UI polish.
- Full OpenClaw deployment.
- Full Ruflo adoption.
- Fully autonomous scraping of trending repositories.
- Production-grade cloud backend.
- Health/finance sensitive-data implementation.

---

## 2. Desired end state of Phase A

At the end of this scaffolding phase, the repository should be ready to become:

1. A **control plane** for personal/project context.
2. A **vault host** or vault-adjacent hub for Obsidian-compatible notes.
3. A **launcher point** for future child-project bootstrapping.
4. A **registry** of tracked repositories, resources, investigations, and next steps.
5. A **safe context broker** that can later feed different agents without leaking unrelated information.
6. A **dashboard-ready data source**, even if the dashboard is not complete yet.

---

## 3. Core architectural decisions to make explicitly

The implementing agent must produce explicit decisions for each item below, not implicit assumptions.

### 3.1 Vault placement

Decide and document one of these:

- **Option A:** Vault lives inside this repository.
- **Option B:** Vault lives in a sibling directory, but this repo indexes it.
- **Option C:** Hybrid layout: safe/public/project-operational notes in this repo, highly sensitive notes elsewhere.

**Recommended current default:** Option C.

Why:

- It preserves the repo as the operational hub.
- It allows versioned, shareable, agent-friendly notes in-repo.
- It leaves room for future private layers without contaminating external repos.

### 3.2 Context boundaries

The system must define at least three context classes:

- **Global context:** identity, long-term goals, active initiatives, tooling preferences, strategic notes.
- **Project context:** repo-specific notes, architecture, decisions, open tasks, recent work, next steps.
- **Restricted context:** personal-sensitive, employer-sensitive, or non-portable information that must never be auto-injected broadly.

### 3.3 Repository relationship model

The system must be able to represent:

- a workspace repo as the root;
- tracked child repos;
- resource repos;
- inspiration/reference repos;
- external repos with read-only metadata;
- future “do not inject” repos.

### 3.4 Memory model

The system should treat memory as layered:

- **Human memory on disk:** markdown notes, project summaries, decisions.
- **Agent startup memory:** `CLAUDE.md`, rules, per-host config.
- **Session/event memory:** future integration with `claude-mem` or equivalent.
- **Visual graph memory:** nodes/edges for dashboard or Obsidian graph.

### 3.5 Cost-routing model

Define the initial policy for:

- “cheap/default” model path
- “high-quality/architecture” model path
- “strict validation” pass
- “context summarization/compression” pass

This policy must be documented, not hidden in prompts.

---

## 4. Repository outputs that this phase should eventually create

The implementing agent should scaffold and/or plan these files and directories, even if some are created in later subphases:

### 4.1 Human-readable brain layer

- `brain/`
- `brain/projects/`
- `brain/resources/`
- `brain/decisions/`
- `brain/daily/`
- `brain/entities/`
- `brain/areas/`
- `brain/inbox/`
- `brain/templates/`

### 4.2 Agent-operating layer

- `CLAUDE.md`
- `.claude/` or equivalent host-specific config directory
- `.mcp.json` or host-appropriate MCP definitions
- future command/rule files

### 4.3 System state / machine-readable layer

- `system/`
- `system/indexes/`
- `system/registries/`
- `system/snapshots/`
- `system/briefings/`
- `system/config/`

### 4.4 Dashboard/API preparation layer

- `apps/` or `dashboard/`
- `data/graph/`
- `data/projects/`
- `data/events/`

### 4.5 Governance and operating docs

- `docs/architecture/`
- `docs/playbooks/`
- `docs/policies/`
- `docs/plans/`

---

## 5. Mandatory skill invocation map by phase

This section is the most important part of the plan. The implementing agent should explicitly invoke these skills while working.

### 5.1 Phase: Plan the scaffolding itself

**Invoke first:**

```text
@planning-with-files create task_plan.md, findings.md, and progress.md for this repository and explain how they should be maintained during execution
```

**Then:**

```text
@writing-plans create a full implementation plan for the workspace system scaffolding using the current docs as the source of truth
```

**Support skill:**

```text
@concise-planning summarize the scaffolding plan into an atomic execution checklist
```

### 5.2 Phase: Define the information architecture

**Use:**

```text
@wiki-architect generate a documentation architecture for this workspace system repository, including onboarding, project tracking, resource ingestion, and dashboard-oriented navigation
```

**Then:**

```text
@documentation define the documentation workflow, templates, and structure for architecture docs, operational docs, and future wiki-style navigation
```

### 5.3 Phase: Design the Obsidian-compatible layer

**Use:**

```text
@obsidian-markdown design the markdown conventions, frontmatter, wikilinks, and note templates for an Obsidian-compatible second brain inside this system
```

**And if Obsidian CLI integration is implemented later:**

```text
@obsidian-cli define how the system should interact with a running Obsidian instance, including read/create/search/update workflows
```

### 5.4 Phase: Ingest resources and external repos

**Use:**

```text
@bdistill-knowledge-extraction define the workflow for taking dense repositories, docs, or trending resources and converting them into structured knowledge entries for this system
```

This skill should be used to define:

- what gets extracted;
- what metadata is stored;
- how quality/relevance is assessed;
- how the system decides whether a resource is worth integrating.

### 5.5 Phase: Claude Code / terminal-first operating mode

**Use:**

```text
@claude-code-expert define the best-practice Claude Code setup for this repository, including CLAUDE.md, rules, MCP strategy, memory strategy, permissions, and future sub-agent structure
```

This must explicitly cover:

- CLI-first workflows;
- startup files;
- MCP loading strategy;
- context boundaries;
- future hooks;
- terminal-first ergonomics.

### 5.6 Phase: Context restoration and bounded memory

**Use:**

```text
@context-management-context-restore design the context restoration strategy for this system, including how to recover project state, how to limit token budgets, and how to avoid overloading active sessions
```

This must cover:

- morning briefing restoration;
- cross-repo context recovery;
- token budget awareness;
- project-level summaries vs raw history.

### 5.7 Phase: Every implementation step after code/config changes

**Always use:**

```text
@lint-and-validate run the correct validation workflow after each implementation step and report what still fails
```

**Before a phase is accepted:**

```text
@vibe-code-auditor audit the current scaffolding implementation for structural fragility, hidden complexity, unsafe defaults, and long-term maintainability risks
```

---

## 6. Detailed execution phases

### Phase 1 — Freeze the system architecture in text

**Objective:** Produce an explicit, auditable architecture before implementing files blindly.

**Deliverables:**

- canonical architecture decision note
- context-layer model
- repo relationship model
- sensitivity model
- model-routing model

**Tasks:**

1. Re-read all existing docs.
2. Extract non-negotiable requirements from them.
3. Decide the initial vault placement strategy.
4. Decide the context boundary model.
5. Decide the “always-on” architecture for MVP:
   - local-first only
   - local + optional background job
   - local + future web overlay
6. Decide what “morning briefing” means concretely.
7. Decide what “tracked repository” means concretely.
8. Decide what “resource worth integrating” means concretely.

**Skills to invoke:**

- `@writing-plans`
- `@planning-with-files`
- `@concise-planning`
- `@wiki-architect`

**Audit gate:**

- No unresolved architectural ambiguity on vault placement, context classes, or host strategy.

---

### Phase 2 — Design the filesystem and document model

**Objective:** Define the exact directory and note model.

**Deliverables:**

- directory tree
- note templates
- frontmatter conventions
- link strategy
- registry file definitions

**Must answer:**

- How does a project note link to a repository note?
- How does a resource note link to a project note?
- How are next steps stored?
- How is “last worked on” stored?
- How is sensitivity classified?

**Target concepts:**

- `project`
- `resource`
- `decision`
- `daily log`
- `briefing`
- `area`
- `entity`
- `repository`

**Skills to invoke:**

- `@obsidian-markdown`
- `@documentation`
- `@wiki-architect`

**Audit gate:**

- A new human or agent should be able to infer where a note belongs without guessing.

---

### Phase 3 — Define the bootstrap flow for new repositories

**Objective:** Make “create a new repo in context” a first-class workflow.

**Deliverables:**

- a playbook for creating a new project/repo from the workspace hub
- required metadata fields for new repos
- future automation contract for repo registration

**The system should eventually support:**

1. User requests a new repo from the workspace hub.
2. The system creates or registers the repo.
3. The system generates the project note(s).
4. The system links the new repo to goals, area, stack, and next actions.
5. The system initializes context files or shared references safely.

**Important constraint:**

- This flow must also support repos that should **not** receive full shared context (company/external/private work).

**Skills to invoke:**

- `@writing-plans`
- `@claude-code-expert`
- `@documentation`

**Audit gate:**

- The bootstrap flow must explicitly distinguish:
  - personal repo
  - experimental repo
  - external/client/company repo

---

### Phase 4 — Define the resource ingestion and evaluation pipeline

**Objective:** Turn scattered links/repos/resources into structured, ranked context.

**Deliverables:**

- ingestion schema
- relevance scoring criteria
- status lifecycle for resources
- future automation plan for trending repo ingestion

**Suggested lifecycle:**

- `captured`
- `distilled`
- `linked`
- `active`
- `archived`
- `rejected`

**The system should eventually support:**

- manual resource capture
- repo README distillation
- later: weekly scraping/monitoring pipeline
- recommendation logic against current goals/projects

**Skills to invoke:**

- `@bdistill-knowledge-extraction`
- `@obsidian-markdown`
- `@documentation`

**Audit gate:**

- Resource ingestion should not create junk by default.

---

### Phase 5 — Define the morning briefing system

**Objective:** Make the system operationally useful every day.

**Deliverables:**

- exact briefing schema
- list of sources feeding the briefing
- rules for “recent activity” vs “next steps”
- future generation workflow

**Minimum morning briefing should answer:**

- What projects changed last?
- What is the current state of each active project?
- What are the next recommended actions?
- What blockers exist?
- What context should be restored first if work resumes?

**Potential inputs:**

- project notes
- progress logs
- git activity
- branch state
- commit history
- commit summaries
- issue/task registries
- session memory summaries

**Skills to invoke:**

- `@context-management-context-restore`
- `@obsidian-markdown`
- `@documentation`

**Audit gate:**

- The briefing must be useful even before full automation exists.

---

### Phase 6 — Define low-cost LLM orchestration policy

**Objective:** Explicitly design the routing philosophy for free/cheap models.

**Deliverables:**

- model selection policy
- cheap-vs-expensive task matrix
- validation policy
- fallback strategy

**Must define:**

- default cheap path
- validation path
- escalation path to stronger model
- token-saving path
- failure recovery path

**Examples of routing classes:**

- `capture/summarize`
- `mechanical scaffolding`
- `validation`
- `architecture`
- `sensitive reasoning`
- `resource triage`

**Skills to invoke:**

- `@concise-planning`
- `@lint-and-validate`
- `@vibe-code-auditor`

**Reference resources:**

- `docs/informe-recursos-ai-agentes.md`
- `docs/manual-operativo-skills.md`

**Audit gate:**

- Cost policy must be written in text and testable by a human.

---

### Phase 7 — Define the dashboard contract before UI work

**Objective:** Avoid building a pretty dashboard with no reliable data model.

**Deliverables:**

- graph node types
- graph edge types
- filters/views
- project page contract
- event feed contract

**Node examples:**

- person
- goal
- project
- repository
- branch
- commit-summary
- resource
- decision
- area
- task
- note

**Edge examples:**

- `supports`
- `belongs_to`
- `derived_from`
- `depends_on`
- `inspired_by`
- `blocked_by`
- `related_to`
- `worked_on_after`
- `branched_from`
- `implemented_in`
- `summarizes`

**Views to define now:**

1. central self/goals/projects graph
2. technical project/repo graph
3. project detail view
4. recent activity / next action panel

**Skills to invoke:**

- `@wiki-architect`
- `@documentation`
- `@obsidian-markdown`

**Audit gate:**

- The dashboard contract must be representable with text files even before any frontend exists.

---

### Phase 8 — Define host strategy and migration path

**Objective:** Decide what is primary now vs later.

**Must explicitly evaluate:**

- Cursor
- Antigravity
- Claude Code
- future OpenClaw

**Recommended preliminary stance based on current goals:**

- **Operational nucleus:** Claude Code / terminal-first philosophy
- **Current practical bridge:** Antigravity/Cursor while exploiting available rate limits
- **Future background layer:** OpenClaw only after the core note/context model exists

**Skills to invoke:**

- `@claude-code-expert`
- `@concise-planning`

**Audit gate:**

- There must be a clearly documented “what to use for what” table.

---

### Phase 8.1 — Define git intelligence and repository evolution tracking

**Objective:** Treat commits and branches as first-class operational signals instead of incidental metadata.

**Deliverables:**

- commit summary contract
- branch status contract
- per-project git digest format
- future merge/PR linkage model

**Must define:**

- how to detect the active branch
- how to summarize recent commits into project state
- how to distinguish “experimental branch” vs “mainline progress”
- how to connect commits to next steps and decisions
- how to avoid over-trusting noisy or low-quality commit messages

**Suggested outputs:**

- `system/briefings/project-<id>.json`
- `system/indexes/git/project-<id>.json`
- optional markdown digest per project

**Skills to invoke:**

- `@documentation`
- `@concise-planning`
- `@writing-plans`

**Audit gate:**

- A human should be able to look at one project and understand: current branch, latest meaningful changes, and likely next actions.

---

## 7. GitHub and configuration files to account for in the plan

The implementing agent must explicitly consider these future artifacts and decide which belong in Phase A vs later:

- `README.md`
- `CLAUDE.md`
- `.gitignore`
- `.gitattributes`
- `.editorconfig`
- `.mcp.json`
- host-specific settings/rules (`.claude/`, `.cursor/`, etc.)
- `package.json` or workspace metadata if a dashboard/app is introduced
- `apps/` app-level config later
- GitHub issue templates
- GitHub labels/project conventions
- CI workflow files
- task/registry files

**Important:** do not blindly create all of them in one burst. Classify them:

- required now
- optional now
- deferred

---

## 8. Validation strategy for the scaffolding implementation

The implementing agent must include validation at multiple levels:

### 8.1 Structural validation

- directory layout is coherent
- docs link to each other correctly
- note templates are internally consistent

### 8.2 Agent-operational validation

- a fresh agent can understand where context lives
- a project note can be located quickly
- a resource can be ingested through a documented path

### 8.3 Cost validation

- the system does not require paid models by default
- expensive reasoning is reserved for the right stages

### 8.4 Risk validation

- no default context leakage into restricted repos
- no assumptions that all repos can receive the same shared context

### 8.5 Quality validation

Use:

```text
@lint-and-validate validate every config and code artifact that is introduced
```

Use:

```text
@vibe-code-auditor audit the scaffolding before closing each major phase
```

---

## 9. Recommended execution order for the next implementing LLM

1. Invoke `@planning-with-files`
2. Invoke `@writing-plans`
3. Create/refresh execution files on disk
4. Freeze architecture decisions
5. Define filesystem and note schemas
6. Define repo bootstrap workflow
7. Define resource ingestion workflow
8. Define morning briefing contract
9. Define low-cost model routing policy
10. Define dashboard data contract
11. Define host strategy and migration path
12. Run validation and audit

---

## 10. Copy-paste prompt block for the next LLM

```text
Use @planning-with-files first and create persistent planning files in this repository.

Then use @writing-plans to create an execution-ready implementation plan for the workspace system scaffolding, using these source-of-truth documents:
- docs/objetivo-workspace-personal.md
- docs/registro-ideas-workspace.md
- docs/informe-recursos-ai-agentes.md
- docs/manual-operativo-skills.md
- docs/plan-scaffolding-workspace-system.md

The plan must preserve:
- second brain architecture
- Obsidian-compatible notes
- multi-repo tracking
- bounded/shared/restricted context layers
- low-cost/free LLM routing
- future dashboard graph model
- future OpenClaw compatibility
- strict validation and audit loops

During implementation, explicitly invoke these skills when relevant:
- @concise-planning
- @documentation
- @wiki-architect
- @obsidian-markdown
- @obsidian-cli
- @bdistill-knowledge-extraction
- @context-management-context-restore
- @claude-code-expert
- @lint-and-validate
- @vibe-code-auditor

Do not skip audit gates. Do not flatten personal and restricted contexts. Prefer auditable text-first scaffolding before automation.
```

---

## 11. Completion criteria for this scaffolding phase

This phase is successful only if all of the following are true:

- The repository has a clear architecture for notes, system state, and future dashboard data.
- The context model explicitly separates global, project, and restricted scopes.
- New repositories can be onboarded through a documented flow.
- New resources can be ingested through a documented flow.
- Morning briefing data is definable from repository state.
- A cheap/default model policy exists in writing.
- The implementing agent used the verified skills intentionally, not decoratively.
- The result is understandable by a fresh agent and a future human collaborator.

---

## 12. Non-negotiable warning

The biggest failure mode is not “missing a fancy feature.”

The biggest failure mode is:

- over-automating too early,
- mixing sensitive and non-sensitive context,
- creating too many files without a retrieval model,
- and building a dashboard before the data contract is real.

This plan should prevent that.
