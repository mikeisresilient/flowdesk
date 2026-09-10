import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

function ErrorState({
  message = 'Something went wrong while loading this content.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <AlertCircle
          size={24}
          aria-hidden="true"
          className="text-red-600"
        />
      </div>

      <h3 className="mt-4 text-base font-bold text-gray-900">
        Unable to load content
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F5C542] px-4 py-2.5 text-sm font-bold text-[#171717] transition hover:bg-[#E9B72F] focus:outline-none focus:ring-2 focus:ring-[#D9A514] focus:ring-offset-2"
        >
          <RefreshCw size={16} aria-hidden="true" />
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorState