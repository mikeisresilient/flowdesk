import Logo from '../common/Logo'

function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-gray-200 bg-white"
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />

          <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">
            A simple workspace for organizing projects, managing tasks,
            and keeping your team focused on what matters.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-900">
            Product
          </h2>

          <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">
            <a href="#features" className="hover:text-gray-900">
              Features
            </a>

            <a href="/login" className="hover:text-gray-900">
              Sign in
            </a>

            <a href="/register" className="hover:text-gray-900">
              Get started
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-900">
            Company
          </h2>

          <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">
            <a href="#about" className="hover:text-gray-900">
              About
            </a>

            <a href="#contact" className="hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto max-w-[1200px] px-5 py-6 text-sm text-gray-500 sm:px-6 lg:px-8">
          © 2026 FlowDesk. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer