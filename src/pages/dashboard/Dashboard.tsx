import {
  CheckCircle2,
  FolderKanban,
  ListTodo,
  TrendingUp,
} from 'lucide-react'
import StatCard from '../../components/ui/StatCard'

const stats = [
  {
    title: 'Total Projects',
    value: '12',
    description: '+2 from last month',
    icon: FolderKanban,
  },
  {
    title: 'Active Tasks',
    value: '28',
    description: '8 due this week',
    icon: ListTodo,
  },
  {
    title: 'Completed',
    value: '18',
    description: '72% completion rate',
    icon: CheckCircle2,
  },
  {
    title: 'Overall Progress',
    value: '78%',
    description: '+12% from last week',
    icon: TrendingUp,
  },
]

const projects = [
  {
    name: 'Website Redesign',
    category: 'Design & Development',
    progress: 78,
    tasks: '18 / 23 tasks',
  },
  {
    name: 'Mobile Application',
    category: 'Product Development',
    progress: 54,
    tasks: '13 / 24 tasks',
  },
  {
    name: 'Marketing Campaign',
    category: 'Marketing',
    progress: 91,
    tasks: '20 / 22 tasks',
  },
]

function Dashboard() {
  return (
    <div>
      {/* Welcome */}
      <section className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#B38708]">
          Wednesday, September 9
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
          Good evening, Michael.
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
          Here&apos;s what&apos;s happening with your workspace today.
        </p>
      </section>

      {/* Stats */}
      <section
        aria-label="Workspace statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
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

            <button
              type="button"
              className="text-sm font-bold text-[#9A7608] hover:text-[#705604]"
            >
              View all
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {projects.map((project) => (
              <article key={project.name}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-bold text-gray-900">
                      {project.name}
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      {project.category}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-black text-gray-900">
                    {project.progress}%
                  </span>
                </div>

                <div
                  className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100"
                  role="progressbar"
                  aria-valuenow={project.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${project.name} progress`}
                >
                  <div
                    className="h-full rounded-full bg-[#F5C542] transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  {project.tasks}
                </p>
              </article>
            ))}
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
            <div className="flex gap-3">
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#F5C542]" />

              <div>
                <p className="text-sm leading-5 text-gray-700">
                  You completed{' '}
                  <strong className="font-bold text-gray-900">
                    Homepage redesign
                  </strong>
                  .
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  20 minutes ago
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />

              <div>
                <p className="text-sm leading-5 text-gray-700">
                  Project{' '}
                  <strong className="font-bold text-gray-900">
                    Mobile Application
                  </strong>{' '}
                  reached 50%.
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  2 hours ago
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gray-400" />

              <div>
                <p className="text-sm leading-5 text-gray-700">
                  You created a new task in{' '}
                  <strong className="font-bold text-gray-900">
                    Marketing Campaign
                  </strong>
                  .
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Yesterday
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#D9A514]" />

              <div>
                <p className="text-sm leading-5 text-gray-700">
                  Your weekly progress increased by{' '}
                  <strong className="font-bold text-gray-900">
                    12%
                  </strong>
                  .
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Yesterday
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard