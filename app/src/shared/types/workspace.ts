import { z } from 'zod'

export const WORKSPACE_SENSITIVITY_LEVELS = [
  'global-safe',
  'project-safe',
  'restricted-personal',
  'restricted-employer',
  'highly-sensitive',
] as const

export type WorkspaceSensitivityLevel =
  (typeof WORKSPACE_SENSITIVITY_LEVELS)[number]

export const WORKSPACE_EVENT_TYPES = [
  'repo-registered',
  'repo-imported',
  'repo-updated',
  'branch-created',
  'branch-switched',
  'branch-merged',
  'commit-captured',
  'commit-summarized',
  'resource-captured',
  'resource-distilled',
  'note-created',
  'decision-recorded',
  'next-step-updated',
  'briefing-generated',
  'context-restored',
] as const

export type WorkspaceEventType = (typeof WORKSPACE_EVENT_TYPES)[number]
export type BranchLane = 'mainline' | 'experimental'
export type GraphNodeType =
  | 'person'
  | 'project'
  | 'repository'
  | 'resource'
  | 'institution'
  | 'skill'

export interface BranchStatus {
  name: string
  isDefault: boolean
  aheadBy: number
  behindBy: number
}

export interface CommitSummary {
  sha: string
  message: string
  authoredAt: string
  changedFiles: number
  category: 'feat' | 'fix' | 'docs' | 'refactor' | 'chore'
}

export interface RepositorySummary {
  id: string
  name: string
  visibility: 'private' | 'public'
  activeBranch: BranchStatus
  activeBranchLane: BranchLane
  lastCommit: CommitSummary
}

export interface NextStep {
  id: string
  text: string
  priority: 'high' | 'medium' | 'low'
  isBlocked: boolean
}

export interface ProjectSummary {
  id: string
  name: string
  status: 'active' | 'paused' | 'backlog'
  sensitivity: WorkspaceSensitivityLevel
  repositoryId: string
  nextSteps: NextStep[]
}

export interface WorkspaceBriefing {
  generatedAt: string
  headline: string
  urgentActions: string[]
}

export interface UserContextProfile {
  id: string
  displayName: string
  headline: string
  currentFocus: string[]
  skills: string[]
  institutions: string[]
}

export interface ResourceSummary {
  id: string
  title: string
  url: string
  category: 'tool' | 'repository' | 'article' | 'video'
  status:
    | 'captured'
    | 'distilled'
    | 'linked'
    | 'active'
    | 'archived'
    | 'rejected'
  linkedProjectIds: string[]
}

export interface GraphNode {
  id: string
  type: GraphNodeType
  label: string
}

export interface GraphEdge {
  id: string
  sourceId: string
  targetId: string
  relation:
    | 'supports'
    | 'belongs_to'
    | 'implemented_in'
    | 'related_to'
    | 'inspired_by'
}

export interface WorkspaceGraphSnapshot {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface WorkspaceEvent {
  id: string
  type: WorkspaceEventType
  occurredAt: string
  summary: string
  severity: 'info' | 'warning' | 'critical'
  projectId?: string
  repositoryId?: string
}

export interface ProjectGitDigest {
  projectId: string
  repositoryId: string
  branchName: string
  branchLane: BranchLane
  lastCommitSha: string
  lastCommitMessage: string
  blockers: string[]
  recommendedNextAction: string
}

export interface WorkspaceStateSnapshot {
  profile: UserContextProfile
  repositories: RepositorySummary[]
  projects: ProjectSummary[]
  resources: ResourceSummary[]
  events: WorkspaceEvent[]
  projectDigests: ProjectGitDigest[]
  briefing: WorkspaceBriefing
  graph: WorkspaceGraphSnapshot
}

export function classifyBranchLane(
  branch: Pick<BranchStatus, 'name' | 'isDefault'>,
) {
  const normalizedName = branch.name.trim().toLowerCase()
  if (branch.isDefault) {
    return 'mainline'
  }

  const mainlinePrefixes = ['main', 'master', 'develop', 'release', 'hotfix']
  const matchesMainline = mainlinePrefixes.some(
    (prefix) =>
      normalizedName === prefix || normalizedName.startsWith(`${prefix}/`),
  )

  return matchesMainline ? 'mainline' : 'experimental'
}

const branchStatusSchema = z.object({
  name: z.string().min(1),
  isDefault: z.boolean(),
  aheadBy: z.number().int().min(0),
  behindBy: z.number().int().min(0),
})

const commitSummarySchema = z.object({
  sha: z.string().min(7),
  message: z.string().min(3),
  authoredAt: z.string().datetime(),
  changedFiles: z.number().int().min(0),
  category: z.enum(['feat', 'fix', 'docs', 'refactor', 'chore']),
})

const repositorySummarySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  visibility: z.enum(['private', 'public']),
  activeBranch: branchStatusSchema,
  activeBranchLane: z.enum(['mainline', 'experimental']),
  lastCommit: commitSummarySchema,
})

const nextStepSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(3),
  priority: z.enum(['high', 'medium', 'low']),
  isBlocked: z.boolean(),
})

const projectSummarySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  status: z.enum(['active', 'paused', 'backlog']),
  sensitivity: z.enum(WORKSPACE_SENSITIVITY_LEVELS),
  repositoryId: z.string().min(1),
  nextSteps: z.array(nextStepSchema),
})

const workspaceBriefingSchema = z.object({
  generatedAt: z.string().datetime(),
  headline: z.string().min(5),
  urgentActions: z.array(z.string().min(5)),
})

const userContextProfileSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(2),
  headline: z.string().min(3),
  currentFocus: z.array(z.string().min(2)),
  skills: z.array(z.string().min(2)),
  institutions: z.array(z.string().min(2)),
})

const resourceSummarySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  url: z.string().url(),
  category: z.enum(['tool', 'repository', 'article', 'video']),
  status: z.enum([
    'captured',
    'distilled',
    'linked',
    'active',
    'archived',
    'rejected',
  ]),
  linkedProjectIds: z.array(z.string().min(1)),
})

const workspaceEventSchema = z.object({
  id: z.string().min(1),
  type: z.enum(WORKSPACE_EVENT_TYPES),
  occurredAt: z.string().datetime(),
  summary: z.string().min(5),
  severity: z.enum(['info', 'warning', 'critical']),
  projectId: z.string().min(1).optional(),
  repositoryId: z.string().min(1).optional(),
})

const projectGitDigestSchema = z.object({
  projectId: z.string().min(1),
  repositoryId: z.string().min(1),
  branchName: z.string().min(1),
  branchLane: z.enum(['mainline', 'experimental']),
  lastCommitSha: z.string().min(7),
  lastCommitMessage: z.string().min(3),
  blockers: z.array(z.string().min(3)),
  recommendedNextAction: z.string().min(5),
})

const graphNodeSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    'person',
    'project',
    'repository',
    'resource',
    'institution',
    'skill',
  ]),
  label: z.string().min(1),
})

const graphEdgeSchema = z.object({
  id: z.string().min(1),
  sourceId: z.string().min(1),
  targetId: z.string().min(1),
  relation: z.enum([
    'supports',
    'belongs_to',
    'implemented_in',
    'related_to',
    'inspired_by',
  ]),
})

const workspaceGraphSnapshotSchema = z.object({
  nodes: z.array(graphNodeSchema),
  edges: z.array(graphEdgeSchema),
})

const workspaceSnapshotSchema = z.object({
  profile: userContextProfileSchema,
  repositories: z.array(repositorySummarySchema),
  projects: z.array(projectSummarySchema),
  resources: z.array(resourceSummarySchema),
  events: z.array(workspaceEventSchema),
  projectDigests: z.array(projectGitDigestSchema),
  briefing: workspaceBriefingSchema,
  graph: workspaceGraphSnapshotSchema,
})

export function validateWorkspaceSnapshot(
  payload: unknown,
): WorkspaceStateSnapshot {
  return workspaceSnapshotSchema.parse(payload)
}
