import type { WorkspaceCoreState } from './deriveWorkspaceSnapshot'

export async function loadWorkspaceCoreState(): Promise<WorkspaceCoreState | null> {
  try {
    const response = await fetch('/data/workspace-core-state.json', {
      cache: 'no-store',
    })
    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as WorkspaceCoreState
    return payload
  } catch {
    return null
  }
}
