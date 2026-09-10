import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import DashboardHeader from '../components/layout/DashboardHeader'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-gray-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F5C542]"
          >
            <Menu size={22} />
          </button>

          <div className="ml-3 text-lg font-black tracking-tight">
            Flow<span className="text-[#D9A514]">Desk</span>
          </div>
        </header>

        <DashboardHeader />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout