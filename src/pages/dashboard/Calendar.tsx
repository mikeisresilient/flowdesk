import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Plus,
} from 'lucide-react'
import { useMemo, useState } from 'react'

type CalendarEvent = {
  id: number
  title: string
  date: string
  time: string
  type: 'meeting' | 'deadline' | 'task'
  location?: string
}

const calendarEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Design review',
    date: '2026-09-10',
    time: '10:00 AM',
    type: 'meeting',
    location: 'Design Room',
  },
  {
    id: 2,
    title: 'Website redesign deadline',
    date: '2026-09-18',
    time: '5:00 PM',
    type: 'deadline',
  },
  {
    id: 3,
    title: 'Team stand-up',
    date: '2026-09-14',
    time: '9:00 AM',
    type: 'meeting',
    location: 'Online',
  },
  {
    id: 4,
    title: 'Campaign assets review',
    date: '2026-09-16',
    time: '2:00 PM',
    type: 'task',
  },
  {
    id: 5,
    title: 'Client presentation',
    date: '2026-09-22',
    time: '11:30 AM',
    type: 'meeting',
    location: 'Conference Room',
  },
  {
    id: 6,
    title: 'Mobile app milestone',
    date: '2026-09-26',
    time: '4:00 PM',
    type: 'deadline',
  },
  {
    id: 7,
    title: 'Weekly planning',
    date: '2026-09-28',
    time: '9:30 AM',
    type: 'meeting',
    location: 'Online',
  },
]

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

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getDaysInMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const startingDay = firstDay.getDay()
  const totalDays = lastDay.getDate()

  const previousMonthLastDay = new Date(year, month, 0).getDate()

  const days: {
    date: Date
    isCurrentMonth: boolean
  }[] = []

  for (let index = startingDay - 1; index >= 0; index -= 1) {
    days.push({
      date: new Date(year, month - 1, previousMonthLastDay - index),
      isCurrentMonth: false,
    })
  }

  for (let day = 1; day <= totalDays; day += 1) {
    days.push({
      date: new Date(year, month, day),
      isCurrentMonth: true,
    })
  }

  let nextMonthDay = 1

  while (days.length < 42) {
    days.push({
      date: new Date(year, month + 1, nextMonthDay),
      isCurrentMonth: false,
    })

    nextMonthDay += 1
  }

  return days
}

function Calendar() {
  const today = new Date()
  const todayKey = formatDateKey(today)

  const [currentDate, setCurrentDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )

  const [selectedDate, setSelectedDate] = useState(todayKey)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const days = useMemo(
    () => getDaysInMonth(year, month),
    [year, month],
  )

  const eventsByDate = useMemo(() => {
    return calendarEvents.reduce<Record<string, CalendarEvent[]>>(
      (accumulator, event) => {
        if (!accumulator[event.date]) {
          accumulator[event.date] = []
        }

        accumulator[event.date].push(event)

        return accumulator
      },
      {},
    )
  }, [])

  const selectedEvents = eventsByDate[selectedDate] ?? []

  /*
   * No useMemo needed here.
   *
   * This is a small static list and calculating it directly avoids
   * unnecessary React Compiler memoization issues.
   */
  const upcomingEvents = calendarEvents
    .filter((event) => event.date >= todayKey)
    .sort((a, b) => {
      return `${a.date} ${a.time}`.localeCompare(
        `${b.date} ${b.time}`,
      )
    })
    .slice(0, 5)

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(
      new Date(today.getFullYear(), today.getMonth(), 1),
    )

    setSelectedDate(todayKey)
  }

  const getEventTypeStyles = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-50 text-blue-700'

      case 'deadline':
        return 'bg-red-50 text-red-700'

      case 'task':
        return 'bg-[#FFF4C7] text-[#806207]'

      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatEventDate = (date: string) => {
    const eventDate = new Date(`${date}T12:00:00`)

    return eventDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
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
            Keep track of meetings, deadlines and important project dates.
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
                  ? `${selectedEvents.length} event${
                      selectedEvents.length === 1 ? '' : 's'
                    } selected`
                  : 'Select a date to view events'}
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
                  onClick={goToPreviousMonth}
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
            {days.map(({ date, isCurrentMonth }) => {
              const dateKey = formatDateKey(date)
              const dayEvents = eventsByDate[dateKey] ?? []
              const isToday = dateKey === todayKey
              const isSelected = dateKey === selectedDate

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => setSelectedDate(dateKey)}
                  aria-label={`${date.toLocaleDateString(
                    'en-US',
                    {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    },
                  )}${
                    dayEvents.length > 0
                      ? `, ${dayEvents.length} events`
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
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`
                          truncate
                          rounded-md
                          px-1.5
                          py-1
                          text-[10px]
                          font-semibold
                          ${getEventTypeStyles(event.type)}
                          lg:text-[11px]
                        `}
                      >
                        {event.title}
                      </div>
                    ))}

                    {dayEvents.length > 2 && (
                      <p className="px-1 text-[10px] font-semibold text-gray-400">
                        +{dayEvents.length - 2} more
                      </p>
                    )}
                  </div>

                  {/* Mobile event indicators */}
                  {dayEvents.length > 0 && (
                    <div className="mt-2 flex gap-1 sm:hidden">
                      {dayEvents.slice(0, 3).map((event) => (
                        <span
                          key={event.id}
                          aria-hidden="true"
                          className={`
                            h-1.5
                            w-1.5
                            rounded-full
                            ${
                              event.type === 'deadline'
                                ? 'bg-red-500'
                                : event.type === 'meeting'
                                  ? 'bg-blue-500'
                                  : 'bg-[#D9A514]'
                            }
                          `}
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* Upcoming events */}
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
                  Your next important events
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            {upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => {
                      setSelectedDate(event.date)

                      setCurrentDate(
                        new Date(
                          Number(event.date.slice(0, 4)),
                          Number(event.date.slice(5, 7)) - 1,
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
                            ${getEventTypeStyles(event.type)}
                          `}
                        >
                          {event.type}
                        </span>

                        <h3 className="mt-2 truncate text-sm font-bold text-[#18181B]">
                          {event.title}
                        </h3>
                      </div>

                      <span className="shrink-0 text-xs font-bold text-[#B38708]">
                        {formatEventDate(event.date)}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-gray-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={13} />
                        {event.time}
                      </span>

                      {event.location && (
                        <span className="inline-flex min-w-0 items-center gap-1.5">
                          <MapPin size={13} />

                          <span className="truncate">
                            {event.location}
                          </span>
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm font-semibold text-gray-600">
                  No upcoming events
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Your schedule is clear.
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
              {new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
                'en-US',
                {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                },
              )}
            </h2>
          </div>

          <span className="text-sm font-semibold text-gray-400">
            {selectedEvents.length}{' '}
            {selectedEvents.length === 1 ? 'event' : 'events'}
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
                      ${getEventTypeStyles(event.type)}
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

                    {event.location && (
                      <p className="mt-1 flex items-center gap-1 text-xs font-medium text-gray-400">
                        <MapPin size={12} />
                        {event.location}
                      </p>
                    )}
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
              There are no events on this date.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Calendar