"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

import { useAddresses } from "@/hooks/useAddresses"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { UserAddress } from "@/types/address"

export function CustomerAddressManager() {
  const { addresses, create, update, isSaving } = useAddresses()
  const router = useRouter()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editing, setEditing] = useState<UserAddress | null>(null)
  const [safeReturnTo, setSafeReturnTo] = useState<string | null>(null)

  useEffect(() => {
    const requestedDestination = new URLSearchParams(window.location.search).get(
      "returnTo"
    )

    if (
      requestedDestination?.startsWith("/") &&
      !requestedDestination.startsWith("//")
    ) {
      setSafeReturnTo(requestedDestination)
    }
  }, [])

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    try {
      const input = {
        label: String(form.get("label") ?? "Home"),
        recipient_name: String(form.get("recipient_name") ?? "") || null,
        recipient_phone: String(form.get("recipient_phone") ?? ""),
        address_line_1: String(form.get("address_line_1") ?? ""),
        address_line_2: String(form.get("address_line_2") ?? "") || null,
        township: String(form.get("township") ?? ""),
        city: String(form.get("city") ?? ""),
        state_region: String(form.get("state_region") ?? ""),
        postal_code: String(form.get("postal_code") ?? "") || null,
        country: String(form.get("country") ?? "Myanmar"),
      }
      if (editing) {
        await update({
          id: editing.id,
          input: { ...input, is_default: editing.is_default },
        })
      } else {
        await create({ ...input, is_default: addresses.length === 0 })
      }
      formElement.reset()
      setError("")
      setEditing(null)
      setSuccess(
        editing
          ? "Your delivery address has been updated."
          : "Your delivery address has been saved."
      )
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
                <Button
                  className="mt-3"
                  onPress={() => setEditing(address)}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Edit address
                </Button>
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
        key={editing?.id ?? "new"}
        onSubmit={save}
      >
        <h2 className="font-serif text-2xl text-brand">
          {editing ? "Edit address" : "Add address"}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label>
            <Label>Label</Label>
            <Input
              className="mt-1"
              defaultValue={editing?.label ?? "Home"}
              name="label"
            />
          </label>
          <label>
            <Label>Full name *</Label>
            <Input
              className="mt-1"
              defaultValue={editing?.recipient_name ?? ""}
              name="recipient_name"
              required
            />
          </label>
          <label>
            <Label>Delivery phone *</Label>
            <Input
              className="mt-1"
              defaultValue={editing?.recipient_phone ?? ""}
              name="recipient_phone"
              required
              type="tel"
            />
          </label>
          <label>
            <Label>Address line 1 *</Label>
            <Input
              className="mt-1"
              defaultValue={editing?.address_line_1 ?? ""}
              name="address_line_1"
              required
            />
          </label>
          <label>
            <Label>Address line 2</Label>
            <Input
              className="mt-1"
              defaultValue={editing?.address_line_2 ?? ""}
              name="address_line_2"
            />
          </label>
          <label>
            <Label>City / Township *</Label>
            <Input
              className="mt-1"
              defaultValue={editing?.township ?? ""}
              name="township"
              required
            />
          </label>
          <label>
            <Label>City *</Label>
            <Input
              className="mt-1"
              defaultValue={editing?.city ?? ""}
              name="city"
              required
            />
          </label>
          <label>
            <Label>State / Region *</Label>
            <Input
              className="mt-1"
              defaultValue={editing?.state_region ?? ""}
              name="state_region"
              required
            />
          </label>
          <label>
            <Label>Postal code</Label>
            <Input
              className="mt-1"
              defaultValue={editing?.postal_code ?? ""}
              name="postal_code"
            />
          </label>
          <label>
            <Label>Country</Label>
            <Input
              className="mt-1"
              defaultValue={editing?.country ?? "Myanmar"}
              name="country"
            />
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
      {success ? (
        <Dialog
          className="border border-[#d8e5d3] bg-[#fdfefa] text-brand"
          isOpen
          onOpenChange={(isOpen) => {
            if (!isOpen) setSuccess("")
          }}
        >
          <DialogHeader>
            <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
              Delivery address saved
            </p>
            <DialogTitle className="font-serif text-3xl text-brand">
              You&apos;re ready to check out.
            </DialogTitle>
            <DialogDescription className="text-brand-light">
              {success}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onPress={() => router.push("/")} variant="outline">
              Back to website
            </Button>
            {safeReturnTo ? (
              <Button onPress={() => router.push(safeReturnTo)}>
                Return to checkout
              </Button>
            ) : null}
          </DialogFooter>
        </Dialog>
      ) : null}
    </div>
  )
}
