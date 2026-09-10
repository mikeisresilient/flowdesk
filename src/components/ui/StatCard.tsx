import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-black tracking-tight text-gray-900">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF4C7] text-[#806313]">
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-gray-500">
        {description}
      </p>
    </article>
  )
}

export default StatCard