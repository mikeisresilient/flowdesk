import {
  Bell,
  Check,
  CheckCheck,
  Clock3,
  Info,
  MessageSquare,
  Trash2,
} from 'lucide-react'
import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type Notification as ApiNotification,
  type NotificationType as ApiNotificationType,
} from '../../services/notificationService'

type NotificationType =
  | 'task'
  | 'project'
  | 'message'
  | 'system'

type Notification = {
  id: string
  title: string
  description: string
  time: string
  type: NotificationType
  read: boolean
}

function formatRelativeTime(
  createdAt: string,
) {
  const createdDate = new Date(createdAt)
  const now = new Date()

  const difference =
    now.getTime() - createdDate.getTime()

  const seconds = Math.floor(
    difference / 1000,
  )

  if (seconds < 60) {
    return 'Just now'
  }

  const minutes = Math.floor(
    seconds / 60,
  )

  if (minutes < 60) {
    return `${minutes} ${
      minutes === 1 ? 'minute' : 'minutes'
    } ago`
  }

  const hours = Math.floor(
    minutes / 60,
  )

  if (hours < 24) {
    return `${hours} ${
      hours === 1 ? 'hour' : 'hours'
    } ago`
  }

  const days = Math.floor(
    hours / 24,
  )

  if (days < 7) {
    return `${days} ${
      days === 1 ? 'day' : 'days'
    } ago`
  }

  return createdDate.toLocaleDateString(
    undefined,
    {
      month: 'short',
      day: 'numeric',
      year:
        createdDate.getFullYear() !==
        now.getFullYear()
          ? 'numeric'
          : undefined,
    },
  )
}

function mapNotificationType(
  type: ApiNotificationType,
): NotificationType {
  switch (type) {
    case 'SUCCESS':
      return 'task'

    case 'WARNING':
      return 'project'

    case 'ERROR':
      return 'system'

    case 'INFO':
    default:
      return 'system'
  }
}

function mapNotification(
  notification: ApiNotification,
): Notification {
  return {
    id: notification.id,
    title: notification.title,
    description: notification.message,
    time: formatRelativeTime(
      notification.createdAt,
    ),
    type: mapNotificationType(
      notification.type,
    ),
    read: notification.isRead,
  }
}

function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>([])

  const [filter, setFilter] = useState<
    'All' | 'Unread'
  >('All')

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const [isMarkingAll, setIsMarkingAll] =
    useState(false)

  const [processingIds, setProcessingIds] =
    useState<Set<string>>(new Set())

  useEffect(() => {
    let isMounted = true

    async function loadNotifications() {
      try {
        setIsLoading(true)
        setError(null)

        const response =
          await getNotifications()

        if (!isMounted) {
          return
        }

        setNotifications(
          response.notifications.map(
            mapNotification,
          ),
        )
      } catch (error) {
        if (!isMounted) {
          return
        }

        setError(
          error instanceof Error
            ? error.message
            : 'Unable to load notifications',
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadNotifications()

    return () => {
      isMounted = false
    }
  }, [])

  const unreadCount =
    notifications.filter(
      (notification) => !notification.read,
    ).length

  const filteredNotifications = useMemo(() => {
    if (filter === 'Unread') {
      return notifications.filter(
        (notification) => !notification.read,
      )
    }

    return notifications
  }, [filter, notifications])

  const setProcessing = (
    id: string,
    processing: boolean,
  ) => {
    setProcessingIds((current) => {
      const next = new Set(current)

      if (processing) {
        next.add(id)
      } else {
        next.delete(id)
      }

      return next
    })
  }

  const markAsRead = async (id: string) => {
    if (processingIds.has(id)) {
      return
    }

    try {
      setProcessing(id, true)

      await markNotificationAsRead(id)

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                read: true,
              }
            : notification,
        ),
      )
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to mark notification as read',
      )
    } finally {
      setProcessing(id, false)
    }
  }

  const markAllAsRead = async () => {
    if (
      unreadCount === 0 ||
      isMarkingAll
    ) {
      return
    }

    try {
      setIsMarkingAll(true)
      setError(null)

      await markAllNotificationsAsRead()

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          read: true,
        })),
      )
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to mark notifications as read',
      )
    } finally {
      setIsMarkingAll(false)
    }
  }

  const removeNotification = async (
    id: string,
  ) => {
    if (processingIds.has(id)) {
      return
    }

    try {
      setProcessing(id, true)

      await deleteNotification(id)

      setNotifications((current) =>
        current.filter(
          (notification) =>
            notification.id !== id,
        ),
      )
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to remove notification',
      )
    } finally {
      setProcessing(id, false)
    }
  }

  const getNotificationIcon = (
    type: NotificationType,
  ) => {
    switch (type) {
      case 'task':
        return <Check size={19} />

      case 'project':
        return <Info size={19} />

      case 'message':
        return <MessageSquare size={19} />

      case 'system':
        return <Bell size={19} />

      default:
        return <Bell size={19} />
    }
  }

  const getNotificationIconStyles = (
    type: NotificationType,
  ) => {
    switch (type) {
      case 'task':
        return 'bg-green-50 text-green-600'

      case 'project':
        return 'bg-[#FFF4C7] text-[#9A7407]'

      case 'message':
        return 'bg-blue-50 text-blue-600'

      case 'system':
        return 'bg-gray-100 text-gray-600'

      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="min-w-0 pb-10">
      {/* Header */}
      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#B38708]">
            Workspace
          </p>

          <div className="mt-1 flex min-w-0 items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-[#18181B] sm:text-3xl">
              Notifications
            </h1>

            {unreadCount > 0 && (
              <span className="shrink-0 rounded-full bg-[#18181B] px-2.5 py-1 text-xs font-bold text-white">
                {unreadCount} new
              </span>
            )}
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Stay up to date with tasks, projects and activity in your
            workspace.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={() => {
              void markAllAsRead()
            }}
            disabled={isMarkingAll}
            className="
              inline-flex
              w-full
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-3
              text-sm
              font-bold
              text-gray-700
              transition
              hover:bg-gray-50
              focus:outline-none
              focus:ring-4
              focus:ring-[#F5C542]/20
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:w-auto
            "
          >
            <CheckCheck size={17} />
            {isMarkingAll
              ? 'Marking...'
              : 'Mark all as read'}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Filters */}
      <section className="mt-8 min-w-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex w-full min-w-0 rounded-xl bg-[#FAFAF8] p-1 sm:w-auto"
            role="tablist"
            aria-label="Notification filters"
          >
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'All'}
              onClick={() =>
                setFilter('All')
              }
              className={`
                flex-1
                rounded-lg
                px-4
                py-2.5
                text-sm
                font-bold
                transition
                focus:outline-none
                focus:ring-2
                focus:ring-[#F5C542]
                sm:flex-none
                ${
                  filter === 'All'
                    ? 'bg-white text-[#18181B] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              All
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={
                filter === 'Unread'
              }
              onClick={() =>
                setFilter('Unread')
              }
              className={`
                flex-1
                rounded-lg
                px-4
                py-2.5
                text-sm
                font-bold
                transition
                focus:outline-none
                focus:ring-2
                focus:ring-[#F5C542]
                sm:flex-none
                ${
                  filter === 'Unread'
                    ? 'bg-white text-[#18181B] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              Unread

              {unreadCount > 0 && (
                <span className="ml-2 text-[#B38708]">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          <p className="text-xs font-medium text-gray-400 sm:text-right">
            {filteredNotifications.length}{' '}
            {filteredNotifications.length === 1
              ? 'notification'
              : 'notifications'}
          </p>
        </div>
      </section>

      {/* Notifications */}
      <section className="mt-6 min-w-0">
        {isLoading ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#F5C542]" />

            <p className="mt-5 text-sm font-semibold text-gray-600">
              Loading notifications...
            </p>
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map(
              (notification) => {
                const isProcessing =
                  processingIds.has(
                    notification.id,
                  )

                return (
                  <article
                    key={notification.id}
                    className={`
                      min-w-0
                      rounded-2xl
                      border
                      p-4
                      shadow-sm
                      transition
                      sm:p-5
                      ${
                        notification.read
                          ? 'border-gray-200 bg-white'
                          : 'border-[#E9D889] bg-[#FFFDF3]'
                      }
                    `}
                  >
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                      {/* Icon */}
                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          sm:h-11
                          sm:w-11
                          ${getNotificationIconStyles(
                            notification.type,
                          )}
                        `}
                      >
                        {getNotificationIcon(
                          notification.type,
                        )}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div className="min-w-0">
                            <div className="flex min-w-0 items-center gap-2">
                              {!notification.read && (
                                <span
                                  aria-label="Unread"
                                  className="h-2 w-2 shrink-0 rounded-full bg-[#D9A514]"
                                />
                              )}

                              <h2
                                className={`
                                  min-w-0
                                  break-words
                                  text-sm
                                  leading-6
                                  ${
                                    notification.read
                                      ? 'font-semibold text-gray-700'
                                      : 'font-bold text-[#18181B]'
                                  }
                                `}
                              >
                                {notification.title}
                              </h2>
                            </div>

                            <p className="mt-1 break-words text-sm leading-6 text-gray-500">
                              {
                                notification.description
                              }
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-gray-400">
                            <Clock3 size={13} />
                            {notification.time}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {!notification.read && (
                            <button
                              type="button"
                              onClick={() => {
                                void markAsRead(
                                  notification.id,
                                )
                              }}
                              disabled={
                                isProcessing
                              }
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-lg
                                px-3
                                py-2
                                text-xs
                                font-bold
                                text-[#806207]
                                transition
                                hover:bg-[#FFF4C7]
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#F5C542]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                              "
                            >
                              <Check size={14} />

                              {isProcessing
                                ? 'Updating...'
                                : 'Mark as read'}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              void removeNotification(
                                notification.id,
                              )
                            }}
                            disabled={
                              isProcessing
                            }
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-lg
                              px-3
                              py-2
                              text-xs
                              font-bold
                              text-gray-400
                              transition
                              hover:bg-red-50
                              hover:text-red-600
                              focus:outline-none
                              focus:ring-2
                              focus:ring-red-200
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            <Trash2 size={14} />
                            {isProcessing
                              ? 'Removing...'
                              : 'Remove'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              },
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF4C7] text-[#9A7407]">
              <Bell size={24} />
            </div>

            <h2 className="mt-5 text-base font-black text-[#18181B]">
              {filter === 'Unread'
                ? 'You are all caught up'
                : 'No notifications'}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {filter === 'Unread'
                ? 'There are no unread notifications in your workspace.'
                : 'New activity and updates will appear here.'}
            </p>

            {filter === 'Unread' &&
              notifications.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setFilter('All')
                  }
                  className="
                    mt-5
                    rounded-xl
                    bg-[#18181B]
                    px-4
                    py-2.5
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:bg-black
                    focus:outline-none
                    focus:ring-4
                    focus:ring-gray-300
                  "
                >
                  View all notifications
                </button>
              )}
          </div>
        )}
      </section>
    </div>
  )
}

export default Notifications