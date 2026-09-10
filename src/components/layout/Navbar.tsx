import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from '../common/Logo'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-[#FAFAF8]/95 backdrop-blur">
      <nav
        className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Logo />

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            Contact
          </a>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Sign in
          </a>

          <a
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-[#F5C542] px-5 py-2.5 text-sm font-bold text-[#171717] transition hover:bg-[#E9B72F] focus:outline-none focus:ring-2 focus:ring-[#D9A514] focus:ring-offset-2"
          >
            Get started
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F5C542] md:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-gray-200 bg-[#FAFAF8] px-5 py-5 md:hidden"
        >
          <div className="flex flex-col gap-2">
            <a
              href="#features"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Features
            </a>

            <a
              href="#about"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              About
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Contact
            </a>

            <div className="mt-3 border-t border-gray-200 pt-4">
              <a
                href="/login"
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                Sign in
              </a>

              <a
                href="/register"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#F5C542] px-5 py-3 text-sm font-bold text-[#171717] hover:bg-[#E9B72F]"
              >
                Get started
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar