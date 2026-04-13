import {
  classifyBranchLane,
  type GraphEdge,
  type GraphNode,
  type ProjectGitDigest,
  type ResourceSummary,
  type RepositorySummary,
  type UserContextProfile,
  type WorkspaceBriefing,
  type WorkspaceEvent,
  type WorkspaceGraphSnapshot,
  type WorkspaceStateSnapshot,
  validateWorkspaceSnapshot,
} from '../../../shared/types/workspace'
import type { ProjectSummary } from '../../../shared/types/workspace'

export interface WorkspaceCoreState {
  profile: UserContextProfile
  repositories: Omit<RepositorySummary, 'activeBranchLane'>[]
  projects: ProjectSummary[]
  resources: ResourceSummary[]
  events: WorkspaceEvent[]
}

function buildProjectDigests(
  projects: ProjectSummary[],
  repositories: RepositorySummary[],
): ProjectGitDigest[] {
  return projects
    .map((project) => {
      const repository = repositories.find(
        (candidate) => candidate.id === project.repositoryId,
      )
      if (!repository) {
        return null
      }

      const blockers = project.nextSteps
        .filter((nextStep) => nextStep.isBlocked)
        .map((nextStep) => nextStep.text)

      const highestPriorityUnblockedStep = project.nextSteps.find(
        (nextStep) => nextStep.priority === 'high' && !nextStep.isBlocked,
      )

      return {
        projectId: project.id,
        repositoryId: repository.id,
        branchName: repository.activeBranch.name,
        branchLane: repository.activeBranchLane,
        lastCommitSha: repository.lastCommit.sha,
        lastCommitMessage: repository.lastCommit.message,
        blockers,
        recommendedNextAction:
          highestPriorityUnblockedStep?.text ??
          'Review project state and define the next concrete step.',
      }
    })
    .filter((digest): digest is ProjectGitDigest => digest !== null)
}

function buildBriefing(
  repositories: RepositorySummary[],
  projects: ProjectSummary[],
  resources: ResourceSummary[],
  events: WorkspaceEvent[],
  digests: ProjectGitDigest[],
): WorkspaceBriefing {
  const activeProjects = projects.filter(
    (project) => project.status === 'active',
  )
  const experimentalBranchesAhead = repositories.filter(
    (repository) =>
      repository.activeBranchLane === 'experimental' &&
      repository.activeBranch.aheadBy > 0,
  )
  const blockers = digests.flatMap((digest) => digest.blockers)
  const criticalEvents = events.filter((event) => event.severity === 'critical')
  const activeResources = resources.filter(
    (resource) => resource.status === 'active',
  )

  const urgentActions: string[] = []
  if (blockers.length > 0) {
    urgentActions.push(`Resolve ${blockers.length} blocked next steps.`)
  }
  if (criticalEvents.length > 0) {
    urgentActions.push(
      `Review ${criticalEvents.length} critical events from recent activity.`,
    )
  }
  if (experimentalBranchesAhead.length > 0) {
    urgentActions.push(
      `${experimentalBranchesAhead.length} experimental branches are ahead and may need merge planning.`,
    )
  }
  if (activeResources.length === 0) {
    urgentActions.push(
      'No active resources are linked yet. Distill and activate at least one key resource.',
    )
  }

  if (urgentActions.length === 0) {
    urgentActions.push(
      'No urgent blockers detected. Continue planned execution.',
    )
  }

  const headline = `${activeProjects.length} active projects, ${experimentalBranchesAhead.length} experimental branches ahead, ${blockers.length} blockers detected, ${activeResources.length} active resources.`

  return {
    generatedAt: new Date().toISOString(),
    headline,
    urgentActions,
  }
}

function buildGraphSnapshot(
  profile: UserContextProfile,
  repositories: RepositorySummary[],
  projects: ProjectSummary[],
  resources: ResourceSummary[],
): WorkspaceGraphSnapshot {
  const nodes: GraphNode[] = [
    { id: profile.id, type: 'person', label: profile.displayName },
    ...projects.map((project) => ({
      id: project.id,
      type: 'project' as const,
      label: project.name,
    })),
    ...repositories.map((repository) => ({
      id: repository.id,
      type: 'repository' as const,
      label: repository.name,
    })),
    ...resources.map((resource) => ({
      id: resource.id,
      type: 'resource' as const,
      label: resource.title,
    })),
    ...profile.institutions.map((institution) => ({
      id: `institution-${institution.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'institution' as const,
      label: institution,
    })),
    ...profile.skills.map((skill) => ({
      id: `skill-${skill.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'skill' as const,
      label: skill,
    })),
  ]

  const edges: GraphEdge[] = [
    ...projects.map((project) => ({
      id: `edge-person-project-${project.id}`,
      sourceId: profile.id,
      targetId: project.id,
      relation: 'supports' as const,
    })),
    ...projects.map((project) => ({
      id: `edge-project-repository-${project.id}`,
      sourceId: project.id,
      targetId: project.repositoryId,
      relation: 'implemented_in' as const,
    })),
    ...resources.flatMap((resource) =>
      resource.linkedProjectIds.map((linkedProjectId) => ({
        id: `edge-resource-project-${resource.id}-${linkedProjectId}`,
        sourceId: resource.id,
        targetId: linkedProjectId,
        relation: 'inspired_by' as const,
      })),
    ),
    ...profile.institutions.map((institution) => ({
      id: `edge-person-institution-${institution.toLowerCase().replace(/\s+/g, '-')}`,
      sourceId: profile.id,
      targetId: `institution-${institution.toLowerCase().replace(/\s+/g, '-')}`,
      relation: 'belongs_to' as const,
    })),
    ...profile.skills.map((skill) => ({
      id: `edge-person-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`,
      sourceId: profile.id,
      targetId: `skill-${skill.toLowerCase().replace(/\s+/g, '-')}`,
      relation: 'related_to' as const,
    })),
  ]

  return { nodes, edges }
}

export function deriveWorkspaceSnapshot(
  coreState: WorkspaceCoreState,
): WorkspaceStateSnapshot {
  const repositories: RepositorySummary[] = coreState.repositories.map(
    (repository) => ({
      ...repository,
      activeBranchLane: classifyBranchLane(repository.activeBranch),
    }),
  )

  const projectDigests = buildProjectDigests(coreState.projects, repositories)
  const briefing = buildBriefing(
    repositories,
    coreState.projects,
    coreState.resources,
    coreState.events,
    projectDigests,
  )
  const graph = buildGraphSnapshot(
    coreState.profile,
    repositories,
    coreState.projects,
    coreState.resources,
  )

  return validateWorkspaceSnapshot({
    profile: coreState.profile,
    repositories,
    projects: coreState.projects,
    resources: coreState.resources,
    events: coreState.events,
    projectDigests,
    briefing,
    graph,
  })
}
