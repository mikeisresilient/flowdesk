import {
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react'
import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  getAdminUsers,
  updateAdminUserRole,
  type AdminUser,
  type AdminUserRole,
} from '../../services/adminService'
import { useAuth } from '../../context/useAuth'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(
    undefined,
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    },
  )
}

function AdminUsers() {
  const { user: currentUser } = useAuth()

  const [users, setUsers] = useState<
    AdminUser[]
  >([])

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const [updatingUserId, setUpdatingUserId] =
    useState<string | null>(null)

  const [search, setSearch] =
    useState('')

  useEffect(() => {
    let mounted = true

    async function loadUsers() {
      try {
        setIsLoading(true)
        setError(null)

        const response =
          await getAdminUsers()

        if (!mounted) {
          return
        }

        setUsers(response.users)
      } catch (error) {
        if (!mounted) {
          return
        }

        setError(
          error instanceof Error
            ? error.message
            : 'Unable to load users',
        )
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    void loadUsers()

    return () => {
      mounted = false
    }
  }, [])

  const filteredUsers = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase()

    if (!query) {
      return users
    }

    return users.filter((user) =>
      [
        user.name,
        user.email,
        user.role,
      ].some((value) =>
        value
          .toLowerCase()
          .includes(query),
      ),
    )
  }, [search, users])

  const adminCount = users.filter(
    (user) => user.role === 'ADMIN',
  ).length

  const userCount = users.filter(
    (user) => user.role === 'USER',
  ).length

  const handleRoleChange = async (
    user: AdminUser,
    role: AdminUserRole,
  ) => {
    if (
      updatingUserId ||
      user.role === role
    ) {
      return
    }

    try {
      setUpdatingUserId(user.id)
      setError(null)

      const response =
        await updateAdminUserRole(
          user.id,
          role,
        )

      setUsers((current) =>
        current.map((item) =>
          item.id === user.id
            ? response.user
            : item,
        ),
      )
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to update user role',
      )
    } finally {
      setUpdatingUserId(null)
    }
  }

  return (
    <div className="min-w-0 pb-10">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-[#B38708]">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-black tracking-tight text-[#18181B] sm:text-3xl">
          Users
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Manage FlowDesk users and their
          access roles.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Total users
              </p>

              <p className="mt-2 text-2xl font-black text-[#18181B]">
                {users.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF4C7] text-[#9A7407]">
              <Users size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Administrators
              </p>

              <p className="mt-2 text-2xl font-black text-[#18181B]">
                {adminCount}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <ShieldCheck size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Standard users
              </p>

              <p className="mt-2 text-2xl font-black text-[#18181B]">
                {userCount}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <UserRound size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Users */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-black text-[#18181B]">
                User management
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Review accounts and manage
                their roles.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search users..."
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-[#FAFAF8]
                px-4
                py-2.5
                text-sm
                text-gray-800
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-[#F5C542]
                focus:ring-4
                focus:ring-[#F5C542]/20
                sm:w-64
              "
            />
          </div>
        </div>

        {isLoading ? (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#F5C542]" />

            <p className="mt-5 text-sm font-semibold text-gray-600">
              Loading users...
            </p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF4C7] text-[#9A7407]">
              <Users size={24} />
            </div>

            <h3 className="mt-5 text-base font-black text-[#18181B]">
              No users found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try a different search term.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#FAFAF8] text-left">
                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                      User
                    </th>

                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Role
                    </th>

                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                      Joined
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wide text-gray-400">
                      Access
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map(
                    (user) => {
                      const isCurrentUser =
                        currentUser?.id ===
                        user.id

                      const isUpdating =
                        updatingUserId ===
                        user.id

                      return (
                        <tr
                          key={user.id}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <td className="px-5 py-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-[#18181B]">
                                  {user.name}
                                </p>

                                {isCurrentUser && (
                                  <span className="rounded-full bg-[#FFF4C7] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#806207]">
                                    You
                                  </span>
                                )}
                              </div>

                              <p className="mt-1 text-sm text-gray-500">
                                {user.email}
                              </p>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`
                                inline-flex
                                rounded-full
                                px-2.5
                                py-1
                                text-xs
                                font-bold
                                ${
                                  user.role ===
                                  'ADMIN'
                                    ? 'bg-green-50 text-green-700'
                                    : 'bg-gray-100 text-gray-600'
                                }
                              `}
                            >
                              {user.role}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-500">
                            {formatDate(
                              user.createdAt,
                            )}
                          </td>

                          <td className="px-5 py-4 text-right">
                            <select
                              value={user.role}
                              disabled={
                                isUpdating ||
                                isCurrentUser
                              }
                              onChange={(event) => {
                                void handleRoleChange(
                                  user,
                                  event.target
                                    .value as AdminUserRole,
                                )
                              }}
                              className="
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                px-3
                                py-2
                                text-sm
                                font-semibold
                                text-gray-700
                                outline-none
                                focus:border-[#F5C542]
                                focus:ring-2
                                focus:ring-[#F5C542]/20
                                disabled:cursor-not-allowed
                                disabled:bg-gray-100
                                disabled:opacity-60
                              "
                            >
                              <option value="USER">
                                USER
                              </option>

                              <option value="ADMIN">
                                ADMIN
                              </option>
                            </select>
                          </td>
                        </tr>
                      )
                    },
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-gray-100 md:hidden">
              {filteredUsers.map(
                (user) => {
                  const isCurrentUser =
                    currentUser?.id ===
                    user.id

                  const isUpdating =
                    updatingUserId ===
                    user.id

                  return (
                    <div
                      key={user.id}
                      className="p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="break-words font-bold text-[#18181B]">
                              {user.name}
                            </p>

                            {isCurrentUser && (
                              <span className="rounded-full bg-[#FFF4C7] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#806207]">
                                You
                              </span>
                            )}
                          </div>

                          <p className="mt-1 break-all text-sm text-gray-500">
                            {user.email}
                          </p>
                        </div>

                        <span
                          className={`
                            shrink-0
                            rounded-full
                            px-2.5
                            py-1
                            text-xs
                            font-bold
                            ${
                              user.role ===
                              'ADMIN'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                            }
                          `}
                        >
                          {user.role}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <p className="text-xs font-medium text-gray-400">
                          Joined{' '}
                          {formatDate(
                            user.createdAt,
                          )}
                        </p>

                        <select
                          value={user.role}
                          disabled={
                            isUpdating ||
                            isCurrentUser
                          }
                          onChange={(event) => {
                            void handleRoleChange(
                              user,
                              event.target
                                .value as AdminUserRole,
                            )
                          }}
                          className="
                            min-w-28
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-3
                            py-2
                            text-sm
                            font-semibold
                            text-gray-700
                            outline-none
                            focus:border-[#F5C542]
                            focus:ring-2
                            focus:ring-[#F5C542]/20
                            disabled:cursor-not-allowed
                            disabled:bg-gray-100
                            disabled:opacity-60
                          "
                        >
                          <option value="USER">
                            USER
                          </option>

                          <option value="ADMIN">
                            ADMIN
                          </option>
                        </select>
                      </div>
                    </div>
                  )
                },
              )}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default AdminUsers