"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Leaf, LockKey } from "@phosphor-icons/react"
import { AuthLayout } from "@/components/auth/authLayout"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { getDashboardPath, getAppRole } from "@/lib/auth"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"

const fieldClassName =
  "h-11 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] placeholder:text-[#98a49a] transition-[border-color,box-shadow] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"

const labelClassName =
  "text-[12px] font-semibold tracking-[0.01em] text-[#344d42]"

export default function LoginPage() {
  const router = useRouter()
  const { error, isLoading: loading, login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [returnTo, setReturnTo] = useState<string | null>(null)

  useEffect(() => {
    const requestedDestination = new URLSearchParams(window.location.search).get(
      "returnTo"
    )

    if (
      requestedDestination?.startsWith("/") &&
      !requestedDestination.startsWith("//")
    ) {
      setReturnTo(requestedDestination)
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await login({ email, password })

    if (result) {
      const role = getAppRole(result.user)
      const destination = returnTo ?? (role ? getDashboardPath(role) : "/")

      router.push(destination)
    }
  }

  return (
    <AuthLayout compact>
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <main id="main-content" className="w-full max-w-[540px]" data-aos="fade-left" data-aos-duration="650">
        <section className="relative overflow-hidden bg-transparent p-5 sm:p-7">
          <span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 size-28 rounded-full bg-brand-yellow-bg/60" />
          <span aria-hidden="true" className="pointer-events-none absolute top-16 -right-2 size-2 rounded-full bg-brand-orange/70" />
          <div className="relative z-10 mb-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-brand-yellow-bg text-brand-2 shadow-sm" data-aos="zoom-in" data-aos-delay="100">
                <Leaf aria-hidden="true" size={20} weight="fill" />
              </div>
              <span className="rounded-full border border-[#dce8d8] bg-[#f3f8ef] px-3 py-1 text-[10px] font-semibold text-brand-3">One account · Every role</span>
            </div>
            <p className="mt-3 text-xs font-bold tracking-[0.16em] text-brand-4 uppercase">Welcome back</p>
            <h1 className="mt-1.5 font-serif text-[1.8rem] leading-tight tracking-[-0.04em] text-brand sm:text-[2rem]">
              Sign in and pick up where you left off.
            </h1>
            <p className="mt-2 text-sm leading-5 text-muted-foreground">
              Access your account, saved finds, Journal stories, and seller tools.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-semibold text-brand-4">
              {['Community member', 'Vendor', 'Admin'].map((role) => <span className="rounded-full bg-[#f6f8f3] px-3 py-1.5" key={role}>{role}</span>)}
            </div>
          </div>

          <form
            className="relative z-10 flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="login-email">
                Email address <span aria-hidden="true">*</span>
              </Label>
              <Input
                autoComplete="email"
                className={fieldClassName}
                id="login-email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="login-password">
                Password <span aria-hidden="true">*</span>
              </Label>
              <Input
                autoComplete="current-password"
                className={fieldClassName}
                id="login-password"
                name="password"
                placeholder="Your password"
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {error ? (
              <Alert
                aria-live="polite"
                className="border-destructive/25 bg-destructive/5 text-destructive"
                role="alert"
                variant="destructive"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <Button
              className="h-11 w-full rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
              isDisabled={loading}
              type="submit"
            >
              <LockKey aria-hidden="true" size={17} weight="bold" />
              {loading ? "Signing in..." : "Sign in securely"}
            </Button>
          </form>

          <p className="relative z-10 mt-5 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              className="font-semibold text-brand-3 hover:text-brand-orange"
              href="/register"
            >
              Create one
            </Link>
          </p>
        </section>
      </main>
    </AuthLayout>
  )
}
