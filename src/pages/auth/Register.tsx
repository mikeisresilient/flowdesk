import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, User } from 'lucide-react'
import { Link } from 'react-router-dom'

function Register() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#B38708]">
        Create your workspace
      </p>

      <h1 className="mt-3 text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
        Create your account
      </h1>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        Start organizing your projects and tasks with FlowDesk.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Full name
          </label>

          <div className="relative">
            <User
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Michael Ege"
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="register-email"
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
              id="register-email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              minLength={8}
              required
              placeholder="Minimum 8 characters"
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Use at least 8 characters.
          </p>
        </div>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 accent-[#F5C542]"
          />

          <span className="text-sm leading-6 text-gray-600">
            I agree to the Terms of Service and Privacy Policy.
          </span>
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#F5C542] px-5 py-3.5 text-sm font-black text-[#171717] transition hover:bg-[#E9B72F] focus:outline-none focus:ring-2 focus:ring-[#D9A514] focus:ring-offset-2"
        >
          Create account
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#8A6805] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default Register