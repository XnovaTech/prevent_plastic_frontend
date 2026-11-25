"use client"

import { useMemo, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChatCircle, Check, Clock, ImageSquare, ListBullets, PencilSimple, Trash, Warning, X } from "@phosphor-icons/react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button, LinkButton } from "@/components/ui/button"
import { VendorProductEngagement } from "@/components/product/vendorProductEngagement"
import { ProductConversations } from "@/components/product/productConversations"
import { resolveMediaUrl } from "@/lib/media"
import { productService, type Product } from "@/services/productService"

type Props = { product: Product; basePath?: string; canEdit?: boolean; mode?: "admin" | "vendor" }
type Tab = "detail" | "gallery" | "comments" | "messages"
type Action = "disable" | "ban" | "enable" | ""

const statusLabel: Record<Product["status"], string> = { draft: "Draft", active: "Live", disabled: "Disabled", banned: "Banned", archived: "Archived" }
const statusClass: Record<Product["status"], string> = {
  draft: "border-[#eadfca] bg-[#fff8e9] text-[#9a6b1f]", active: "border-[#cce3cb] bg-[#eef8eb] text-[#2f7049]", disabled: "border-[#eadfca] bg-[#fff8e9] text-[#9a6b1f]", banned: "border-red-200 bg-red-50 text-red-700", archived: "border-[#e3e9df] bg-[#f3f5f1] text-brand-gray-3",
}

function price(value: string | number) { return `Ks ${Number(value).toLocaleString()}` }
function description(value?: string | null) {
  if (!value || typeof window === "undefined") return ""
  const document = new DOMParser().parseFromString(value, "text/html")
  document.querySelectorAll("script, style, iframe, object, embed, form").forEach((element) => element.remove())
  document.querySelectorAll("*").forEach((element) => Array.from(element.attributes).forEach((attribute) => {
    const name = attribute.name.toLowerCase()
    const content = attribute.value.trim().toLowerCase()
    if (name.startsWith("on") || ((name === "href" || name === "src") && content.startsWith("javascript:"))) element.removeAttribute(attribute.name)
  }))
  return document.body.innerHTML
}
function attribute(value: unknown) {
  if (value === null || value === undefined || value === "") return "—"
  if (typeof value === "boolean") return value ? "Yes" : "No"
  if (Array.isArray(value)) return value.join(", ") || "—"
  return typeof value === "object" ? JSON.stringify(value) : String(value)
}

export function ProductDetailLayout({ product, basePath = "/vendor/products", canEdit = true, mode = "vendor" }: Props) {
  const router = useRouter()
  const [current, setCurrent] = useState(product)
  const [tab, setTab] = useState<Tab>("detail")
  const [action, setAction] = useState<Action>("")
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")
  const images = current.images ?? []
  const variants = current.variants ?? []
  const prices = variants.map((item) => Number(item.price)).filter(Boolean)
  const priceLabel = !prices.length ? "—" : prices.length === 1 || Math.min(...prices) === Math.max(...prices) ? price(prices[0]) : `${price(Math.min(...prices))} – ${price(Math.max(...prices))}`
  const body = useMemo(() => description(current.description), [current.description])

  async function moderate(next: Exclude<Action, "">) {
    setAction(next); setError("")
    try { setCurrent(next === "disable" ? await productService.disable(current.id) : next === "ban" ? await productService.ban(current.id) : await productService.enable(current.id)) }
    catch (requestError) { setError(axios.isAxiosError(requestError) ? requestError.response?.data?.message ?? "Unable to update product status." : "Unable to update product status.") }
    finally { setAction("") }
  }
  async function remove() {
    if (!window.confirm(`Delete “${current.name}”?`)) return
    setDeleting(true); setError("")
    try { await productService.remove(current.id); router.push(basePath) }
    catch { setError("Unable to delete this product."); setDeleting(false) }
  }
  const moderationCopy = mode === "admin"
    ? current.status === "active" ? "This listing is live. Disable it temporarily or ban it if it violates marketplace rules." : current.status === "disabled" ? "This listing is hidden from shoppers. Enable it when the issue is resolved." : current.status === "banned" ? "This listing is banned from the marketplace. Enable it only after a moderation decision." : "This listing is still a draft and is not visible to shoppers."
    : current.status === "active" ? "This product is live and available to shoppers." : current.status === "disabled" ? "An admin has disabled this product. Please contact support if you need help." : current.status === "banned" ? "This product has been banned from the marketplace. Please contact support." : "This product is saved as a draft and is not visible to shoppers."
  const controls = mode !== "admin" ? null : (current.status === "disabled" || current.status === "banned") ? <Button isDisabled={Boolean(action)} onPress={() => void moderate("enable")}><Check size={16} />{action === "enable" ? "Enabling…" : "Enable listing"}</Button> : current.status === "active" ? <div className="flex flex-wrap gap-2"><Button isDisabled={Boolean(action)} onPress={() => void moderate("disable")} variant="outline"><Clock size={16} />{action === "disable" ? "Disabling…" : "Disable"}</Button><Button isDisabled={Boolean(action)} onPress={() => { if (window.confirm(`Ban “${current.name}”? This will hide it from the marketplace.`)) void moderate("ban") }} variant="destructive"><X size={16} />{action === "ban" ? "Banning…" : "Ban product"}</Button></div> : null

  return <div className="mx-auto max-w-6xl">
    <LinkButton className="text-xs font-semibold text-brand-light" href={basePath} variant="ghost"><ArrowLeft size={14} /> Back to products</LinkButton>
    {error ? <Alert className="mt-5 border-red-200 bg-red-50 text-red-800" variant="destructive"><AlertDescription>{error}</AlertDescription></Alert> : null}
    <section className="mt-6 border border-[#dce8d8] bg-[#f3f8ef] p-5 sm:p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-3 shadow-sm">{current.status === "active" ? <Check size={20} /> : current.status === "banned" ? <Warning size={20} /> : <Clock size={20} />}</span><div><p className="font-semibold text-brand">{mode === "admin" ? "Moderation status" : statusLabel[current.status]}</p><p className="mt-1 max-w-2xl text-sm leading-6 text-brand-light">{moderationCopy}</p></div></div>{controls}</div></section>
    <div className="mt-5 flex flex-wrap justify-end gap-2">{canEdit ? <LinkButton href={`${basePath}/${current.id}/edit`} size="sm" variant="outline"><PencilSimple size={15} /> Edit</LinkButton> : null}<Button isDisabled={deleting || Boolean(action)} onPress={() => void remove()} size="sm" variant="destructive"><Trash size={15} /> Delete</Button></div>
    <header className="mt-5 overflow-hidden border border-[#e3e9df] bg-white"><div className="flex min-h-[270px] max-w-4xl flex-col justify-center p-7 sm:p-9"><p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">{mode === "admin" ? "Marketplace listing" : "Your listing"}</p><h2 className="mt-3 font-serif text-4xl tracking-[-0.05em] text-brand sm:text-5xl">{current.name}</h2><p className="mt-3 text-sm text-brand-light">/{current.slug}{current.sku ? ` · ${current.sku}` : ""}</p><div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-brand-light"><Badge className={`border ${statusClass[current.status]}`} variant="outline">{statusLabel[current.status]}</Badge><span>{current.category?.name ?? "No category"}</span><span>{priceLabel}</span></div></div></header>
    <nav aria-label="Product detail sections" className="mt-6 flex overflow-x-auto border-b border-[#dce4da]">{([{ id: "detail" as const, label: "Detail", Icon: ListBullets }, { id: "gallery" as const, label: "Gallery", Icon: ImageSquare }, { id: "comments" as const, label: "Comments", Icon: ChatCircle }, { id: "messages" as const, label: "Messages", Icon: ChatCircle }]).map(({ id, label, Icon }) => <button className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${tab === id ? "border-brand text-brand" : "border-transparent text-brand-gray-3 hover:text-brand"}`} key={id} onClick={() => setTab(id)} type="button"><Icon size={17} />{label}</button>)}</nav>
    {tab === "detail" ? <section className="mt-8"><div className="max-w-4xl"><p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">Product detail</p><h3 className="mt-2 font-serif text-3xl tracking-[-0.04em] text-brand">The listing story</h3>{body ? <div className="mt-5 text-sm leading-7 text-brand-light [&_a]:text-brand-3 [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-brand-green [&_blockquote]:pl-4 [&_h1]:mb-3 [&_h1]:font-serif [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_ol]:my-3 [&_ol]:list-decimal [&_p]:mb-3 [&_strong]:font-semibold [&_ul]:my-3 [&_ul]:list-disc" dangerouslySetInnerHTML={{ __html: body }} /> : <p className="mt-5 text-sm leading-7 text-brand-light">No description yet.</p>}</div>
      <div className="mt-9 border-t border-[#dce4da] pt-7"><p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">Listing information</p><dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">{[["Category", current.category?.name ?? "—"], ["Vendor", current.vendor?.display_name ?? `Vendor #${current.vendor_id ?? "—"}`], ["Status", statusLabel[current.status]], ["Price", priceLabel], ["Total stock", String(current.stock_quantity ?? 0)], ["Template", `v${current.template_id}`]].map(([label, value]) => <div key={label}><dt className="text-xs text-brand-gray-3">{label}</dt><dd className="mt-1 font-semibold text-brand">{value}</dd></div>)}</dl></div>
      <div className="mt-9 border-t border-[#dce4da] pt-7"><p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">Variants and pricing</p>{variants.length ? <div className="mt-4 divide-y divide-[#e3e9df] border-y border-[#e3e9df]">{variants.map((variant, index) => <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 py-4" key={variant.id}><div className="min-w-0"><p className="truncate font-semibold text-brand">{variant.option_values?.length ? variant.option_values.map((option) => `${option.attribute_name ?? option.attribute_code}: ${option.value}`).join(" · ") : `Variant ${index + 1}`}</p><p className="mt-1 text-xs text-brand-gray-3">{variant.sku ? `SKU: ${variant.sku}` : "Standard product"}</p></div><span className="text-sm font-semibold text-brand">{price(variant.price)}</span><span className="text-sm text-brand-light">{variant.stock_quantity} in stock</span></div>)}</div> : <p className="mt-4 text-sm text-brand-gray-3">No variants found.</p>}</div>
      {(current.attributes?.length ?? 0) > 0 ? <div className="mt-9 border-t border-[#dce4da] pt-7"><p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">Additional details</p><dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">{current.attributes?.map((item) => <div key={item.field_id}><dt className="text-xs text-brand-gray-3">{item.field_label ?? item.field_key ?? "Detail"}</dt><dd className="mt-1 font-semibold text-brand">{attribute(item.value)}</dd></div>)}</dl></div> : null}
      <VendorProductEngagement productId={current.id} scope={mode} section="reviews" /></section> : null}
    {tab === "gallery" ? <section className="mt-8"><p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">Product gallery</p><h3 className="mt-2 font-serif text-3xl tracking-[-0.04em] text-brand">Photos of this listing</h3>{images.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2">{images.map((image) => <figure className="overflow-hidden bg-[#f4f7f1]" key={image.id}><img alt={image.alt_text ?? current.name} className="aspect-[4/3] h-full w-full object-contain" src={resolveMediaUrl(image.url)} /></figure>)}</div> : <p className="mt-5 text-sm text-brand-gray-3">No product photos uploaded yet.</p>}</section> : null}
    {tab === "comments" ? <VendorProductEngagement productId={current.id} scope={mode} section="comments" /> : null}
    {tab === "messages" && mode === "vendor" ? <ProductConversations productId={current.id} /> : null}
  </div>
}
