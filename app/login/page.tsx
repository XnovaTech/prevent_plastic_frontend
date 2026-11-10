"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/auth/authLayout"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"

const fieldClassName =
  "h-12 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] placeholder:text-[#98a49a] transition-[border-color,box-shadow] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"

const labelClassName =
  "text-[12px] font-semibold tracking-[0.01em] text-[#344d42]"

export default function LoginPage() {
  const router = useRouter()
  const { error, isLoading: loading, login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await login({ email, password, device_name: "web" })

    if (result) {
      const destination = result.user.roles?.includes("admin")
        ? "/admin"
        : result.user.roles?.includes("vendor")
          ? "/vendor"
          : "/customer"

      router.push(destination)
    }
  }

  return (
    <AuthLayout>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <main id="main-content" className="w-full">
        <section className="rounded-[28px] border border-border bg-card p-6 shadow-[0_24px_70px_-42px_rgba(27,65,56,0.45)] sm:p-8">
          <div className="mb-7">
            <p className="text-xs font-bold tracking-[0.16em] text-brand-4 uppercase">
              Welcome back
            </p>
            <h1 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.04em] text-brand sm:text-[2.15rem]">
              Sign in and pick up where you left off.
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Access your account, saved finds, and seller tools.
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
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
              className="h-12 w-full rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
              isDisabled={loading}
              type="submit"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-muted-foreground">
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
