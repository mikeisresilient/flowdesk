import {
  Bell,
  Check,
  KeyRound,
  LockKeyhole,
  Mail,
  Save,
  ShieldCheck,
  User,
} from 'lucide-react'
import { useState } from 'react'

type ToggleProps = {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label: string
}

function Toggle({ enabled, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={`
        relative
        inline-flex
        h-6
        w-11
        shrink-0
        cursor-pointer
        items-center
        rounded-full
        transition
        focus:outline-none
        focus:ring-4
        focus:ring-[#F5C542]/20
        ${
          enabled
            ? 'bg-[#F5C542]'
            : 'bg-gray-200'
        }
      `}
    >
      <span
        className={`
          inline-block
          h-5
          w-5
          rounded-full
          bg-white
          shadow-sm
          transition-transform
          ${
            enabled
              ? 'translate-x-5'
              : 'translate-x-0.5'
          }
        `}
      />
    </button>
  )
}

function Settings() {
  const [fullName, setFullName] = useState('Michael Ege')
  const [email, setEmail] = useState('michael@example.com')
  const [role, setRole] = useState('Product Developer')

  const [emailNotifications, setEmailNotifications] =
    useState(true)

  const [taskNotifications, setTaskNotifications] =
    useState(true)

  const [projectNotifications, setProjectNotifications] =
    useState(true)

  const [messageNotifications, setMessageNotifications] =
    useState(false)

  const [weeklySummary, setWeeklySummary] =
    useState(true)

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)

    window.setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <div className="min-w-0 pb-10">
      {/* Header */}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#B38708]">
          Workspace
        </p>

        <h1 className="mt-1 text-2xl font-black tracking-tight text-[#18181B] sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Manage your profile, preferences and workspace notifications.
        </p>
      </div>

      <div className="mt-8 grid min-w-0 gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
        {/* Settings navigation */}
        <aside className="hidden xl:block">
          <nav
            aria-label="Settings navigation"
            className="sticky top-24 space-y-1"
          >
            <a
              href="#profile"
              className="
                flex
                items-center
                gap-3
                rounded-xl
                bg-[#FFF4C7]
                px-4
                py-3
                text-sm
                font-bold
                text-[#806207]
                focus:outline-none
                focus:ring-2
                focus:ring-[#F5C542]
              "
            >
              <User size={17} />
              Profile
            </a>

            <a
              href="#notifications"
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-[#F5C542]
              "
            >
              <Bell size={17} />
              Notifications
            </a>

            <a
              href="#security"
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-[#F5C542]
              "
            >
              <ShieldCheck size={17} />
              Security
            </a>
          </nav>
        </aside>

        {/* Main settings */}
        <div className="min-w-0 space-y-6">
          {/* Profile */}
          <section
            id="profile"
            className="
              min-w-0
              scroll-mt-24
              rounded-2xl
              border
              border-gray-200
              bg-white
              shadow-sm
            "
          >
            <div className="border-b border-gray-100 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF4C7] text-[#9A7407]">
                  <User size={19} />
                </div>

                <div>
                  <h2 className="text-base font-black text-[#18181B]">
                    Profile
                  </h2>

                  <p className="mt-0.5 text-xs font-medium text-gray-400">
                    Update your personal information.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid min-w-0 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <div className="min-w-0">
                <label
                  htmlFor="full-name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full name
                </label>

                <input
                  id="full-name"
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  className="
                    block
                    w-full
                    min-w-0
                    rounded-xl
                    border
                    border-gray-200
                    bg-[#FAFAF8]
                    px-4
                    py-3
                    text-sm
                    text-gray-700
                    outline-none
                    transition
                    focus:border-[#D9A514]
                    focus:ring-4
                    focus:ring-[#F5C542]/15
                  "
                />
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Role
                </label>

                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(event) =>
                    setRole(event.target.value)
                  }
                  className="
                    block
                    w-full
                    min-w-0
                    rounded-xl
                    border
                    border-gray-200
                    bg-[#FAFAF8]
                    px-4
                    py-3
                    text-sm
                    text-gray-700
                    outline-none
                    transition
                    focus:border-[#D9A514]
                    focus:ring-4
                    focus:ring-[#F5C542]/15
                  "
                />
              </div>

              <div className="min-w-0 sm:col-span-2">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
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
                      focus:border-[#D9A514]
                      focus:ring-4
                      focus:ring-[#F5C542]/15
                    "
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section
            id="notifications"
            className="
              min-w-0
              scroll-mt-24
              rounded-2xl
              border
              border-gray-200
              bg-white
              shadow-sm
            "
          >
            <div className="border-b border-gray-100 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Bell size={19} />
                </div>

                <div>
                  <h2 className="text-base font-black text-[#18181B]">
                    Notifications
                  </h2>

                  <p className="mt-0.5 text-xs font-medium text-gray-400">
                    Choose what updates you want to receive.
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {/* Email */}
              <div className="flex min-w-0 items-center justify-between gap-5 p-5 sm:p-6">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#18181B]">
                    Email notifications
                  </h3>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
                    Receive important FlowDesk updates and
                    activity by email.
                  </p>
                </div>

                <Toggle
                  enabled={emailNotifications}
                  onChange={setEmailNotifications}
                  label="Email notifications"
                />
              </div>

              {/* Tasks */}
              <div className="flex min-w-0 items-center justify-between gap-5 p-5 sm:p-6">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#18181B]">
                    Task updates
                  </h3>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
                    Get notified when tasks are assigned,
                    completed or updated.
                  </p>
                </div>

                <Toggle
                  enabled={taskNotifications}
                  onChange={setTaskNotifications}
                  label="Task notifications"
                />
              </div>

              {/* Projects */}
              <div className="flex min-w-0 items-center justify-between gap-5 p-5 sm:p-6">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#18181B]">
                    Project updates
                  </h3>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
                    Stay informed about project progress and
                    important changes.
                  </p>
                </div>

                <Toggle
                  enabled={projectNotifications}
                  onChange={setProjectNotifications}
                  label="Project notifications"
                />
              </div>

              {/* Messages */}
              <div className="flex min-w-0 items-center justify-between gap-5 p-5 sm:p-6">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#18181B]">
                    Team messages
                  </h3>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
                    Receive notifications when teammates send
                    you a message.
                  </p>
                </div>

                <Toggle
                  enabled={messageNotifications}
                  onChange={setMessageNotifications}
                  label="Message notifications"
                />
              </div>

              {/* Weekly */}
              <div className="flex min-w-0 items-center justify-between gap-5 p-5 sm:p-6">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#18181B]">
                    Weekly summary
                  </h3>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
                    Receive a weekly overview of your workspace
                    activity.
                  </p>
                </div>

                <Toggle
                  enabled={weeklySummary}
                  onChange={setWeeklySummary}
                  label="Weekly summary"
                />
              </div>
            </div>
          </section>

          {/* Security */}
          <section
            id="security"
            className="
              min-w-0
              scroll-mt-24
              rounded-2xl
              border
              border-gray-200
              bg-white
              shadow-sm
            "
          >
            <div className="border-b border-gray-100 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h2 className="text-base font-black text-[#18181B]">
                    Security
                  </h2>

                  <p className="mt-0.5 text-xs font-medium text-gray-400">
                    Manage your account security.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-gray-100 bg-[#FAFAF8] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500">
                    <KeyRound size={17} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#18181B]">
                      Password
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Change your account password regularly to
                      keep your account secure.
                    </p>
                  </div>
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
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2.5
                    text-xs
                    font-bold
                    text-gray-700
                    transition
                    hover:bg-gray-50
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#F5C542]
                    sm:w-auto
                  "
                >
                  <LockKeyhole size={14} />
                  Change password
                </button>
              </div>

              <div className="flex min-w-0 items-start gap-3 rounded-xl border border-green-100 bg-green-50/50 p-4">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-green-800">
                    Account security
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-green-700/80">
                    Your account is currently protected with
                    password authentication.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Save */}
          <div className="sticky bottom-4 z-20 flex min-w-0 flex-col gap-3 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div className="flex min-w-0 items-center gap-2">
              {saved && (
                <>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <Check size={15} />
                  </span>

                  <p className="text-xs font-semibold text-green-700">
                    Settings saved successfully.
                  </p>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#F5C542]
                px-5
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
              <Save size={17} />
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings