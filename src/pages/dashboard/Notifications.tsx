import {
  Bell,
  Check,
  CheckCheck,
  Clock3,
  Info,
  MessageSquare,
  Trash2,
} from 'lucide-react'
import { useMemo, useState } from 'react'

type NotificationType =
  | 'task'
  | 'project'
  | 'message'
  | 'system'

type Notification = {
  id: number
  title: string
  description: string
  time: string
  type: NotificationType
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'Task assigned to you',
    description:
      'You have been assigned "Design homepage wireframe" in Website Redesign.',
    time: '10 minutes ago',
    type: 'task',
    read: false,
  },
  {
    id: 2,
    title: 'Project deadline approaching',
    description:
      'Website Redesign is due in 8 days. Your current progress is 72%.',
    time: '1 hour ago',
    type: 'project',
    read: false,
  },
  {
    id: 3,
    title: 'New team message',
    description:
      'John sent you a message about the upcoming design review.',
    time: '2 hours ago',
    type: 'message',
    read: false,
  },
  {
    id: 4,
    title: 'Task completed',
    description:
      'The "Update client dashboard" task has been marked as completed.',
    time: 'Yesterday',
    type: 'task',
    read: true,
  },
  {
    id: 5,
    title: 'System update',
    description:
      'FlowDesk has been updated with improvements to your workspace.',
    time: 'Yesterday',
    type: 'system',
    read: true,
  },
  {
    id: 6,
    title: 'Project status changed',
    description:
      'Mobile App has been moved to At risk. Review the project timeline.',
    time: '2 days ago',
    type: 'project',
    read: true,
  },
]

function Notifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications,
  )

  const [filter, setFilter] = useState<'All' | 'Unread'>('All')

  const unreadCount = notifications.filter(
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

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const removeNotification = (id: number) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    )
  }

  const getNotificationIcon = (type: NotificationType) => {
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

  const getNotificationIconStyles = (type: NotificationType) => {
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
            onClick={markAllAsRead}
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
              sm:w-auto
            "
          >
            <CheckCheck size={17} />
            Mark all as read
          </button>
        )}
      </div>

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
              onClick={() => setFilter('All')}
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
              aria-selected={filter === 'Unread'}
              onClick={() => setFilter('Unread')}
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
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
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
                    {getNotificationIcon(notification.type)}
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
                          {notification.description}
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
                          onClick={() =>
                            markAsRead(notification.id)
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
                          "
                        >
                          <Check size={14} />
                          Mark as read
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          removeNotification(notification.id)
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
                        "
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
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

            {filter === 'Unread' && notifications.length > 0 && (
              <button
                type="button"
                onClick={() => setFilter('All')}
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