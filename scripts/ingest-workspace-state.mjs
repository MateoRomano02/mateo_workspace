import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const workspaceRoot = process.cwd()
const configPath = path.join(
  workspaceRoot,
  'system/config/tracked-repositories.json',
)
const profileConfigPath = path.join(workspaceRoot, 'system/config/profile-context.json')
const resourcesRegistryPath = path.join(
  workspaceRoot,
  'system/registries/resources.json',
)
const outputPath = path.join(
  workspaceRoot,
  'app/public/data/workspace-core-state.json',
)
const gitIndexOutputPath = path.join(
  workspaceRoot,
  'system/indexes/git/last-ingestion.json',
)

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function readJsonIfExists(filePath, fallbackValue) {
  if (!fs.existsSync(filePath)) {
    return fallbackValue
  }
  return readJson(filePath)
}

function runGitCommand(repoPath, args) {
  const result = spawnSync('git', ['-C', repoPath, ...args], {
    encoding: 'utf8',
  })
  if (result.status !== 0) {
    return null
  }
  return result.stdout.trim()
}

function toUtcIsoDate(rawDateValue) {
  if (!rawDateValue) {
    return null
  }

  const parsed = new Date(rawDateValue)
  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return parsed.toISOString()
}

function inferCommitCategory(message) {
  const normalized = message.trim().toLowerCase()
  if (normalized.startsWith('feat:')) return 'feat'
  if (normalized.startsWith('fix:')) return 'fix'
  if (normalized.startsWith('docs:')) return 'docs'
  if (normalized.startsWith('refactor:')) return 'refactor'
  return 'chore'
}

function inferDefaultBranch(repoPath) {
  const remoteHead = runGitCommand(repoPath, [
    'symbolic-ref',
    '--short',
    'refs/remotes/origin/HEAD',
  ])
  if (remoteHead?.startsWith('origin/')) {
    return remoteHead.replace('origin/', '')
  }

  const hasMain = runGitCommand(repoPath, ['rev-parse', '--verify', 'main'])
  if (hasMain) return 'main'

  const hasMaster = runGitCommand(repoPath, ['rev-parse', '--verify', 'master'])
  if (hasMaster) return 'master'

  return 'main'
}

function getAheadBehind(repoPath, defaultBranch) {
  const branchExists = runGitCommand(repoPath, [
    'rev-parse',
    '--verify',
    defaultBranch,
  ])
  if (!branchExists) {
    return { aheadBy: 0, behindBy: 0 }
  }

  const counters = runGitCommand(repoPath, [
    'rev-list',
    '--left-right',
    '--count',
    `HEAD...${defaultBranch}`,
  ])
  if (!counters) {
    return { aheadBy: 0, behindBy: 0 }
  }

  const [aheadRaw, behindRaw] = counters.split(/\s+/)
  return {
    aheadBy: Number.parseInt(aheadRaw ?? '0', 10),
    behindBy: Number.parseInt(behindRaw ?? '0', 10),
  }
}

function createWorkspaceCoreState(config) {
  const repositories = []
  const projects = []
  const events = []

  for (const trackedRepository of config.repositories ?? []) {
    const absoluteRepoPath = path.resolve(workspaceRoot, trackedRepository.path)
    const gitDirCheck = runGitCommand(absoluteRepoPath, ['rev-parse', '--git-dir'])
    if (!gitDirCheck) {
      continue
    }

    const branchName =
      runGitCommand(absoluteRepoPath, ['rev-parse', '--abbrev-ref', 'HEAD']) ??
      'main'
    const defaultBranch = inferDefaultBranch(absoluteRepoPath)
    const { aheadBy, behindBy } = getAheadBehind(absoluteRepoPath, defaultBranch)

    const latestCommitData = runGitCommand(absoluteRepoPath, [
      'log',
      '-1',
      '--pretty=format:%h|%s|%cI',
    ])
    const [sha = '0000000', message = 'chore: repository registered', authoredAtRaw] =
      latestCommitData?.split('|') ?? []

    const changedFilesRaw = runGitCommand(absoluteRepoPath, [
      'show',
      '--name-only',
      '--pretty=',
      'HEAD',
    ])
    const changedFiles = changedFilesRaw
      ? changedFilesRaw.split('\n').filter(Boolean).length
      : 0

    const repositoryId = trackedRepository.id
    const projectId = trackedRepository.projectId
    const now = new Date().toISOString()
    const authoredAt = toUtcIsoDate(authoredAtRaw) ?? now

    repositories.push({
      id: repositoryId,
      name: path.basename(absoluteRepoPath),
      visibility: trackedRepository.visibility ?? 'private',
      activeBranch: {
        name: branchName,
        isDefault: branchName === defaultBranch,
        aheadBy,
        behindBy,
      },
      lastCommit: {
        sha,
        message,
        authoredAt,
        changedFiles,
        category: inferCommitCategory(message),
      },
    })

    projects.push({
      id: projectId,
      name: trackedRepository.projectName,
      status: trackedRepository.status ?? 'active',
      sensitivity: trackedRepository.sensitivity ?? 'project-safe',
      repositoryId,
      nextSteps: [
        {
          id: `step-${projectId}-review-latest`,
          text: 'Review latest commit summary and adjust next actions.',
          priority: 'high',
          isBlocked: false,
        },
      ],
    })

    events.push(
      {
        id: `event-${repositoryId}-registered`,
        type: 'repo-registered',
        occurredAt: now,
        summary: `Repository ${path.basename(absoluteRepoPath)} ingested from tracked configuration.`,
        severity: 'info',
        repositoryId,
        projectId,
      },
      {
        id: `event-${repositoryId}-commit`,
        type: 'commit-summarized',
        occurredAt: authoredAt,
        summary: `Latest commit summarized: ${message}`,
        severity: 'info',
        repositoryId,
        projectId,
      },
    )
  }

  const profile = readJsonIfExists(profileConfigPath, {
    id: 'person-default',
    displayName: 'Workspace User',
    headline: 'Context profile not configured yet.',
    currentFocus: [],
    skills: [],
    institutions: [],
  })

  const resourcesRegistry = readJsonIfExists(resourcesRegistryPath, {
    resources: [],
  })

  return {
    profile,
    repositories,
    projects,
    resources: resourcesRegistry.resources ?? [],
    events,
  }
}

function ensureDirectoryForFile(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function main() {
  if (!fs.existsSync(configPath)) {
    throw new Error(`Tracked repositories config not found: ${configPath}`)
  }

  const config = readJson(configPath)
  const coreState = createWorkspaceCoreState(config)

  ensureDirectoryForFile(outputPath)
  fs.writeFileSync(outputPath, `${JSON.stringify(coreState, null, 2)}\n`, 'utf8')

  ensureDirectoryForFile(gitIndexOutputPath)
  fs.writeFileSync(
    gitIndexOutputPath,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        repositoriesIngested: coreState.repositories.length,
        outputPath,
      },
      null,
      2,
    )}\n`,
    'utf8',
  )

  console.log(
    `Workspace state generated at ${outputPath} for ${coreState.repositories.length} repository(ies).`,
  )
}

main()
