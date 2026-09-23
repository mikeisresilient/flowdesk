import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Plus,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import LoadingState from '../../components/ui/LoadingState'
import ErrorState from '../../components/ui/ErrorState'
import {
  getTasks,
  type Task,
} from '../../services/taskService'

type CalendarEvent = {
  id: string
  title: string
  date: string
  time: string
  type: 'task'
  status: Task['status']
  priority: Task['priority']
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const weekDays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
]

function formatDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(
    2,
    '0',
  )
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getDaysInMonth(
  year: number,
  month: number,
) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const startingDay = firstDay.getDay()
  const totalDays = lastDay.getDate()

  const previousMonthLastDay = new Date(
    year,
    month,
    0,
  ).getDate()

  const days: {
    date: Date
    isCurrentMonth: boolean
  }[] = []

  for (
    let index = startingDay - 1;
    index >= 0;
    index -= 1
  ) {
    days.push({
      date: new Date(
        year,
        month - 1,
        previousMonthLastDay - index,
      ),
      isCurrentMonth: false,
    })
  }

  for (
    let day = 1;
    day <= totalDays;
    day += 1
  ) {
    days.push({
      date: new Date(year, month, day),
      isCurrentMonth: true,
    })
  }

  let nextMonthDay = 1

  while (days.length < 42) {
    days.push({
      date: new Date(
        year,
        month + 1,
        nextMonthDay,
      ),
      isCurrentMonth: false,
    })

    nextMonthDay += 1
  }

  return days
}

function formatEventTime(dateString: string) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(dateString))
}

function formatEventDate(date: string) {
  const eventDate = new Date(
    `${date}T12:00:00`,
  )

  return eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function getTaskEventStyles(
  status: Task['status'],
) {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-50 text-green-700'

    case 'IN_PROGRESS':
      return 'bg-[#FFF4C7] text-[#806207]'

    case 'TODO':
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

function Calendar() {
  const today = new Date()
  const todayKey = formatDateKey(today)

  const [currentDate, setCurrentDate] =
    useState(
      () =>
        new Date(
          today.getFullYear(),
          today.getMonth(),
          1,
        ),
    )

  const [selectedDate, setSelectedDate] =
    useState(todayKey)

  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] =
    useState(true)
  const [hasError, setHasError] =
    useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadTasks() {
      setIsLoading(true)
      setHasError(false)

      try {
        const taskData = await getTasks()

        if (!isMounted) {
          return
        }

        setTasks(taskData)
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

    void loadTasks()

    return () => {
      isMounted = false
    }
  }, [])

  const calendarEvents =
    useMemo<CalendarEvent[]>(() => {
      return tasks
        .filter((task) => task.dueDate)
        .map((task) => {
          const dueDate = new Date(
            task.dueDate as string,
          )

          return {
            id: task.id,
            title: task.title,
            date: formatDateKey(dueDate),
            time: formatEventTime(
              task.dueDate as string,
            ),
            type: 'task',
            status: task.status,
            priority: task.priority,
          }
        })
    }, [tasks])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const days = useMemo(
    () => getDaysInMonth(year, month),
    [year, month],
  )

  const eventsByDate = useMemo(() => {
    return calendarEvents.reduce<
      Record<string, CalendarEvent[]>
    >((accumulator, event) => {
      if (!accumulator[event.date]) {
        accumulator[event.date] = []
      }

      accumulator[event.date].push(event)

      return accumulator
    }, {})
  }, [calendarEvents])

  const selectedEvents =
    eventsByDate[selectedDate] ?? []

  const upcomingEvents = useMemo(() => {
    return calendarEvents
      .filter(
        (event) => event.date >= todayKey,
      )
      .sort((a, b) =>
        `${a.date} ${a.time}`.localeCompare(
          `${b.date} ${b.time}`,
        ),
      )
      .slice(0, 5)
  }, [calendarEvents, todayKey])

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1),
    )
  }

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1),
    )
  }

  const goToToday = () => {
    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      ),
    )

    setSelectedDate(todayKey)
  }

  if (isLoading) {
    return (
      <LoadingState message="Loading calendar..." />
    )
  }

  if (hasError) {
    return (
      <ErrorState
        message="We couldn't load your calendar. Please try again."
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="min-w-0 pb-10">
      {/* Page header */}
      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#B38708]">
            Workspace
          </p>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-[#18181B] sm:text-3xl">
            Calendar
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Keep track of task deadlines and important project dates.
          </p>
        </div>

        <button
          type="button"
          disabled
          title="Create a task with a due date to add it to the calendar."
          className="
            inline-flex
            w-full
            shrink-0
            cursor-not-allowed
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
            opacity-60
            sm:w-auto
          "
        >
          <Plus size={18} />
          Add event
        </button>
      </div>

      {/* Calendar + upcoming */}
      <div className="mt-8 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Calendar */}
        <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Calendar header */}
          <div className="flex min-w-0 flex-col gap-4 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-black text-[#18181B] sm:text-xl">
                {monthNames[month]} {year}
              </h2>

              <p className="mt-1 text-xs font-medium text-gray-400">
                {selectedEvents.length > 0
                  ? `${selectedEvents.length} task${
                      selectedEvents.length ===
                      1
                        ? ''
                        : 's'
                    } selected`
                  : 'Select a date to view tasks'}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <button
                type="button"
                onClick={goToToday}
                className="
                  rounded-lg
                  border
                  border-gray-200
                  px-3
                  py-2
                  text-xs
                  font-bold
                  text-gray-700
                  transition
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#F5C542]
                "
              >
                Today
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={
                    goToPreviousMonth
                  }
                  aria-label="Previous month"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-gray-200
                    text-gray-600
                    transition
                    hover:bg-gray-50
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#F5C542]
                  "
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="Next month"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-gray-200
                    text-gray-600
                    transition
                    hover:bg-gray-50
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#F5C542]
                  "
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 border-b border-gray-100 bg-[#FAFAF8]">
            {weekDays.map((day) => (
              <div
                key={day}
                className="
                  px-1
                  py-3
                  text-center
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-400
                  sm:px-2
                  sm:text-xs
                "
              >
                <span className="sm:hidden">
                  {day.charAt(0)}
                </span>

                <span className="hidden sm:inline">
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {days.map(
              ({ date, isCurrentMonth }) => {
                const dateKey =
                  formatDateKey(date)

                const dayEvents =
                  eventsByDate[dateKey] ?? []

                const isToday =
                  dateKey === todayKey

                const isSelected =
                  dateKey === selectedDate

                return (
                  <button
                    key={dateKey}
                    type="button"
                    onClick={() =>
                      setSelectedDate(
                        dateKey,
                      )
                    }
                    aria-label={`${date.toLocaleDateString(
                      'en-US',
                      {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      },
                    )}${
                      dayEvents.length > 0
                        ? `, ${dayEvents.length} tasks`
                        : ''
                    }`}
                    className={`
                      relative
                      min-h-[76px]
                      min-w-0
                      border-b
                      border-r
                      border-gray-100
                      p-1.5
                      text-left
                      transition
                      hover:bg-[#FAFAF8]
                      focus:z-10
                      focus:outline-none
                      focus:ring-2
                      focus:ring-inset
                      focus:ring-[#F5C542]
                      sm:min-h-[100px]
                      sm:p-2
                      lg:min-h-[115px]
                      ${
                        isSelected
                          ? 'bg-[#FFF9E5]'
                          : 'bg-white'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span
                        className={`
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-xs
                          font-bold
                          sm:h-8
                          sm:w-8
                          sm:text-sm
                          ${
                            isToday
                              ? 'bg-[#F5C542] text-[#18181B]'
                              : isSelected
                                ? 'bg-[#18181B] text-white'
                                : isCurrentMonth
                                  ? 'text-gray-700'
                                  : 'text-gray-300'
                          }
                        `}
                      >
                        {date.getDate()}
                      </span>

                      {dayEvents.length > 0 && (
                        <span
                          aria-hidden="true"
                          className="
                            mt-1
                            h-1.5
                            w-1.5
                            shrink-0
                            rounded-full
                            bg-[#D9A514]
                            sm:h-2
                            sm:w-2
                          "
                        />
                      )}
                    </div>

                    {/* Desktop events */}
                    <div className="mt-2 hidden space-y-1 sm:block">
                      {dayEvents
                        .slice(0, 2)
                        .map((event) => (
                          <div
                            key={event.id}
                            className={`
                              truncate
                              rounded-md
                              px-1.5
                              py-1
                              text-[10px]
                              font-semibold
                              ${getTaskEventStyles(
                                event.status,
                              )}
                              lg:text-[11px]
                            `}
                          >
                            {event.title}
                          </div>
                        ))}

                      {dayEvents.length > 2 && (
                        <p className="px-1 text-[10px] font-semibold text-gray-400">
                          +{dayEvents.length - 2}{' '}
                          more
                        </p>
                      )}
                    </div>

                    {/* Mobile indicators */}
                    {dayEvents.length > 0 && (
                      <div className="mt-2 flex gap-1 sm:hidden">
                        {dayEvents
                          .slice(0, 3)
                          .map((event) => (
                            <span
                              key={event.id}
                              aria-hidden="true"
                              className={`
                                h-1.5
                                w-1.5
                                rounded-full
                                ${
                                  event.status ===
                                  'COMPLETED'
                                    ? 'bg-green-500'
                                    : event.status ===
                                        'IN_PROGRESS'
                                      ? 'bg-[#D9A514]'
                                      : 'bg-gray-400'
                                }
                              `}
                            />
                          ))}
                      </div>
                    )}
                  </button>
                )
              },
            )}
          </div>
        </section>

        {/* Upcoming tasks */}
        <aside className="min-w-0 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF4C7] text-[#9A7407]">
                <CalendarDays size={19} />
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-black text-[#18181B]">
                  Upcoming
                </h2>

                <p className="text-xs font-medium text-gray-400">
                  Your next task deadlines
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            {upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map(
                  (event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => {
                        setSelectedDate(
                          event.date,
                        )

                        setCurrentDate(
                          new Date(
                            Number(
                              event.date.slice(
                                0,
                                4,
                              ),
                            ),
                            Number(
                              event.date.slice(
                                5,
                                7,
                              ),
                            ) - 1,
                            1,
                          ),
                        )
                      }}
                      className="
                        w-full
                        min-w-0
                        rounded-xl
                        border
                        border-gray-100
                        bg-[#FAFAF8]
                        p-4
                        text-left
                        transition
                        hover:border-gray-200
                        hover:bg-white
                        hover:shadow-sm
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#F5C542]
                      "
                    >
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-2
                              py-1
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-wide
                              ${getTaskEventStyles(
                                event.status,
                              )}
                            `}
                          >
                            {event.status ===
                            'TODO'
                              ? 'To do'
                              : event.status ===
                                  'IN_PROGRESS'
                                ? 'In progress'
                                : 'Completed'}
                          </span>

                          <h3 className="mt-2 truncate text-sm font-bold text-[#18181B]">
                            {event.title}
                          </h3>
                        </div>

                        <span className="shrink-0 text-xs font-bold text-[#B38708]">
                          {formatEventDate(
                            event.date,
                          )}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <Clock3 size={13} />
                        {event.time}
                      </div>
                    </button>
                  ),
                )}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm font-semibold text-gray-600">
                  No upcoming tasks
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Tasks with due dates will appear here.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Selected date */}
      <section className="mt-6 min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
              Selected date
            </p>

            <h2 className="mt-1 text-lg font-black text-[#18181B]">
              {new Date(
                `${selectedDate}T12:00:00`,
              ).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </h2>
          </div>

          <span className="text-sm font-semibold text-gray-400">
            {selectedEvents.length}{' '}
            {selectedEvents.length === 1
              ? 'task'
              : 'tasks'}
          </span>
        </div>

        {selectedEvents.length > 0 ? (
          <div className="mt-5 grid min-w-0 gap-3 md:grid-cols-2">
            {selectedEvents.map((event) => (
              <div
                key={event.id}
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-gray-100
                  bg-[#FAFAF8]
                  p-4
                "
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className={`
                      mt-0.5
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      ${getTaskEventStyles(
                        event.status,
                      )}
                    `}
                  >
                    <Clock3 size={16} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-sm font-bold text-[#18181B]">
                      {event.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-500">
                      {event.time}
                    </p>

                    <p className="mt-1 text-xs font-medium text-gray-400">
                      {event.status ===
                      'TODO'
                        ? 'To do'
                        : event.status ===
                            'IN_PROGRESS'
                          ? 'In progress'
                          : 'Completed'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-dashed border-gray-200 bg-[#FAFAF8] px-5 py-8 text-center">
            <CalendarDays
              size={22}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-sm font-semibold text-gray-600">
              Nothing scheduled
            </p>

            <p className="mt-1 text-xs text-gray-400">
              There are no tasks due on this date.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Calendar