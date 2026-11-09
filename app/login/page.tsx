"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import { api } from "@/lib/api"
import { useAuthStore } from "@/stores/authStore"

const fieldClassName =
  "h-12 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] placeholder:text-[#98a49a] transition-[border-color,box-shadow] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"

const labelClassName =
  "text-[12px] font-semibold tracking-[0.01em] text-[#344d42]"

export default function LoginPage() {
  const router = useRouter()
  const setAuth = useAuthStore((state) => state.setAuth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
        device_name: "web",
      })

      setAuth(data.data.user, data.data.token)
      const destination = data.data.user.roles?.includes("admin") ? "/admin" : "/vendor"

      router.push(destination)
    } catch (err: unknown) {
      const axiosError = err as {
        response?: { data?: { message?: string } }
      }

      setError(axiosError?.response?.data?.message ?? "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-brand">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader activeHref="/login" />
      <main id="main-content">
        <section className="px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="mx-auto max-w-md">
            <div
              className="rounded-[24px] border border-[#e6eae2] bg-white/85 p-5 shadow-[0_16px_50px_-40px_rgba(27,65,56,0.5)] sm:rounded-[28px] sm:p-7 lg:p-8"
              data-aos="fade-up"
            >
              <div className="mb-6 border-b border-[#e9ece4] pb-5">
                <p className="text-[9px] font-bold tracking-[0.16em] text-brand-gray-5 uppercase">
                  Welcome back
                </p>
                <h1 className="mt-1.5 font-serif text-[27px] leading-tight tracking-[-0.04em] text-brand sm:text-[30px]">
                  Log in to your account
                </h1>
                <p className="mt-2 text-[12px] leading-6 text-brand-light">
                  Continue your journey with Prevent Plastic.
                </p>
              </div>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
                  <p className="text-[12px] font-medium text-red-600">{error}</p>
                ) : null}

                <Button
                  className="h-11 w-full rounded-full bg-brand-2 px-5 text-xs font-bold text-white hover:bg-[#1f6157] disabled:cursor-not-allowed disabled:bg-[#dfe6dc] disabled:text-[#69786f]"
                  isDisabled={loading}
                  type="submit"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <p className="mt-6 text-center text-[12px] text-brand-light">
                Don&apos;t have an account?{" "}
                <Link className="font-semibold text-brand-3 hover:text-brand-orange" href="/register">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
