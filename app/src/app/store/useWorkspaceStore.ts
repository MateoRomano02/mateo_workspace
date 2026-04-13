import { create } from 'zustand'
import { workspaceCoreState } from '../../features/dashboard/data/workspaceMock'
import {
  deriveWorkspaceSnapshot,
  type WorkspaceCoreState,
} from '../../features/dashboard/lib/deriveWorkspaceSnapshot'
import { loadWorkspaceCoreState } from '../../features/dashboard/lib/loadWorkspaceCoreState'
import type {
  ProjectSummary,
  WorkspaceSensitivityLevel,
  WorkspaceStateSnapshot,
} from '../../shared/types/workspace'

interface CreateProjectInput {
  name: string
  repositoryName: string
  sensitivity: WorkspaceSensitivityLevel
}

interface WorkspaceState {
  coreState: WorkspaceCoreState
  snapshot: WorkspaceStateSnapshot
  dataSource: 'mock' | 'runtime'
  setSnapshot: (nextSnapshot: WorkspaceStateSnapshot) => void
  loadRuntimeSnapshot: () => Promise<void>
  createProject: (input: CreateProjectInput) => void
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  coreState: workspaceCoreState,
  snapshot: deriveWorkspaceSnapshot(workspaceCoreState),
  dataSource: 'mock',
  setSnapshot: (nextSnapshot) => set({ snapshot: nextSnapshot }),
  loadRuntimeSnapshot: async () => {
    const runtimeCoreState = await loadWorkspaceCoreState()
    if (!runtimeCoreState) {
      return
    }

    try {
      set({
        coreState: runtimeCoreState,
        snapshot: deriveWorkspaceSnapshot(runtimeCoreState),
        dataSource: 'runtime',
      })
    } catch (error) {
      console.error('Failed to load runtime workspace snapshot:', error)
    }
  },
  createProject: (input) =>
    set((state) => {
      const now = new Date().toISOString()
      const projectId = `project-${crypto.randomUUID()}`
      const repositoryId = `repo-${crypto.randomUUID()}`

      const newProject: ProjectSummary = {
        id: projectId,
        name: input.name,
        status: 'active',
        sensitivity: input.sensitivity,
        repositoryId,
        nextSteps: [
          {
            id: `step-${crypto.randomUUID()}`,
            text: 'Define initial architecture and first executable milestone.',
            priority: 'high',
            isBlocked: false,
          },
        ],
      }

      const nextCoreState: WorkspaceCoreState = {
        profile: state.coreState.profile,
        repositories: [
          ...state.coreState.repositories,
          {
            id: repositoryId,
            name: input.repositoryName,
            visibility: 'private',
            activeBranch: {
              name: 'main',
              isDefault: true,
              aheadBy: 0,
              behindBy: 0,
            },
            lastCommit: {
              sha: '0000000',
              message: 'chore: repository registered in workspace system',
              authoredAt: now,
              changedFiles: 0,
              category: 'chore',
            },
          },
        ],
        projects: [...state.coreState.projects, newProject],
        resources: state.coreState.resources,
        events: [
          ...state.coreState.events,
          {
            id: `event-${crypto.randomUUID()}`,
            type: 'repo-registered',
            occurredAt: now,
            summary: `Repository ${input.repositoryName} registered from dashboard flow.`,
            severity: 'info',
            repositoryId,
            projectId,
          },
          {
            id: `event-${crypto.randomUUID()}`,
            type: 'next-step-updated',
            occurredAt: now,
            summary: `Initial next step created for project ${input.name}.`,
            severity: 'info',
            repositoryId,
            projectId,
          },
        ],
      }

      return {
        coreState: nextCoreState,
        snapshot: deriveWorkspaceSnapshot(nextCoreState),
        dataSource: state.dataSource,
      }
    }),
}))
