import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16 sm:px-6">
      <div className="w-full max-w-xl text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#B38708]">
          Page not found
        </p>

        <h1 className="text-6xl font-black tracking-tight text-[#18181B] sm:text-8xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          We couldn't find that page
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
          The page you're looking for may have been moved, deleted, or the
          address may be incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#F5C542] focus:ring-offset-2"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Go Back
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5C542] px-5 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#D9A514] focus:outline-none focus:ring-2 focus:ring-[#F5C542] focus:ring-offset-2"
          >
            <Home size={18} aria-hidden="true" />
            Back Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound