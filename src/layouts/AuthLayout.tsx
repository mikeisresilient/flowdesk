import { Outlet } from 'react-router-dom'
import Logo from '../components/common/Logo'

function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="flex min-h-screen flex-col px-5 py-6 sm:px-8 lg:px-12">
          <div>
            <Logo />
          </div>

          <div className="flex flex-1 items-center justify-center py-10">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

          <p className="text-center text-xs text-gray-500">
            © 2026 FlowDesk. Secure workspace access.
          </p>
        </section>

        <aside className="relative hidden overflow-hidden bg-[#18181B] lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,197,66,0.18),_transparent_35%)]" />

          <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
            <div>
              <div className="inline-flex rounded-xl bg-[#F5C542] px-4 py-2 text-sm font-black text-[#171717]">
                FlowDesk
              </div>

              <h2 className="mt-8 max-w-xl text-4xl font-black leading-tight tracking-tight text-white xl:text-5xl">
                Keep your work organized without the clutter.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-gray-400">
                Manage projects, tasks, priorities, and activity from one
                focused workspace built for modern teams.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-400">
                    Today&apos;s progress
                  </p>
                  <p className="mt-1 text-3xl font-black text-white">78%</p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5C542] font-black text-[#171717]">
                  ✓
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[78%] rounded-full bg-[#F5C542]" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default AuthLayout