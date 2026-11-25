"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { AuthLayout } from "@/components/auth/authLayout"
import { ImageUploader } from "@/components/shared/imageUploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth"

const fieldClassName =
  "h-12 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] placeholder:text-[#98a49a] transition-[border-color,box-shadow] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"

const labelClassName =
  "text-[12px] font-semibold tracking-[0.01em] text-[#344d42]"

export default function RegisterPage() {
  const router = useRouter()
  const { isLoading: loading, register } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [accountType, setAccountType] = useState<"customer" | "vendor">("customer")
  const [vendorType, setVendorType] = useState<"individual" | "business">("individual")
  const [displayName, setDisplayName] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [supportingDocument, setSupportingDocument] = useState<File | null>(null)
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [legalBusinessName, setLegalBusinessName] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [taxNumber, setTaxNumber] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await register({
      name,
      email,
      phone: phone || undefined,
      password,
      password_confirmation: passwordConfirmation,
      account_type: accountType,
      vendor_type: accountType === "vendor" ? vendorType : undefined,
      display_name: accountType === "vendor" ? displayName : undefined,
      contact_email: accountType === "vendor" ? email : undefined,
      contact_phone: accountType === "vendor" ? phone : undefined,
      logo: accountType === "vendor" ? logo : undefined,
      cover_image: accountType === "vendor" ? coverImage : undefined,
      document_type: accountType === "vendor" ? "identity_or_business_registration" : undefined,
      supporting_document: accountType === "vendor" ? supportingDocument : undefined,
      certification_name: accountType === "vendor" && certificateFile ? "Supporting certification" : undefined,
      certificate_file: accountType === "vendor" ? certificateFile : undefined,
      legal_business_name: accountType === "vendor" ? legalBusinessName : undefined,
      registration_number: accountType === "vendor" ? registrationNumber : undefined,
      tax_number: accountType === "vendor" ? taxNumber : undefined,
      contact_person: accountType === "vendor" ? name : undefined,
      business_type: accountType === "vendor" ? vendorType : undefined,
      business_address: accountType === "vendor" ? businessAddress : undefined,
    })

    if (result) {
      router.push(accountType === "vendor" ? "/vendor" : "/")
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
              <Label className={labelClassName} htmlFor="account-type">I want to join as</Label>
              <Select
                aria-label="I want to join as"
                onSelectionChange={(key) => setAccountType(String(key) as "customer" | "vendor")}
                selectedKey={accountType}
              >
                <SelectTrigger className={fieldClassName} id="account-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[18px] border border-[#dfe6dc] bg-white text-brand shadow-[0_18px_45px_-28px_rgba(27,65,56,0.45)]">
                  <SelectItem id="customer">Customer</SelectItem>
                  <SelectItem id="vendor">Vendor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {accountType === "vendor" ? <>
              <div className="flex flex-col gap-2">
                <Label className={labelClassName} htmlFor="vendor-display-name">Shop name <span aria-hidden="true">*</span></Label>
                <Input className={fieldClassName} id="vendor-display-name" onChange={(event) => setDisplayName(event.target.value)} required value={displayName} />
              </div>
              <div className="flex flex-col gap-2">
                <Label className={labelClassName} htmlFor="vendor-type">Vendor type</Label>
                <Select
                  aria-label="Vendor type"
                  onSelectionChange={(key) => setVendorType(String(key) as "individual" | "business")}
                  selectedKey={vendorType}
                >
                  <SelectTrigger className={fieldClassName} id="vendor-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[18px] border border-[#dfe6dc] bg-white text-brand shadow-[0_18px_45px_-28px_rgba(27,65,56,0.45)]">
                    <SelectItem id="individual">Individual</SelectItem>
                    <SelectItem id="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {vendorType === "business" ? <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="legal-business-name">Legal business name</Label><Input className={fieldClassName} id="legal-business-name" onChange={(event) => setLegalBusinessName(event.target.value)} value={legalBusinessName} /></div>
                <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="registration-number">Registration number</Label><Input className={fieldClassName} id="registration-number" onChange={(event) => setRegistrationNumber(event.target.value)} value={registrationNumber} /></div>
                <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="tax-number">Tax number</Label><Input className={fieldClassName} id="tax-number" onChange={(event) => setTaxNumber(event.target.value)} value={taxNumber} /></div>
                <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="business-address">Business address</Label><Input className={fieldClassName} id="business-address" onChange={(event) => setBusinessAddress(event.target.value)} value={businessAddress} /></div>
              </div> : null}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className={labelClassName}>Shop logo</Label>
                  <ImageUploader label="Add shop logo" onChange={setLogo} previewAlt="Shop logo preview" value={logo} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className={labelClassName}>Shop cover</Label>
                  <ImageUploader label="Add shop cover" onChange={setCoverImage} previewAlt="Shop cover preview" value={coverImage} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className={labelClassName} htmlFor="supporting-document">Supporting document <span aria-hidden="true">*</span></Label>
                <Input accept=".pdf,image/jpeg,image/png,image/webp" className={fieldClassName} id="supporting-document" onChange={(event) => setSupportingDocument(event.target.files?.[0] ?? null)} required type="file" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className={labelClassName} htmlFor="certificate-file">Certification (optional)</Label>
                <Input accept=".pdf,image/jpeg,image/png,image/webp" className={fieldClassName} id="certificate-file" onChange={(event) => setCertificateFile(event.target.files?.[0] ?? null)} type="file" />
              </div>
            </> : null}
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
