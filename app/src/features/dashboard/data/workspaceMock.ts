import {
  type WorkspaceEvent,
  type WorkspaceStateSnapshot,
} from '../../../shared/types/workspace'
import {
  deriveWorkspaceSnapshot,
  type WorkspaceCoreState,
} from '../lib/deriveWorkspaceSnapshot'

const events: WorkspaceEvent[] = [
  {
    id: 'event-1',
    type: 'repo-registered',
    occurredAt: '2026-04-12T18:15:00.000Z',
    summary: 'Repository personal_workspace registered in workspace hub.',
    severity: 'info',
    repositoryId: 'repo-workspace',
  },
  {
    id: 'event-2',
    type: 'commit-summarized',
    occurredAt: '2026-04-13T15:35:00.000Z',
    summary: 'Latest workspace commit summarized for briefing generation.',
    severity: 'info',
    repositoryId: 'repo-workspace',
    projectId: 'project-core-workspace',
  },
  {
    id: 'event-3',
    type: 'next-step-updated',
    occurredAt: '2026-04-13T15:45:00.000Z',
    summary: 'Project next steps updated after architecture implementation.',
    severity: 'warning',
    projectId: 'project-core-workspace',
  },
]

export const workspaceCoreState: WorkspaceCoreState = {
  profile: {
    id: 'person-mateo',
    displayName: 'Mateo Romano',
    headline:
      'Builder focused on AI-powered workflows and second-brain systems.',
    currentFocus: [
      'Workspace system architecture',
      'Git intelligence for project context',
      'Low-cost model orchestration',
    ],
    skills: ['TypeScript', 'React', 'AI tooling', 'System design'],
    institutions: ['Personal Lab'],
  },
  repositories: [
    {
      id: 'repo-workspace',
      name: 'personal_workspace',
      visibility: 'private',
      activeBranch: {
        name: 'main',
        isDefault: true,
        aheadBy: 2,
        behindBy: 0,
      },
      lastCommit: {
        sha: 'a91f3c2',
        message: 'feat: bootstrap workspace app and base architecture',
        authoredAt: '2026-04-13T15:30:00.000Z',
        changedFiles: 14,
        category: 'feat',
      },
    },
    {
      id: 'repo-dashboard',
      name: 'workspace_dashboard_experiments',
      visibility: 'private',
      activeBranch: {
        name: 'feat/graph-contract-v1',
        isDefault: false,
        aheadBy: 5,
        behindBy: 1,
      },
      lastCommit: {
        sha: 'ce44fa8',
        message: 'chore: define graph node and edge contract draft',
        authoredAt: '2026-04-12T21:40:00.000Z',
        changedFiles: 4,
        category: 'chore',
      },
    },
  ],
  projects: [
    {
      id: 'project-core-workspace',
      name: 'Workspace Core System',
      status: 'active',
      sensitivity: 'global-safe',
      repositoryId: 'repo-workspace',
      nextSteps: [
        {
          id: 'step-1',
          text: 'Close event model v1 and map to state contracts',
          priority: 'high',
          isBlocked: false,
        },
        {
          id: 'step-2',
          text: 'Implement morning briefing panel from repository digest',
          priority: 'high',
          isBlocked: true,
        },
      ],
    },
    {
      id: 'project-context-bounds',
      name: 'Context Boundary Policy',
      status: 'active',
      sensitivity: 'restricted-personal',
      repositoryId: 'repo-workspace',
      nextSteps: [
        {
          id: 'step-3',
          text: 'Define repo-level injection policy for external projects',
          priority: 'medium',
          isBlocked: false,
        },
      ],
    },
  ],
  resources: [
    {
      id: 'resource-antigravity-skills',
      title: 'antigravity-awesome-skills',
      url: 'https://github.com/sickn33/antigravity-awesome-skills',
      category: 'repository',
      status: 'active',
      linkedProjectIds: ['project-core-workspace'],
    },
    {
      id: 'resource-obsidian',
      title: 'Obsidian',
      url: 'https://obsidian.md/',
      category: 'tool',
      status: 'linked',
      linkedProjectIds: ['project-core-workspace'],
    },
  ],
  events,
}

export const workspaceSnapshot: WorkspaceStateSnapshot =
  deriveWorkspaceSnapshot(workspaceCoreState)
