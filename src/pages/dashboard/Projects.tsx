import { FolderKanban, Plus, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import SelectDropdown from '../../components/ui/SelectDropdown'
import LoadingState from '../../components/ui/LoadingState'
import ErrorState from '../../components/ui/ErrorState'

type ProjectStatus = 'On track' | 'At risk' | 'Completed'

type Project = {
  id: number
  name: string
  description: string
  category: string
  progress: number
  status: ProjectStatus
  members: string[]
  dueDate: string
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Website Redesign',
    description:
      'Refresh the company website with a modern and responsive experience.',
    category: 'Design',
    progress: 72,
    status: 'On track',
    members: ['ME', 'JD', 'AK'],
    dueDate: 'Sep 18, 2026',
  },
  {
    id: 2,
    name: 'Mobile App',
    description: 'Build and test the new mobile application for customers.',
    category: 'Development',
    progress: 48,
    status: 'At risk',
    members: ['ME', 'TS'],
    dueDate: 'Sep 26, 2026',
  },
  {
    id: 3,
    name: 'Marketing Campaign',
    description:
      'Launch the next campaign across social and email channels.',
    category: 'Marketing',
    progress: 86,
    status: 'On track',
    members: ['RJ', 'ME', 'CN'],
    dueDate: 'Sep 14, 2026',
  },
  {
    id: 4,
    name: 'Client Portal',
    description:
      'Create a secure portal for client project updates and communication.',
    category: 'Development',
    progress: 100,
    status: 'Completed',
    members: ['ME', 'LG'],
    dueDate: 'Sep 03, 2026',
  },
  {
    id: 5,
    name: 'Brand Guidelines',
    description:
      'Develop a consistent brand system for digital and print materials.',
    category: 'Branding',
    progress: 63,
    status: 'On track',
    members: ['AK', 'ME'],
    dueDate: 'Oct 02, 2026',
  },
  {
    id: 6,
    name: 'Analytics Dashboard',
    description:
      'Design a dashboard for monitoring business performance and activity.',
    category: 'Development',
    progress: 35,
    status: 'At risk',
    members: ['ME', 'JD', 'TS'],
    dueDate: 'Oct 12, 2026',
  },
]

const statusOptions = [
  {
    label: 'All statuses',
    value: 'All',
  },
  {
    label: 'On track',
    value: 'On track',
  },
  {
    label: 'At risk',
    value: 'At risk',
  },
  {
    label: 'Completed',
    value: 'Completed',
  },
]

function Projects() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 700)

    return () => window.clearTimeout(timer)
  }, [])

  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)

    window.setTimeout(() => {
      setIsLoading(false)
    }, 700)
  }

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return projects.filter((project) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        project.name.toLowerCase().includes(normalizedSearch) ||
        project.description.toLowerCase().includes(normalizedSearch) ||
        project.category.toLowerCase().includes(normalizedSearch)

      const matchesStatus =
        statusFilter === 'All' || project.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const getStatusStyles = (status: ProjectStatus) => {
    switch (status) {
      case 'On track':
        return 'bg-green-50 text-green-700 ring-green-600/10'

      case 'At risk':
        return 'bg-red-50 text-red-700 ring-red-600/10'

      case 'Completed':
        return 'bg-gray-100 text-gray-600 ring-gray-500/10'

      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  if (isLoading) {
    return <LoadingState message="Loading projects..." />
  }

  if (hasError) {
    return (
      <ErrorState
        message="We couldn't load your projects. Please try again."
        onRetry={handleRetry}
      />
    )
  }

  return (
    <div className="min-w-0 pb-10">
      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#B38708]">Workspace</p>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-[#18181B] sm:text-3xl">
            Projects
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Keep track of active work, progress and project delivery.
          </p>
        </div>

        <button
          type="button"
          className="
            inline-flex
            w-full
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#F5C542]
            px-4
            py-3
            text-sm
            font-bold
            text-[#18181B]
            transition
            hover:bg-[#E9B931]
            focus:outline-none
            focus:ring-4
            focus:ring-[#F5C542]/30
            sm:w-auto
          "
        >
          <Plus size={18} />
          New project
        </button>
      </div>

      <section className="mt-8 w-full overflow-visible rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex min-w-0 flex-col gap-3 md:flex-row">
          <div className="relative min-w-0 flex-1">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>

            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="project-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search projects..."
              className="
                block
                w-full
                min-w-0
                rounded-xl
                border
                border-gray-200
                bg-[#FAFAF8]
                py-3
                pl-11
                pr-4
                text-sm
                text-gray-700
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-[#D9A514]
                focus:ring-4
                focus:ring-[#F5C542]/15
              "
            />
          </div>

          <div className="min-w-0 md:w-52 md:shrink-0">
            <SelectDropdown
              label="Filter projects by status"
              value={statusFilter}
              options={statusOptions}
              onChange={setStatusFilter}
            />
          </div>
        </div>
      </section>

      <div className="mt-6">
        {filteredProjects.length > 0 ? (
          <div className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="
                  min-w-0
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
                  sm:p-6
                "
              >
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF4C7] text-[#9A7407]">
                      <FolderKanban size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                        {project.category}
                      </p>

                      <h2 className="mt-1 truncate text-base font-bold text-[#18181B]">
                        {project.name}
                      </h2>
                    </div>
                  </div>

                  <span
                    className={`
                      shrink-0
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-bold
                      ring-1
                      ring-inset
                      ${getStatusStyles(project.status)}
                    `}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="mt-5 line-clamp-2 text-sm leading-6 text-gray-500">
                  {project.description}
                </p>

                <div className="mt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-gray-500">
                      Progress
                    </span>

                    <span className="text-xs font-bold text-gray-700">
                      {project.progress}%
                    </span>
                  </div>

                  <div
                    className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={project.progress}
                    aria-label={`${project.name} progress`}
                  >
                    <div
                      className="h-full rounded-full bg-[#F5C542] transition-all"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex min-w-0 items-center justify-between gap-4 border-t border-gray-100 pt-5">
                  <div className="flex shrink-0 -space-x-2">
                    {project.members.map((member, index) => (
                      <div
                        key={`${project.id}-${member}-${index}`}
                        title={member}
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          border-2
                          border-white
                          bg-[#18181B]
                          text-[10px]
                          font-bold
                          text-white
                        "
                      >
                        {member}
                      </div>
                    ))}
                  </div>

                  <div className="min-w-0 text-right">
                    <p className="text-[11px] font-medium text-gray-400">
                      Due date
                    </p>

                    <p className="truncate text-xs font-bold text-gray-700">
                      {project.dueDate}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF4C7] text-[#9A7407]">
              <FolderKanban size={22} />
            </div>

            <h2 className="mt-4 text-base font-bold text-[#18181B]">
              No projects found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Try changing your search or status filter to find the project
              you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects