import { SiteHeader } from "@/components/shared/siteHeader"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-transparent text-brand">
      <SiteHeader />
      <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center px-6 py-16">
        <section className="w-full rounded-[28px] border border-[#e6eae2] bg-white/85 p-8 shadow-[0_16px_50px_-40px_rgba(27,65,56,0.5)]">
          <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-5 uppercase">
            Admin
          </p>
          <h1 className="mt-2 font-serif text-4xl tracking-[-0.04em] text-brand">
            Admin dashboard
          </h1>
          <p className="mt-3 text-sm text-brand-light">
            Your admin page is ready for management tools.
          </p>
        </section>
      </main>
    </div>
  )
}
