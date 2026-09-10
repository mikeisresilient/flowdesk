import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const success = login(email, password)

    if (!success) {
      setError('Please enter your email and password.')
      return
    }

    const from = location.state?.from || '/dashboard'
    navigate(from, { replace: true })
  }

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#B38708]">
        Welcome back
      </p>

      <h1 className="mt-3 text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
        Sign in to FlowDesk
      </h1>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        Enter your details to continue to your workspace.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="email"
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
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-[#9A7608] hover:text-[#705604]"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F5C542]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </p>
        )}

        <div className="flex items-center gap-3">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 accent-[#F5C542]"
          />

          <label htmlFor="remember" className="text-sm text-gray-600">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#F5C542] px-5 py-3.5 text-sm font-black text-[#171717] transition hover:bg-[#E9B72F] focus:outline-none focus:ring-2 focus:ring-[#D9A514] focus:ring-offset-2"
        >
          Sign in
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-bold text-[#8A6805] hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}

export default Login