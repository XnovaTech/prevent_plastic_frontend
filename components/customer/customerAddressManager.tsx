"use client"

import { useState, type FormEvent } from "react"

import { useAddresses } from "@/hooks/useAddresses"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CustomerAddressManager() {
  const { addresses, create, isSaving } = useAddresses()
  const [error, setError] = useState("")

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    try {
      await create({
        label: String(form.get("label") ?? "Home"),
        recipient_name: String(form.get("recipient_name") ?? "") || null,
        recipient_phone: String(form.get("recipient_phone") ?? "") || null,
        address_line_1: String(form.get("address_line_1") ?? ""),
        address_line_2: String(form.get("address_line_2") ?? "") || null,
        township: String(form.get("township") ?? "") || null,
        city: String(form.get("city") ?? "") || null,
        state_region: String(form.get("state_region") ?? "") || null,
        postal_code: String(form.get("postal_code") ?? "") || null,
        country: String(form.get("country") ?? "Myanmar"),
        is_default: addresses.length === 0,
      })
      formElement.reset()
      setError("")
    } catch {
      setError("Unable to save this address. Please try again.")
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <section className="rounded-[26px] border border-[#e3e9df] bg-white p-6">
        <p className="text-[10px] font-bold tracking-[.16em] text-brand-gray-3 uppercase">
          Delivery details
        </p>
        <h2 className="mt-2 font-serif text-3xl text-brand">Saved addresses</h2>
        <div className="mt-5 space-y-3">
          {addresses.length ? (
            addresses.map((address) => (
              <article
                className="rounded-2xl border border-[#e3e9df] bg-[#f7faf4] p-4"
                key={address.id}
              >
                <p className="font-semibold text-brand">
                  {address.label || "Address"}
                  {address.is_default ? " · Default" : ""}
                </p>
                <p className="mt-1 text-sm text-brand-light">
                  {[
                    address.address_line_1,
                    address.address_line_2,
                    address.township,
                    address.city,
                    address.state_region,
                    address.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                {address.recipient_phone ? (
                  <p className="mt-1 text-sm text-brand-light">
                    {address.recipient_name ?? "Delivery contact"} · {address.recipient_phone}
                  </p>
                ) : null}
              </article>
            ))
          ) : (
            <p className="text-sm text-brand-gray-3">
              Add a delivery address before placing your first order.
            </p>
          )}
        </div>
      </section>
      <form
        className="rounded-[26px] border border-[#e3e9df] bg-white p-6"
        onSubmit={save}
      >
        <h2 className="font-serif text-2xl text-brand">Add address</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label>
            <Label>Label</Label>
            <Input className="mt-1" defaultValue="Home" name="label" />
          </label>
          <label>
            <Label>Delivery contact</Label>
            <Input className="mt-1" name="recipient_name" />
          </label>
          <label>
            <Label>Delivery phone *</Label>
            <Input className="mt-1" name="recipient_phone" required type="tel" />
          </label>
          <label>
            <Label>Address line 1 *</Label>
            <Input className="mt-1" name="address_line_1" required />
          </label>
          <label>
            <Label>Address line 2</Label>
            <Input className="mt-1" name="address_line_2" />
          </label>
          <label>
            <Label>Township</Label>
            <Input className="mt-1" name="township" />
          </label>
          <label>
            <Label>City</Label>
            <Input className="mt-1" name="city" />
          </label>
          <label>
            <Label>State / Region</Label>
            <Input className="mt-1" name="state_region" />
          </label>
          <label>
            <Label>Postal code</Label>
            <Input className="mt-1" name="postal_code" />
          </label>
          <label>
            <Label>Country</Label>
            <Input className="mt-1" defaultValue="Myanmar" name="country" />
          </label>
        </div>
        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        <Button
          className="mt-5 bg-brand-2 text-white"
          isDisabled={isSaving}
          type="submit"
        >
          {isSaving ? "Saving…" : "Save address"}
        </Button>
      </form>
    </div>
  )
}
