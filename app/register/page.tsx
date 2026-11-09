"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { AuthLayout } from "@/components/auth/authLayout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { useAuthStore } from "@/stores/authStore"

const fieldClassName =
  "h-12 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] placeholder:text-[#98a49a] transition-[border-color,box-shadow] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"

const labelClassName =
  "text-[12px] font-semibold tracking-[0.01em] text-[#344d42]"

export default function RegisterPage() {
  const router = useRouter()
  const setAuth = useAuthStore((state) => state.setAuth)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        phone: phone || undefined,
        password,
        password_confirmation: passwordConfirmation,
        device_name: "web",
      })

      setAuth(data.data.user, data.data.token)
      router.push("/")
    } catch (err: unknown) {
      const axiosError = err as {
        response?: {
          data?: { message?: string; errors?: Record<string, string[]> }
        }
      }

      const backendErrors = axiosError?.response?.data?.errors
      const firstError = backendErrors
        ? Object.values(backendErrors).flat()[0]
        : null

      setError(
        firstError ??
          axiosError?.response?.data?.message ??
          "Registration failed. Please try again."
      )
    } finally {
      setLoading(false)
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
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold tracking-[0.16em] text-brand-4 uppercase">
                Join the community
              </p>
              <span className="rounded-full bg-brand-yellow-bg px-3 py-1 text-[10px] font-semibold text-brand-4">
                Free to join
              </span>
            </div>
            <h1 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.04em] text-brand sm:text-[2.15rem]">
              Make room for better things.
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Create an account to buy, sell, and repair with purpose.
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="register-name">
                Full name <span aria-hidden="true">*</span>
              </Label>
              <Input
                autoComplete="name"
                className={fieldClassName}
                id="register-name"
                name="name"
                placeholder="Your name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="register-email">
                Email address <span aria-hidden="true">*</span>
              </Label>
              <Input
                autoComplete="email"
                className={fieldClassName}
                id="register-email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="register-phone">
                Phone number
              </Label>
              <Input
                autoComplete="tel"
                className={fieldClassName}
                id="register-phone"
                name="phone"
                placeholder="09xxxxxxxxx"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="register-password">
                Password <span aria-hidden="true">*</span>
              </Label>
              <Input
                autoComplete="new-password"
                className={fieldClassName}
                id="register-password"
                name="password"
                placeholder="At least 8 characters"
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                className={labelClassName}
                htmlFor="register-password-confirmation"
              >
                Confirm password <span aria-hidden="true">*</span>
              </Label>
              <Input
                autoComplete="new-password"
                className={fieldClassName}
                id="register-password-confirmation"
                name="password_confirmation"
                placeholder="Repeat your password"
                required
                type="password"
                value={passwordConfirmation}
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
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
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              className="font-semibold text-brand-3 hover:text-brand-orange"
              href="/login"
            >
              Sign in
            </Link>
          </p>
        </section>
      </main>
    </AuthLayout>
  )
}
