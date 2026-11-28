"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { AuthLayout, AuthPanel } from "@/components/auth/authLayout"
import { ImageUploader } from "@/components/shared/imageUploader"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"

const fieldClassName =
  "h-12 rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-[13px] text-brand-6 shadow-sm shadow-[#274b3e]/[0.02] placeholder:text-[#98a49a] transition-[border-color,box-shadow] focus-visible:border-[#7fa88c] focus-visible:ring-3 focus-visible:ring-[#7fa88c]/20"

const labelClassName =
  "text-[12px] font-semibold tracking-[0.01em] text-[#344d42]"

export default function RegisterPage() {
  const router = useRouter()
  const { error, isLoading: loading, register } = useAuth()

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
  const [vendorStep, setVendorStep] = useState(1)
  const [stepError, setStepError] = useState("")

  function changeAccountType(nextType: "customer" | "vendor") {
    setAccountType(nextType)
    setVendorStep(1)
    setStepError("")
  }

  function nextVendorStep() {
    setStepError("")

    if (vendorStep === 1) {
      if (!name.trim() || !email.trim() || !password || !passwordConfirmation) {
        setStepError("Complete your name, email, and password details to continue.")
        return
      }
      if (password !== passwordConfirmation) {
        setStepError("Passwords do not match.")
        return
      }
    }

    if (vendorStep === 2 && !displayName.trim()) {
      setStepError("Add a shop name to continue.")
      return
    }

    setVendorStep((current) => current + 1)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (accountType === "vendor" && vendorStep < 3) {
      nextVendorStep()
      return
    }

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
      <main id="main-content" className="w-full max-w-[680px]">
        <AuthPanel>
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

          {accountType === "vendor" ? (
            <div className="mb-6 flex items-center gap-2" aria-label="Registration progress">
              {["Account", "Shop", "Verify"].map((label, index) => {
                const step = index + 1
                return <div className="flex flex-1 items-center gap-2" key={label}><span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${vendorStep >= step ? "bg-brand-2 text-white" : "bg-[#eef3eb] text-brand-gray-3"}`}>{step}</span><span className={`hidden text-[10px] font-semibold sm:block ${vendorStep >= step ? "text-brand-3" : "text-brand-gray-3"}`}>{label}</span>{step < 3 ? <span className={`h-px flex-1 ${vendorStep > step ? "bg-brand-2" : "bg-[#dfe7dc]"}`} /> : null}</div>
              })}
            </div>
          ) : null}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            {accountType === "vendor" && vendorStep === 2 ? <>
              <div className="border-b border-[#edf0ea] pb-4"><p className="text-xs font-bold tracking-[0.14em] text-brand-4 uppercase">Shop details</p><p className="mt-1 text-sm text-muted-foreground">Tell people what makes your shop worth discovering.</p></div>
              <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="vendor-display-name">Shop name <span aria-hidden="true">*</span></Label><Input className={fieldClassName} id="vendor-display-name" onChange={(event) => setDisplayName(event.target.value)} required value={displayName} /></div>
              <div className="flex flex-col gap-2">
                <Label className={labelClassName}>Vendor type</Label>
                <div aria-label="Choose vendor type" className="grid max-w-md grid-cols-2 gap-2 rounded-[16px] bg-[#f5f8f3] p-1" role="radiogroup">
                  {(["individual", "business"] as const).map((type) => (
                    <button
                      aria-checked={vendorType === type}
                      className={`rounded-[12px] px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2 ${vendorType === type ? "bg-white text-brand-3 shadow-sm" : "text-brand-gray-4 hover:text-brand-5"}`}
                      key={type}
                      onClick={() => setVendorType(type)}
                      role="radio"
                      type="button"
                    >
                      <span className="block">{type === "individual" ? "Individual" : "Business"}</span>
                      <span className="mt-0.5 block text-[10px] font-normal text-brand-gray-3">{type === "individual" ? "Personal seller" : "Registered shop"}</span>
                    </button>
                  ))}
                </div>
              </div>
              {vendorType === "business" ? <div className="grid gap-5 sm:grid-cols-2"><div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="legal-business-name">Legal business name</Label><Input className={fieldClassName} id="legal-business-name" onChange={(event) => setLegalBusinessName(event.target.value)} value={legalBusinessName} /></div><div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="registration-number">Registration number</Label><Input className={fieldClassName} id="registration-number" onChange={(event) => setRegistrationNumber(event.target.value)} value={registrationNumber} /></div><div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="tax-number">Tax number</Label><Input className={fieldClassName} id="tax-number" onChange={(event) => setTaxNumber(event.target.value)} value={taxNumber} /></div><div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="business-address">Business address</Label><Input className={fieldClassName} id="business-address" onChange={(event) => setBusinessAddress(event.target.value)} value={businessAddress} /></div></div> : null}
            </> : null}

            {accountType === "vendor" && vendorStep === 3 ? <>
              <div className="border-b border-[#edf0ea] pb-4"><p className="text-xs font-bold tracking-[0.14em] text-brand-4 uppercase">Verification</p><p className="mt-1 text-sm text-muted-foreground">Add a document so we can review your seller account.</p></div>
              <div className="grid gap-5 sm:grid-cols-2"><div className="flex flex-col gap-2"><Label className={labelClassName}>Shop logo</Label><ImageUploader label="Add shop logo" onChange={setLogo} previewAlt="Shop logo preview" value={logo} /></div><div className="flex flex-col gap-2"><Label className={labelClassName}>Shop cover</Label><ImageUploader label="Add shop cover" onChange={setCoverImage} previewAlt="Shop cover preview" value={coverImage} /></div></div>
              <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="supporting-document">Supporting document <span aria-hidden="true">*</span></Label><Input accept=".pdf,image/jpeg,image/png,image/webp" className={fieldClassName} id="supporting-document" onChange={(event) => setSupportingDocument(event.target.files?.[0] ?? null)} required type="file" /><p className="text-[11px] text-brand-gray-3">PDF, JPG, PNG, or WEBP up to 10 MB.</p></div>
              <div className="flex flex-col gap-2"><Label className={labelClassName} htmlFor="certificate-file">Certification (optional)</Label><Input accept=".pdf,image/jpeg,image/png,image/webp" className={fieldClassName} id="certificate-file" onChange={(event) => setCertificateFile(event.target.files?.[0] ?? null)} type="file" /></div>
            </> : null}

            {(accountType === "customer" || vendorStep === 1) ? <>
            <div className="flex flex-col gap-2">
              <Label className={labelClassName} htmlFor="account-type">I want to join as</Label>
              <div aria-label="Choose account type" className="grid grid-cols-2 gap-2 rounded-[16px] bg-[#f5f8f3] p-1" role="radiogroup">
                {(["customer", "vendor"] as const).map((type) => (
                  <button
                    aria-checked={accountType === type}
                    className={`rounded-[12px] px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2 ${accountType === type ? "bg-white text-brand-3 shadow-sm" : "text-brand-gray-4 hover:text-brand-5"}`}
                    key={type}
                    onClick={() => changeAccountType(type)}
                    role="radio"
                    type="button"
                  >
                    <span className="block">{type === "customer" ? "Customer" : "Vendor"}</span>
                    <span className="mt-0.5 block text-[10px] font-normal text-brand-gray-3">{type === "customer" ? "Buy and discover" : "Sell your finds"}</span>
                  </button>
                ))}
              </div>
            </div>
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
            </> : null}

            {stepError ? <Alert className="border-amber-200 bg-amber-50 text-amber-900" role="alert"><AlertDescription>{stepError}</AlertDescription></Alert> : null}
            {error ? <Alert className="border-destructive/25 bg-destructive/5 text-destructive" role="alert" variant="destructive"><AlertDescription>{error}</AlertDescription></Alert> : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              {accountType === "vendor" && vendorStep > 1 ? <Button className="h-12 rounded-full px-5 text-sm font-bold" onPress={() => { setStepError(""); setVendorStep((current) => current - 1) }} type="button" variant="outline">Back</Button> : <span />}
              {accountType === "vendor" && vendorStep < 3 ? <Button className="h-12 flex-1 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary/90 sm:max-w-[220px]" onPress={nextVendorStep} type="button">Next</Button> : <Button className="h-12 flex-1 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary/90" isDisabled={loading} type="submit">{loading ? "Creating account..." : "Create account"}</Button>}
            </div>
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
        </AuthPanel>
      </main>
    </AuthLayout>
  )
}
