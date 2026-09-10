import { LoaderCircle } from 'lucide-react'

interface LoadingStateProps {
  message?: string
}

function LoadingState({
  message = 'Loading...',
}: LoadingStateProps) {
  return (
    <div
      role="status"
      className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center"
    >
      <LoaderCircle
        size={28}
        aria-hidden="true"
        className="animate-spin text-[#D9A514]"
      />

      <p className="mt-4 text-sm font-semibold text-gray-700">
        {message}
      </p>

      <span className="sr-only">Please wait</span>
    </div>
  )
}

export default LoadingState