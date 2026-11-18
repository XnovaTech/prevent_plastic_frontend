"use client"

import Link from "next/link"
import { useState } from "react"
import { SignIn, UserPlus } from "@phosphor-icons/react"

import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useBlogSubmissionAccess } from "@/hooks/useBlogSubmissionAccess"

type BlogSubmissionGateProps = {
  children: React.ReactNode
}

export function BlogSubmissionGate({ children }: BlogSubmissionGateProps) {
  const { canSubmit, isReady } = useBlogSubmissionAccess()
  const [dialogOpen, setDialogOpen] = useState(true)

  if (!isReady) {
    return (
      <div className="flex min-h-[360px] items-center justify-center px-4">
        <p className="text-sm text-brand-light">Checking your account…</p>
      </div>
    )
  }

  if (canSubmit) {
    return children
  }

  return (
    <>
      <div className="flex min-h-[360px] items-center justify-center px-4">
        {!dialogOpen && (
          <div className="max-w-sm rounded-[26px] border border-[#e3e9df] bg-white p-6 text-center shadow-[0_20px_50px_-38px_rgba(27,65,56,0.45)]">
            <p className="font-serif text-2xl text-brand">Ready to share?</p>
            <p className="mt-2 text-sm leading-6 text-brand-light">
              Please sign in or create an account before submitting a Journal story.
            </p>
            <button
              className="mt-5 rounded-full bg-brand-2 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-3"
              onClick={() => setDialogOpen(true)}
              type="button"
            >
              View sign-in options
            </button>
          </div>
        )}
      </div>
      <Dialog isOpen={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader className="items-center text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-[#eaf1e7] text-brand-2">
            <SignIn aria-hidden="true" size={24} weight="bold" />
          </span>
          <DialogTitle className="mt-3 font-serif text-2xl tracking-[-0.04em] text-brand">
            Sign in to share your story
          </DialogTitle>
          <DialogDescription className="max-w-sm text-center leading-6 text-brand-light">
            Creating a Journal story is available to registered community
            members. Please sign in, or create an account to get started.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-1 sm:flex-row sm:justify-center">
          <Link
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#dce4da] px-5 text-sm font-semibold text-brand-3 transition-colors hover:bg-[#f1f5ed]"
            href="/register"
          >
            <UserPlus aria-hidden="true" size={17} />
            Create account
          </Link>
          <Link
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-2 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-3"
            href="/login"
          >
            <SignIn aria-hidden="true" size={17} />
            Log in
          </Link>
        </DialogFooter>
      </Dialog>
    </>
  )
}
