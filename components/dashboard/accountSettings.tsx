"use client"

import { EnvelopeSimple, GearSix, UserCircle } from "@phosphor-icons/react"

import { useAuthStore } from "@/stores/authStore"

export function AccountSettings({ roleLabel }: { roleLabel: string }) {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
        Account
      </p>
      <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em] text-brand">
        Settings
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-light">
        Your {roleLabel.toLowerCase()} account information.
      </p>
      <section className="mt-8 border border-[#e3e9df] bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-[#edf0ea] pb-5">
          <span className="flex size-11 items-center justify-center rounded-full bg-brand-yellow-bg text-brand-3">
            <GearSix size={22} />
          </span>
          <div>
            <p className="font-semibold text-brand">Account details</p>
            <p className="text-sm text-brand-light">
              The account currently signed in to this dashboard.
            </p>
          </div>
        </div>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <UserCircle className="mt-0.5 text-brand-3" size={20} />
            <div>
              <dt className="text-xs text-brand-gray-3">Name</dt>
              <dd className="mt-1 font-semibold text-brand">
                {user?.name ?? "—"}
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <EnvelopeSimple className="mt-0.5 text-brand-3" size={20} />
            <div>
              <dt className="text-xs text-brand-gray-3">Email address</dt>
              <dd className="mt-1 font-semibold break-all text-brand">
                {user?.email ?? "—"}
              </dd>
            </div>
          </div>
        </dl>
      </section>
    </div>
  )
}
