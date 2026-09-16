import { useState, type SyntheticEvent } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (!acceptedTerms) {
      setError(
        'Please agree to the Terms of Service and Privacy Policy.',
      )
      return
    }

    setIsSubmitting(true)

    try {
      const success = await register(
        trimmedName,
        trimmedEmail,
        password,
      )

      if (!success) {
        setError(
          'Unable to create your account. Please check your details and try again.',
        )
        return
      }

      navigate('/dashboard')
    } finally {
      setIsSubmitting(false)
    }
  }

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

      <form
        className="mt-8 space-y-5"
        onSubmit={handleSubmit}
        noValidate
      >
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

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
              minLength={2}
              maxLength={80}
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              maxLength={128}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={
                showPassword ? 'Hide password' : 'Show password'
              }
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
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
            checked={acceptedTerms}
            onChange={(event) =>
              setAcceptedTerms(event.target.checked)
            }
            className="mt-1 h-4 w-4 accent-[#F5C542]"
          />

          <span className="text-sm leading-6 text-gray-600">
            I agree to the Terms of Service and Privacy Policy.
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[#F5C542] px-5 py-3.5 text-sm font-black text-[#171717] transition hover:bg-[#E9B72F] focus:outline-none focus:ring-2 focus:ring-[#D9A514] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-bold text-[#8A6805] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default Register