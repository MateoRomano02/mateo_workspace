import { useMemo, useState } from 'react'
import { useEffect } from 'react'
import { useWorkspaceStore } from '../../../app/store/useWorkspaceStore'
import {
  WORKSPACE_SENSITIVITY_LEVELS,
  type WorkspaceSensitivityLevel,
} from '../../../shared/types/workspace'

type DashboardView = 'overview' | 'projects' | 'events' | 'new-project'
type ExtendedDashboardView = DashboardView | 'context' | 'resources' | 'graph'

export function DashboardHomePage() {
  const snapshot = useWorkspaceStore((state) => state.snapshot)
  const dataSource = useWorkspaceStore((state) => state.dataSource)
  const loadRuntimeSnapshot = useWorkspaceStore(
    (state) => state.loadRuntimeSnapshot,
  )
  const createProject = useWorkspaceStore((state) => state.createProject)
  const [activeView, setActiveView] =
    useState<ExtendedDashboardView>('overview')
  const [projectName, setProjectName] = useState('')
  const [repositoryName, setRepositoryName] = useState('')
  const [sensitivity, setSensitivity] =
    useState<WorkspaceSensitivityLevel>('project-safe')

  const activeProjects = snapshot.projects.filter(
    (project) => project.status === 'active',
  )
  const trackedRepositories = snapshot.repositories.length
  const trackedResources = snapshot.resources.length
  const activeBranchWithDivergence = snapshot.repositories.find(
    (repository) => repository.activeBranch.aheadBy > 0,
  )
  const recentEvents = snapshot.events.slice(-3).reverse()
  const navigationItems = useMemo(
    () =>
      [
        { id: 'overview', label: 'Overview' },
        { id: 'context', label: 'Context profile' },
        { id: 'projects', label: 'Projects' },
        { id: 'resources', label: 'Resources' },
        { id: 'events', label: 'Events' },
        { id: 'graph', label: 'Graph' },
        { id: 'new-project', label: 'New project' },
      ] satisfies Array<{ id: ExtendedDashboardView; label: string }>,
    [],
  )

  useEffect(() => {
    void loadRuntimeSnapshot()
  }, [loadRuntimeSnapshot])

  function handleCreateProject() {
    const normalizedProjectName = projectName.trim()
    const normalizedRepositoryName = repositoryName.trim()
    if (!normalizedProjectName || !normalizedRepositoryName) {
      return
    }

    createProject({
      name: normalizedProjectName,
      repositoryName: normalizedRepositoryName,
      sensitivity,
    })
    setProjectName('')
    setRepositoryName('')
    setSensitivity('project-safe')
    setActiveView('projects')
  }

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[260px_1fr] md:p-8">
      <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/65 p-5">
        <p className="text-xs uppercase tracking-wide text-violet-300">
          Workspace OS
        </p>
        <h1 className="mt-2 text-xl font-semibold text-zinc-100">
          Control panel
        </h1>
        <p className="mt-1 text-xs text-zinc-500">Data source: {dataSource}</p>
        <nav className="mt-6 flex flex-col gap-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
              className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                activeView === item.id
                  ? 'bg-violet-500/20 text-violet-100'
                  : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/55 p-5 md:p-7">
        {activeView === 'overview' ? (
          <div className="space-y-4">
            <header className="space-y-2">
              <h2 className="text-2xl font-semibold text-zinc-100">Overview</h2>
              <p className="text-sm text-zinc-400">
                {snapshot.briefing.headline}
              </p>
            </header>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <article className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Active projects
                </p>
                <p className="mt-2 text-3xl font-semibold text-zinc-100">
                  {activeProjects.length}
                </p>
              </article>
              <article className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Tracked repositories
                </p>
                <p className="mt-2 text-3xl font-semibold text-zinc-100">
                  {trackedRepositories}
                </p>
              </article>
              <article className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Tracked resources
                </p>
                <p className="mt-2 text-3xl font-semibold text-zinc-100">
                  {trackedResources}
                </p>
              </article>
            </div>

            <article className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Urgent actions
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                {snapshot.briefing.urgentActions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </article>

            {activeBranchWithDivergence ? (
              <article className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Branch signal
                </p>
                <p className="mt-2 text-sm text-zinc-300">
                  {activeBranchWithDivergence.name} on{' '}
                  {activeBranchWithDivergence.activeBranch.name} (
                  {activeBranchWithDivergence.activeBranchLane}) ahead by{' '}
                  {activeBranchWithDivergence.activeBranch.aheadBy} commits.
                </p>
              </article>
            ) : null}
          </div>
        ) : null}

        {activeView === 'context' ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              Context profile
            </h2>
            <article className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
              <p className="text-sm font-semibold text-zinc-200">
                {snapshot.profile.displayName}
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                {snapshot.profile.headline}
              </p>
              <p className="mt-3 text-xs uppercase tracking-wide text-zinc-500">
                Current focus
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                {snapshot.profile.currentFocus.map((focusItem) => (
                  <li key={focusItem}>{focusItem}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs uppercase tracking-wide text-zinc-500">
                Skills
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                {snapshot.profile.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs uppercase tracking-wide text-zinc-500">
                Institutions
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                {snapshot.profile.institutions.map((institution) => (
                  <li key={institution}>{institution}</li>
                ))}
              </ul>
            </article>
          </div>
        ) : null}

        {activeView === 'projects' ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">Projects</h2>
            <ul className="space-y-3">
              {snapshot.projectDigests.map((digest) => (
                <li
                  key={digest.projectId}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4"
                >
                  <p className="text-sm font-semibold text-zinc-200">
                    {digest.projectId}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Branch: {digest.branchName} ({digest.branchLane})
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Next: {digest.recommendedNextAction}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {activeView === 'events' ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">Events</h2>
            <ul className="space-y-3">
              {recentEvents.map((event) => (
                <li
                  key={event.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4"
                >
                  <p className="text-sm font-semibold text-zinc-200">
                    {event.type} - {event.severity}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">{event.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {activeView === 'resources' ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">Resources</h2>
            <ul className="space-y-3">
              {snapshot.resources.map((resource) => (
                <li
                  key={resource.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4"
                >
                  <p className="text-sm font-semibold text-zinc-200">
                    {resource.title}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {resource.category} - {resource.status}
                  </p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-xs text-violet-300 hover:text-violet-200"
                  >
                    Open resource
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {activeView === 'graph' ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              Graph contract preview
            </h2>
            <article className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
              <p className="text-sm text-zinc-300">
                Nodes: {snapshot.graph.nodes.length} - Edges:{' '}
                {snapshot.graph.edges.length}
              </p>
              <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">
                Sample edges
              </p>
              <ul className="mt-1 space-y-1 text-sm text-zinc-400">
                {snapshot.graph.edges.slice(0, 8).map((edge) => (
                  <li key={edge.id}>
                    {edge.sourceId} --{edge.relation}--&gt; {edge.targetId}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        ) : null}

        {activeView === 'new-project' ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              New project flow
            </h2>
            <p className="text-sm text-zinc-400">
              Create a project and register its repository in one action.
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wide text-zinc-500">
                  Project name
                </span>
                <input
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-400"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wide text-zinc-500">
                  Repository name
                </span>
                <input
                  value={repositoryName}
                  onChange={(event) => setRepositoryName(event.target.value)}
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-400"
                />
              </label>
            </div>

            <label className="flex max-w-xs flex-col gap-1">
              <span className="text-xs uppercase tracking-wide text-zinc-500">
                Sensitivity
              </span>
              <select
                value={sensitivity}
                onChange={(event) =>
                  setSensitivity(
                    event.target.value as WorkspaceSensitivityLevel,
                  )
                }
                className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-400"
              >
                {WORKSPACE_SENSITIVITY_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={handleCreateProject}
              className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-zinc-50 hover:bg-violet-400"
            >
              Create project
            </button>
          </div>
        ) : null}
      </section>
    </main>
  )
}
