import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import DashboardPreview from '../../components/home/DashboardPreview'

const features = [
  {
    icon: LayoutDashboard,
    title: 'Everything in one place',
    description:
      'Keep projects, tasks, updates, and important information organized inside one workspace.',
  },
  {
    icon: Zap,
    title: 'Move faster',
    description:
      'Reduce unnecessary complexity and help your team focus on the work that actually matters.',
  },
  {
    icon: ShieldCheck,
    title: 'Built with security in mind',
    description:
      'A frontend architecture designed to connect cleanly with secure authentication and backend services.',
  },
]

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            {/* Hero content */}
            <div>
              <p className="mb-6 ml-1 text-sm font-bold uppercase tracking-[0.18em] text-[#B38708]">
                Your workspace, simplified
              </p>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-[-0.04em] text-[#171717] sm:text-6xl lg:text-7xl">
                Work smarter.
                <span className="block text-[#D9A514]">
                  Stay in control.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                FlowDesk gives individuals and teams a clear, organized
                workspace to plan projects, manage tasks, and keep work moving
                forward.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5C542] px-6 py-3.5 text-sm font-bold text-[#171717] shadow-sm transition hover:bg-[#E9B72F] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D9A514] focus:ring-offset-2"
                >
                  Start for free
                  <ArrowRight size={18} />
                </a>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-bold text-gray-800 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#F5C542] focus:ring-offset-2"
                >
                  Explore features
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-green-600" />
                  Easy to use
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-green-600" />
                  Responsive
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-green-600" />
                  Accessible
                </span>
              </div>
            </div>

            {/* Real dashboard preview */}
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-y border-gray-200 bg-white"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-[#B38708]">
              Everything you need
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
              A workspace designed around your workflow.
            </h2>

            <p className="mt-4 text-gray-600">
              Simple tools, thoughtful organization, and a foundation ready to
              grow with your application.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-[#FAFAF8] p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5C542] text-[#171717]">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="rounded-3xl bg-[#18181B] px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-[#F5C542]">
                Built for modern work
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Less clutter. More progress.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400">
                FlowDesk is designed around a simple idea: your productivity
                tools should help you work, not get in the way.
              </p>

              <a
                href="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#F5C542] px-6 py-3.5 text-sm font-bold text-[#171717] transition hover:bg-[#E9B72F]"
              >
                Create your workspace
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home