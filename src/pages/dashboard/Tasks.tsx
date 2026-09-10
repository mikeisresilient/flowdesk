import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Plus,
  Search,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import SelectDropdown from '../../components/ui/SelectDropdown'

type TaskStatus = 'To do' | 'In progress' | 'Completed'

type TaskPriority = 'High' | 'Medium' | 'Low'

type Task = {
  id: number
  title: string
  project: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
}

const tasks: Task[] = [
  {
    id: 1,
    title: 'Design homepage wireframe',
    project: 'Website Redesign',
    status: 'In progress',
    priority: 'High',
    dueDate: 'Today',
  },
  {
    id: 2,
    title: 'Review authentication flow',
    project: 'Mobile App',
    status: 'To do',
    priority: 'High',
    dueDate: 'Sep 12',
  },
  {
    id: 3,
    title: 'Prepare campaign assets',
    project: 'Marketing Campaign',
    status: 'In progress',
    priority: 'Medium',
    dueDate: 'Sep 13',
  },
  {
    id: 4,
    title: 'Update client dashboard',
    project: 'Client Portal',
    status: 'Completed',
    priority: 'Medium',
    dueDate: 'Sep 08',
  },
  {
    id: 5,
    title: 'Create typography guidelines',
    project: 'Brand Guidelines',
    status: 'To do',
    priority: 'Low',
    dueDate: 'Sep 18',
  },
  {
    id: 6,
    title: 'Connect analytics charts',
    project: 'Analytics Dashboard',
    status: 'In progress',
    priority: 'High',
    dueDate: 'Sep 15',
  },
  {
    id: 7,
    title: 'Test responsive navigation',
    project: 'Website Redesign',
    status: 'Completed',
    priority: 'High',
    dueDate: 'Sep 09',
  },
]

const statusOptions = [
  {
    label: 'All statuses',
    value: 'All',
  },
  {
    label: 'To do',
    value: 'To do',
  },
  {
    label: 'In progress',
    value: 'In progress',
  },
  {
    label: 'Completed',
    value: 'Completed',
  },
]

const priorityOptions = [
  {
    label: 'All priorities',
    value: 'All',
  },
  {
    label: 'High',
    value: 'High',
  },
  {
    label: 'Medium',
    value: 'Medium',
  },
  {
    label: 'Low',
    value: 'Low',
  },
]

function Tasks() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.project.toLowerCase().includes(normalizedSearch)

      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter

      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [searchTerm, statusFilter, priorityFilter])

  const getStatusStyles = (status: TaskStatus) => {
    switch (status) {
      case 'To do':
        return 'bg-gray-100 text-gray-700 ring-gray-500/10'

      case 'In progress':
        return 'bg-[#FFF4C7] text-[#806207] ring-[#D9A514]/20'

      case 'Completed':
        return 'bg-green-50 text-green-700 ring-green-600/10'

      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityStyles = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700'

      case 'Medium':
        return 'bg-amber-50 text-amber-700'

      case 'Low':
        return 'bg-blue-50 text-blue-700'

      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 size={17} />

      case 'In progress':
        return <Clock3 size={17} />

      default:
        return <Circle size={17} />
    }
  }

  return (
    <div className="min-w-0 pb-10">
      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#B38708]">Workspace</p>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-[#18181B] sm:text-3xl">
            Tasks
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Organize priorities, monitor progress and stay ahead of deadlines.
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
          New task
        </button>
      </div>

      <section className="mt-8 w-full overflow-visible rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_190px_190px]">
          <div className="relative min-w-0">
            <label htmlFor="task-search" className="sr-only">
              Search tasks
            </label>

            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="task-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search tasks or projects..."
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

          <div className="min-w-0">
            <SelectDropdown
              label="Filter tasks by status"
              value={statusFilter}
              options={statusOptions}
              onChange={setStatusFilter}
            />
          </div>

          <div className="min-w-0">
            <SelectDropdown
              label="Filter tasks by priority"
              value={priorityFilter}
              options={priorityOptions}
              onChange={setPriorityFilter}
            />
          </div>
        </div>
      </section>

      <section className="mt-6 min-w-0">
        {filteredTasks.length > 0 ? (
          <>
            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px]">
                  <thead className="border-b border-gray-200 bg-[#FAFAF8]">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                      >
                        Task
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                      >
                        Project
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                      >
                        Priority
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500"
                      >
                        Due date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="transition hover:bg-[#FAFAF8]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                ${
                                  task.status === 'Completed'
                                    ? 'bg-green-50 text-green-600'
                                    : task.status === 'In progress'
                                      ? 'bg-[#FFF4C7] text-[#9A7407]'
                                      : 'bg-gray-100 text-gray-500'
                                }
                              `}
                            >
                              {getStatusIcon(task.status)}
                            </div>

                            <p className="font-semibold text-[#18181B]">
                              {task.title}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm font-medium text-gray-500">
                          {task.project}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-2.5
                              py-1
                              text-xs
                              font-bold
                              ring-1
                              ring-inset
                              ${getStatusStyles(task.status)}
                            `}
                          >
                            {task.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-2.5
                              py-1
                              text-xs
                              font-bold
                              ${getPriorityStyles(task.priority)}
                            `}
                          >
                            {task.priority}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                            <CalendarDays size={16} />
                            {task.dueDate}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid min-w-0 gap-4 md:hidden">
              {filteredTasks.map((task) => (
                <article
                  key={task.id}
                  className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${
                          task.status === 'Completed'
                            ? 'bg-green-50 text-green-600'
                            : task.status === 'In progress'
                              ? 'bg-[#FFF4C7] text-[#9A7407]'
                              : 'bg-gray-100 text-gray-500'
                        }
                      `}
                    >
                      {getStatusIcon(task.status)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="break-words text-sm font-bold leading-6 text-[#18181B]">
                        {task.title}
                      </h2>

                      <p className="mt-1 truncate text-xs font-medium text-gray-500">
                        {task.project}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-2.5
                        py-1
                        text-xs
                        font-bold
                        ring-1
                        ring-inset
                        ${getStatusStyles(task.status)}
                      `}
                    >
                      {task.status}
                    </span>

                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-2.5
                        py-1
                        text-xs
                        font-bold
                        ${getPriorityStyles(task.priority)}
                      `}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500">
                    <CalendarDays
                      size={15}
                      aria-hidden="true"
                      className="shrink-0"
                    />

                    <span>Due {task.dueDate}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF4C7] text-[#9A7407]">
              <CheckCircle2 size={22} />
            </div>

            <h2 className="mt-4 text-base font-bold text-[#18181B]">
              No tasks found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Try changing your search, status or priority filter.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Tasks