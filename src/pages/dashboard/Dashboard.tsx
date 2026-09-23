import { useEffect, useMemo, useState } from 'react'
import {
  CheckCircle2,
  FolderKanban,
  ListTodo,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../../components/ui/StatCard'
import {
  getProjects,
  type Project,
} from '../../services/projectService'
import {
  getTasks,
  type Task,
} from '../../services/taskService'
import { getDashboardStats } from '../../services/dashboardService'
import type { DashboardStats } from '../../services/dashboardService'
import { useAuth } from '../../context/useAuth'

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) {
    return 'Good morning'
  }

  if (hour < 18) {
    return 'Good afternoon'
  }

  return 'Good evening'
}

function formatCurrentDate() {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const difference = now.getTime() - date.getTime()

  const minutes = Math.floor(
    difference / (1000 * 60),
  )

  const hours = Math.floor(
    difference / (1000 * 60 * 60),
  )

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24),
  )

  if (minutes < 1) {
    return 'Just now'
  }

  if (minutes < 60) {
    return `${minutes} minute${
      minutes === 1 ? '' : 's'
    } ago`
  }

  if (hours < 24) {
    return `${hours} hour${
      hours === 1 ? '' : 's'
    } ago`
  }

  if (days === 1) {
    return 'Yesterday'
  }

  if (days < 7) {
    return `${days} days ago`
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function Dashboard() {
  const { user } = useAuth()

  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [dashboardStats, setDashboardStats] =
    useState<DashboardStats | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadDashboardData() {
      setIsLoading(true)
      setError('')

      try {
        const [
          dashboardData,
          projectData,
          taskData,
        ] = await Promise.all([
          getDashboardStats(),
          getProjects(),
          getTasks(),
        ])

        if (!isMounted) {
          return
        }

        setDashboardStats(dashboardData.stats)
        setProjects(projectData)
        setTasks(taskData)
      } catch {
        if (!isMounted) {
          return
        }

        setError(
          'We could not load your workspace data. Please refresh and try again.',
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadDashboardData()

    return () => {
      isMounted = false
    }
  }, [])

  const statistics = useMemo(() => {
    if (!dashboardStats) {
      return {
        totalProjects: 0,
        activeTasks: 0,
        completedTasks: 0,
        overallProgress: 0,
        completionRate: 0,
      }
    }

    const totalProjects =
      dashboardStats.projects.total

    const completedTasks =
      dashboardStats.tasks.completed

    const totalTasks =
      dashboardStats.tasks.total

    const completionRate =
      totalTasks > 0
        ? Math.round(
            (completedTasks / totalTasks) * 100,
          )
        : 0

    const overallProgress =
      projects.length > 0
        ? Math.round(
            projects.reduce(
              (total, project) =>
                total + project.progress,
              0,
            ) / projects.length,
          )
        : 0

    return {
      totalProjects,
      activeTasks:
        dashboardStats.tasks.todo +
        dashboardStats.tasks.inProgress,
      completedTasks,
      overallProgress,
      completionRate,
    }
  }, [dashboardStats, projects])

  const stats = [
    {
      title: 'Total Projects',
      value: String(statistics.totalProjects),
      description: 'Projects in your workspace',
      icon: FolderKanban,
    },
    {
      title: 'Active Tasks',
      value: String(statistics.activeTasks),
      description: 'Tasks still in progress',
      icon: ListTodo,
    },
    {
      title: 'Completed',
      value: String(statistics.completedTasks),
      description: `${statistics.completionRate}% task completion rate`,
      icon: CheckCircle2,
    },
    {
      title: 'Overall Progress',
      value: `${statistics.overallProgress}%`,
      description: 'Average project progress',
      icon: TrendingUp,
    },
  ]

  const recentProjects = projects.slice(0, 3)

  const recentActivity = useMemo(() => {
    const activity = [
      ...tasks.map((task) => ({
        id: `task-${task.id}`,
        type: 'task' as const,
        title: task.title,
        status: task.status,
        createdAt: task.createdAt,
      })),

      ...projects.map((project) => ({
        id: `project-${project.id}`,
        type: 'project' as const,
        title: project.name,
        status: project.status,
        createdAt: project.createdAt,
      })),
    ]

    return activity
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      )
      .slice(0, 4)
  }, [projects, tasks])

  return (
    <div>
      {/* Welcome */}
      <section className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#B38708]">
          {formatCurrentDate()}
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
          {getGreeting()}, {user?.name || 'there'}.
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
          Here&apos;s what&apos;s happening with your workspace today.
        </p>
      </section>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      {/* Stats */}
      <section
        aria-label="Workspace statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
            value={
              isLoading
                ? '...'
                : stat.value
            }
          />
        ))}
      </section>

      {/* Main content */}
      <section className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Projects */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-gray-900">
                Recent projects
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Track progress across your active projects.
              </p>
            </div>

            <Link
              to="/dashboard/projects"
              className="shrink-0 rounded text-sm font-bold text-[#9A7608] transition-colors hover:text-[#705604] focus:outline-none focus:ring-2 focus:ring-[#F5C542] focus:ring-offset-2"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 space-y-5">
            {isLoading ? (
              <>
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-full">
                        <div className="h-4 w-40 rounded bg-gray-200" />
                        <div className="mt-2 h-3 w-28 rounded bg-gray-100" />
                      </div>

                      <div className="h-4 w-10 rounded bg-gray-200" />
                    </div>

                    <div className="mt-3 h-2 rounded-full bg-gray-100" />

                    <div className="mt-2 h-3 w-24 rounded bg-gray-100" />
                  </div>
                ))}
              </>
            ) : recentProjects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center">
                <FolderKanban className="mx-auto h-8 w-8 text-gray-300" />

                <p className="mt-3 text-sm font-bold text-gray-700">
                  No projects yet
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Create your first project to see it here.
                </p>
              </div>
            ) : (
              recentProjects.map((project) => {
                const projectTasks =
                  tasks.filter(
                    (task) =>
                      task.projectId ===
                      project.id,
                  )

                const completedProjectTasks =
                  projectTasks.filter(
                    (task) =>
                      task.status ===
                      'COMPLETED',
                  ).length

                return (
                  <article key={project.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-bold text-gray-900">
                          {project.name}
                        </h4>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {project.description ||
                            'No project description'}
                        </p>
                      </div>

                      <span className="shrink-0 text-sm font-black text-gray-900">
                        {project.progress}%
                      </span>
                    </div>

                    <div
                      className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100"
                      role="progressbar"
                      aria-valuenow={
                        project.progress
                      }
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${project.name} progress`}
                    >
                      <div
                        className="h-full rounded-full bg-[#F5C542] transition-all"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      {projectTasks.length > 0
                        ? `${completedProjectTasks} / ${projectTasks.length} tasks completed`
                        : 'No tasks yet'}
                    </p>
                  </article>
                )
              })
            )}
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div>
            <h3 className="text-lg font-black text-gray-900">
              Recent activity
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Latest workspace updates.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex animate-pulse gap-3"
                  >
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gray-200" />

                    <div className="flex-1">
                      <div className="h-4 w-full rounded bg-gray-100" />
                      <div className="mt-2 h-3 w-20 rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
              </>
            ) : recentActivity.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-gray-300" />

                <p className="mt-3 text-sm font-bold text-gray-700">
                  No recent activity
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Your latest projects and tasks will appear here.
                </p>
              </div>
            ) : (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3"
                >
                  <div
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                      activity.type ===
                      'project'
                        ? 'bg-[#F5C542]'
                        : activity.status ===
                            'COMPLETED'
                          ? 'bg-green-500'
                          : 'bg-gray-400'
                    }`}
                  />

                  <div>
                    <p className="text-sm leading-5 text-gray-700">
                      {activity.type ===
                      'project' ? (
                        <>
                          You created project{' '}
                          <strong className="font-bold text-gray-900">
                            {activity.title}
                          </strong>
                          .
                        </>
                      ) : (
                        <>
                          Task{' '}
                          <strong className="font-bold text-gray-900">
                            {activity.title}
                          </strong>{' '}
                          was created.
                        </>
                      )}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {formatTimeAgo(
                        activity.createdAt,
                      )}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard