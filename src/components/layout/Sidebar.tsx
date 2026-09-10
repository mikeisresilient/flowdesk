import {
  Bell,
  CalendarDays,
  CheckSquare,
  FolderKanban,
  Home,
  LogOut,
  Settings,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: Home,
  },
  {
    label: 'Projects',
    to: '/dashboard/projects',
    icon: FolderKanban,
  },
  {
    label: 'Tasks',
    to: '/dashboard/tasks',
    icon: CheckSquare,
  },
  {
    label: 'Calendar',
    to: '/dashboard/calendar',
    icon: CalendarDays,
  },
  {
    label: 'Notifications',
    to: '/dashboard/notifications',
    icon: Bell,
  },
]

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    onClose()
    navigate('/login', { replace: true })
  }

  const displayName = user?.name || 'FlowDesk User'
  const displayEmail = user?.email || 'Personal workspace'

  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-[72px] items-center justify-between border-b border-gray-200 px-5">
        <NavLink
          to="/dashboard"
          onClick={onClose}
          className="flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5C542] text-sm font-black text-[#171717]">
            F
          </span>

          <span className="text-xl font-bold tracking-tight text-[#171717]">
            Flow<span className="text-[#D9A514]">Desk</span>
          </span>
        </NavLink>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F5C542] lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav
        aria-label="Dashboard navigation"
        className="flex-1 px-3 py-5"
      >
        <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#FFF4C7] text-[#806313]'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            )
          })}
        </div>

        <p className="mt-8 px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
          Account
        </p>

        <NavLink
          to="/dashboard/settings"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
              isActive
                ? 'bg-[#FFF4C7] text-[#806313]'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="rounded-xl bg-[#FAFAF8] p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#18181B] text-xs font-bold text-white">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-gray-900">
                {displayName}
              </p>

              <p className="truncate text-xs text-gray-500">
                {displayEmail}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F5C542] focus:ring-offset-2"
          >
            <LogOut size={16} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar