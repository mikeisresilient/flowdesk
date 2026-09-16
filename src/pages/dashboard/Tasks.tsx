import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import {
  useEffect,
  useMemo,
  useState,
  type SyntheticEvent,
} from 'react'
import SelectDropdown from '../../components/ui/SelectDropdown'
import LoadingState from '../../components/ui/LoadingState'
import ErrorState from '../../components/ui/ErrorState'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  type Task,
  type TaskPriority,
  type TaskStatus,
  type CreateTaskPayload,
} from '../../services/taskService'
import {
  getProjects,
  type Project,
} from '../../services/projectService'

const statusOptions = [
  {
    label: 'All statuses',
    value: 'All',
  },
  {
    label: 'To do',
    value: 'TODO',
  },
  {
    label: 'In progress',
    value: 'IN_PROGRESS',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
]

const priorityOptions = [
  {
    label: 'All priorities',
    value: 'All',
  },
  {
    label: 'High',
    value: 'HIGH',
  },
  {
    label: 'Medium',
    value: 'MEDIUM',
  },
  {
    label: 'Low',
    value: 'LOW',
  },
]

function getStatusLabel(status: TaskStatus) {
  switch (status) {
    case 'TODO':
      return 'To do'
    case 'IN_PROGRESS':
      return 'In progress'
    case 'COMPLETED':
      return 'Completed'
    default:
      return status
  }
}

function getPriorityLabel(priority: TaskPriority) {
  switch (priority) {
    case 'HIGH':
      return 'High'
    case 'MEDIUM':
      return 'Medium'
    case 'LOW':
      return 'Low'
    default:
      return priority
  }
}

function getStatusStyles(status: TaskStatus) {
  switch (status) {
    case 'TODO':
      return 'bg-gray-100 text-gray-700 ring-gray-500/10'

    case 'IN_PROGRESS':
      return 'bg-[#FFF4C7] text-[#806207] ring-[#D9A514]/20'

    case 'COMPLETED':
      return 'bg-green-50 text-green-700 ring-green-600/10'

    default:
      return 'bg-gray-100 text-gray-700 ring-gray-500/10'
  }
}

function getPriorityStyles(priority: TaskPriority) {
  switch (priority) {
    case 'HIGH':
      return 'bg-red-50 text-red-700'

    case 'MEDIUM':
      return 'bg-amber-50 text-amber-700'

    case 'LOW':
      return 'bg-blue-50 text-blue-700'

    default:
      return 'bg-gray-100 text-gray-600'
  }
}

function getStatusIcon(status: TaskStatus) {
  switch (status) {
    case 'COMPLETED':
      return <CheckCircle2 size={17} />

    case 'IN_PROGRESS':
      return <Clock3 size={17} />

    default:
      return <Circle size={17} />
  }
}

function formatDueDate(dateString: string | null) {
  if (!dateString) {
    return 'No due date'
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

function toDateInputValue(dateString: string | null) {
  if (!dateString) {
    return ''
  }

  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

type TaskFormProps = {
  task?: Task | null
  projects: Project[]
  onClose: () => void
  onSubmit: (
    payload: CreateTaskPayload,
  ) => Promise<void>
  isSubmitting: boolean
}

function TaskForm({
  task,
  projects,
  onClose,
  onSubmit,
  isSubmitting,
}: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(
    task?.description ?? '',
  )
  const [status, setStatus] = useState<TaskStatus>(
    task?.status ?? 'TODO',
  )
  const [priority, setPriority] =
    useState<TaskPriority>(
      task?.priority ?? 'MEDIUM',
    )
  const [dueDate, setDueDate] = useState(
    toDateInputValue(task?.dueDate ?? null),
  )
  const [projectId, setProjectId] = useState(
    task?.projectId ?? '',
  )
  const [formError, setFormError] = useState('')

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    setFormError('')

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (trimmedTitle.length < 2) {
      setFormError(
        'Task title must be at least 2 characters.',
      )
      return
    }

    await onSubmit({
      title: trimmedTitle,
      description:
        trimmedDescription || undefined,
      status,
      priority,
      dueDate: dueDate
        ? new Date(`${dueDate}T23:59:59`).toISOString()
        : undefined,
      projectId: projectId || undefined,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="task-form-title"
              className="text-xl font-black text-[#18181B]"
            >
              {task ? 'Edit task' : 'Create task'}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {task
                ? 'Update your task details.'
                : 'Add a new task to your workspace.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close task form"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-4 focus:ring-[#F5C542]/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          {formError && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {formError}
            </div>
          )}

          <div>
            <label
              htmlFor="task-title"
              className="text-sm font-bold text-gray-700"
            >
              Task title
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              maxLength={150}
              required
              placeholder="e.g. Review authentication flow"
              className="mt-2 block w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="text-sm font-bold text-gray-700"
            >
              Description
            </label>

            <textarea
              id="task-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              maxLength={2000}
              rows={4}
              placeholder="Describe what needs to be done..."
              className="mt-2 block w-full resize-y rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm leading-6 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />
          </div>

          <div>
            <label
              htmlFor="task-project"
              className="text-sm font-bold text-gray-700"
            >
              Project
            </label>

            <select
              id="task-project"
              value={projectId}
              onChange={(event) =>
                setProjectId(event.target.value)
              }
              className="mt-2 block w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            >
              <option value="">
                No project
              </option>

              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-status"
                className="text-sm font-bold text-gray-700"
              >
                Status
              </label>

              <select
                id="task-status"
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as TaskStatus,
                  )
                }
                className="mt-2 block w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
              >
                <option value="TODO">To do</option>
                <option value="IN_PROGRESS">
                  In progress
                </option>
                <option value="COMPLETED">
                  Completed
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="text-sm font-bold text-gray-700"
              >
                Priority
              </label>

              <select
                id="task-priority"
                value={priority}
                onChange={(event) =>
                  setPriority(
                    event.target.value as TaskPriority,
                  )
                }
                className="mt-2 block w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
              >
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="task-due-date"
              className="text-sm font-bold text-gray-700"
            >
              Due date
            </label>

            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) =>
                setDueDate(event.target.value)
              }
              className="mt-2 block w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#F5C542] px-4 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#E9B931] focus:outline-none focus:ring-4 focus:ring-[#F5C542]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Saving...'
                : task
                  ? 'Save changes'
                  : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] =
    useState<Task | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [actionError, setActionError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadInitialData() {
      setIsLoading(true)
      setHasError(false)

      try {
        const [taskData, projectData] =
          await Promise.all([
            getTasks(),
            getProjects(),
          ])

        if (!isMounted) {
          return
        }

        setTasks(taskData)
        setProjects(projectData)
      } catch {
        if (!isMounted) {
          return
        }

        setHasError(true)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadInitialData()

    return () => {
      isMounted = false
    }
  }, [])

  const getProjectName = (projectId: string | null) => {
    if (!projectId) {
      return 'No project'
    }

    return (
      projects.find(
        (project) => project.id === projectId,
      )?.name || 'Unknown project'
    )
  }

  const handleCreateTask = () => {
    setEditingTask(null)
    setActionError('')
    setIsFormOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setActionError('')
    setIsFormOpen(true)
  }

  const handleSubmitTask = async (
    payload: CreateTaskPayload,
  ) => {
    setIsSubmitting(true)
    setActionError('')

    try {
      if (editingTask) {
        const updatedTask = await updateTask(
          editingTask.id,
          payload,
        )

        setTasks((currentTasks) =>
          currentTasks.map((currentTask) =>
            currentTask.id === updatedTask.id
              ? updatedTask
              : currentTask,
          ),
        )
      } else {
        const newTask = await createTask(payload)

        setTasks((currentTasks) => [
          newTask,
          ...currentTasks,
        ])
      }

      setIsFormOpen(false)
      setEditingTask(null)
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : 'Unable to save task. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteTask = async (task: Task) => {
    const confirmed = window.confirm(
      `Delete "${task.title}"? This action cannot be undone.`,
    )

    if (!confirmed) {
      return
    }

    setActionError('')

    try {
      await deleteTask(task.id)

      setTasks((currentTasks) =>
        currentTasks.filter(
          (currentTask) =>
            currentTask.id !== task.id,
        ),
      )
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : 'Unable to delete task. Please try again.',
      )
    }
  }

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase()

    return tasks.filter((task) => {
      const projectName = getProjectName(
        task.projectId,
      )

      const matchesSearch =
        normalizedSearch.length === 0 ||
        task.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        projectName
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesStatus =
        statusFilter === 'All' ||
        task.status === statusFilter

      const matchesPriority =
        priorityFilter === 'All' ||
        task.priority === priorityFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      )
    })
  }, [
    tasks,
    projects,
    searchTerm,
    statusFilter,
    priorityFilter,
  ])

  if (isLoading) {
    return <LoadingState message="Loading tasks..." />
  }

  if (hasError) {
    return (
      <ErrorState
        message="We couldn't load your tasks. Please try again."
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="min-w-0 pb-10">
      {/* Header */}
      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#B38708]">
            Workspace
          </p>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-[#18181B] sm:text-3xl">
            Tasks
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Organize priorities, monitor progress and
            stay ahead of deadlines.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateTask}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F5C542] px-4 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#E9B931] focus:outline-none focus:ring-4 focus:ring-[#F5C542]/30 sm:w-auto"
        >
          <Plus size={18} />
          New task
        </button>
      </div>

      {/* Action error */}
      {actionError && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {actionError}
        </div>
      )}

      {/* Filters */}
      <section className="mt-8 w-full overflow-visible rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_190px_190px]">
          <div className="relative min-w-0">
            <label
              htmlFor="task-search"
              className="sr-only"
            >
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
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search tasks or projects..."
              className="block w-full min-w-0 rounded-xl border border-gray-200 bg-[#FAFAF8] py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
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

      {/* Tasks */}
      <section className="mt-6 min-w-0">
        {filteredTasks.length > 0 ? (
          <>
            {/* Desktop */}
            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px]">
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

                      <th
                        scope="col"
                        className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500"
                      >
                        Actions
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
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                task.status ===
                                'COMPLETED'
                                  ? 'bg-green-50 text-green-600'
                                  : task.status ===
                                      'IN_PROGRESS'
                                    ? 'bg-[#FFF4C7] text-[#9A7407]'
                                    : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {getStatusIcon(
                                task.status,
                              )}
                            </div>

                            <p className="font-semibold text-[#18181B]">
                              {task.title}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm font-medium text-gray-500">
                          {getProjectName(
                            task.projectId,
                          )}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${getStatusStyles(
                              task.status,
                            )}`}
                          >
                            {getStatusLabel(
                              task.status,
                            )}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${getPriorityStyles(
                              task.priority,
                            )}`}
                          >
                            {getPriorityLabel(
                              task.priority,
                            )}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                            <CalendarDays size={16} />

                            {formatDueDate(
                              task.dueDate,
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleEditTask(task)
                              }
                              aria-label={`Edit ${task.title}`}
                              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#F5C542]/20"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                void handleDeleteTask(
                                  task,
                                )
                              }
                              aria-label={`Delete ${task.title}`}
                              className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile */}
            <div className="grid min-w-0 gap-4 md:hidden">
              {filteredTasks.map((task) => (
                <article
                  key={task.id}
                  className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        task.status === 'COMPLETED'
                          ? 'bg-green-50 text-green-600'
                          : task.status ===
                              'IN_PROGRESS'
                            ? 'bg-[#FFF4C7] text-[#9A7407]'
                            : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {getStatusIcon(task.status)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="break-words text-sm font-bold leading-6 text-[#18181B]">
                        {task.title}
                      </h2>

                      <p className="mt-1 truncate text-xs font-medium text-gray-500">
                        {getProjectName(
                          task.projectId,
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${getStatusStyles(
                        task.status,
                      )}`}
                    >
                      {getStatusLabel(task.status)}
                    </span>

                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${getPriorityStyles(
                        task.priority,
                      )}`}
                    >
                      {getPriorityLabel(
                        task.priority,
                      )}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-gray-500">
                      <CalendarDays
                        size={15}
                        aria-hidden="true"
                        className="shrink-0"
                      />

                      <span className="truncate">
                        {formatDueDate(
                          task.dueDate,
                        )}
                      </span>
                    </div>

                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleEditTask(task)
                        }
                        aria-label={`Edit ${task.title}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#F5C542]/20"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void handleDeleteTask(task)
                        }
                        aria-label={`Delete ${task.title}`}
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
              {tasks.length === 0
                ? 'No tasks yet'
                : 'No tasks found'}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {tasks.length === 0
                ? 'Create your first task to start managing your workspace.'
                : 'Try changing your search, status or priority filter.'}
            </p>

            {tasks.length === 0 && (
              <button
                type="button"
                onClick={handleCreateTask}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F5C542] px-4 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#E9B931] focus:outline-none focus:ring-4 focus:ring-[#F5C542]/30"
              >
                <Plus size={18} />
                Create your first task
              </button>
            )}
          </div>
        )}
      </section>

      {/* Task form */}
      {isFormOpen && (
        <TaskForm
          task={editingTask}
          projects={projects}
          onClose={() => {
            if (!isSubmitting) {
              setIsFormOpen(false)
              setEditingTask(null)
            }
          }}
          onSubmit={handleSubmitTask}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}

export default Tasks