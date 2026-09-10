import { Bell, Search } from 'lucide-react'

function DashboardHeader() {
  return (
    <header className="hidden h-[72px] items-center justify-between border-b border-gray-200 bg-white px-6 lg:flex xl:px-8">
      <div>
        <p className="text-sm font-semibold text-gray-500">
          Workspace
        </p>

        <h1 className="text-lg font-black text-gray-900">
          Overview
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden xl:block">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            aria-label="Search workspace"
            placeholder="Search workspace..."
            className="w-64 rounded-xl border border-gray-200 bg-[#FAFAF8] py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F5C542]"
        >
          <Bell size={19} />

          <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-[#F5C542]" />
        </button>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18181B] text-xs font-bold text-white">
            ME
          </div>

          <div className="hidden xl:block">
            <p className="text-sm font-bold text-gray-900">
              Michael Ege
            </p>

            <p className="text-xs text-gray-500">
              Personal workspace
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader