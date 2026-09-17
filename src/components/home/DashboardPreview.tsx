import {
  CheckCircle2,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Settings,
  Bell,
  CalendarDays,
  Search,
  TrendingUp,
} from 'lucide-react'

const projects = [
  {
    name: 'Website Redesign',
    progress: 78,
  },
  {
    name: 'Mobile App',
    progress: 56,
  },
  {
    name: 'Marketing Campaign',
    progress: 34,
  },
]

function DashboardPreview() {
  return (
    <div className="relative w-full">
      {/* Decorative background */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#F5C542]/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/70">
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F5C542]">
              <span className="text-sm font-black text-[#171717]">F</span>
            </div>

            <span className="hidden text-sm font-black text-gray-900 sm:block">
              FlowDesk
            </span>
          </div>

          <div className="hidden h-8 w-32 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 sm:flex">
            <Search size={13} className="text-gray-400" />
            <span className="text-[10px] text-gray-400">
              Search workspace
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Bell size={16} className="text-gray-400" />

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#18181B]">
              <span className="text-[9px] font-bold text-white">ME</span>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-28 shrink-0 border-r border-gray-200 bg-[#FAFAF8] p-3 sm:block">
            <nav className="space-y-1.5">
              <div className="flex items-center gap-2 rounded-lg bg-[#FFF4C7] px-2 py-2">
                <LayoutDashboard
                  size={13}
                  className="text-[#9A7608]"
                />
                <span className="text-[9px] font-bold text-[#705604]">
                  Dashboard
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg px-2 py-2">
                <FolderKanban size={13} className="text-gray-400" />
                <span className="text-[9px] text-gray-500">
                  Projects
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg px-2 py-2">
                <ListTodo size={13} className="text-gray-400" />
                <span className="text-[9px] text-gray-500">
                  Tasks
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg px-2 py-2">
                <CalendarDays size={13} className="text-gray-400" />
                <span className="text-[9px] text-gray-500">
                  Calendar
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg px-2 py-2">
                <Settings size={13} className="text-gray-400" />
                <span className="text-[9px] text-gray-500">
                  Settings
                </span>
              </div>
            </nav>
          </aside>

          {/* Dashboard content */}
          <div className="min-w-0 flex-1 bg-[#FAFAF8] p-4 sm:p-5">
            {/* Welcome */}
            <div className="mb-4">
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#B38708]">
                Thursday, September 17, 2026
              </p>

              <h3 className="mt-1 text-base font-black tracking-tight text-gray-900 sm:text-lg">
                Good morning, Michael.
              </h3>

              <p className="mt-1 text-[9px] text-gray-500 sm:text-[10px]">
                Here&apos;s what&apos;s happening with your workspace today.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-xl border border-gray-200 bg-white p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-medium text-gray-500">
                    Projects
                  </span>

                  <FolderKanban
                    size={12}
                    className="text-[#B38708]"
                  />
                </div>

                <p className="mt-2 text-base font-black text-gray-900">
                  8
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-medium text-gray-500">
                    Active tasks
                  </span>

                  <ListTodo
                    size={12}
                    className="text-[#B38708]"
                  />
                </div>

                <p className="mt-2 text-base font-black text-gray-900">
                  14
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-medium text-gray-500">
                    Completed
                  </span>

                  <CheckCircle2
                    size={12}
                    className="text-green-600"
                  />
                </div>

                <p className="mt-2 text-base font-black text-gray-900">
                  21
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-medium text-gray-500">
                    Progress
                  </span>

                  <TrendingUp
                    size={12}
                    className="text-[#B38708]"
                  />
                </div>

                <p className="mt-2 text-base font-black text-gray-900">
                  68%
                </p>
              </div>
            </div>

            {/* Main panels */}
            <div className="mt-3 grid gap-3 md:grid-cols-[1.35fr_1fr]">
              {/* Projects */}
              <div className="rounded-xl border border-gray-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[10px] font-black text-gray-900">
                      Recent projects
                    </h4>

                    <p className="mt-0.5 text-[7px] text-gray-400">
                      Track progress across your projects.
                    </p>
                  </div>

                  <span className="text-[8px] font-bold text-[#9A7608]">
                    View all
                  </span>
                </div>

                <div className="mt-3 space-y-3">
                  {projects.map((project) => (
                    <div key={project.name}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-[8px] font-bold text-gray-800">
                          {project.name}
                        </span>

                        <span className="shrink-0 text-[8px] font-black text-gray-700">
                          {project.progress}%
                        </span>
                      </div>

                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-[#F5C542]"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div className="rounded-xl border border-gray-200 bg-white p-3">
                <div>
                  <h4 className="text-[10px] font-black text-gray-900">
                    Recent activity
                  </h4>

                  <p className="mt-0.5 text-[7px] text-gray-400">
                    Latest workspace updates.
                  </p>
                </div>

                <div className="mt-3 space-y-3">
                  <div className="flex gap-2">
                    <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5C542]" />

                    <div>
                      <p className="text-[8px] leading-3 text-gray-600">
                        You created project{' '}
                        <strong className="text-gray-900">
                          Website Redesign
                        </strong>
                      </p>

                      <p className="mt-0.5 text-[7px] text-gray-400">
                        12 minutes ago
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />

                    <div>
                      <p className="text-[8px] leading-3 text-gray-600">
                        Task{' '}
                        <strong className="text-gray-900">
                          Homepage design
                        </strong>{' '}
                        was completed
                      </p>

                      <p className="mt-0.5 text-[7px] text-gray-400">
                        1 hour ago
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />

                    <div>
                      <p className="text-[8px] leading-3 text-gray-600">
                        Task{' '}
                        <strong className="text-gray-900">
                          API integration
                        </strong>{' '}
                        was created
                      </p>

                      <p className="mt-0.5 text-[7px] text-gray-400">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPreview