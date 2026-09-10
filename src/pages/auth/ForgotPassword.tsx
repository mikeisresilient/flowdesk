import { ArrowLeft, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  return (
    <div>
      <Link
        to="/login"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Back to sign in
      </Link>

      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#B38708]">
        Password recovery
      </p>

      <h1 className="mt-3 text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
        Forgot your password?
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-600">
        Enter the email linked to your FlowDesk account and we&apos;ll send
        password reset instructions.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="recovery-email"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="recovery-email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#F5C542] px-5 py-3.5 text-sm font-black text-[#171717] transition hover:bg-[#E9B72F] focus:outline-none focus:ring-2 focus:ring-[#D9A514] focus:ring-offset-2"
        >
          Send reset instructions
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword