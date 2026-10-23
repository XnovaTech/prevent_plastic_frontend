import { create } from "zustand"

import { wishlistPageMock, type WishlistItem } from "@/mock/wishlistPageMock"

type WishlistStore = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  items: wishlistPageMock.items,
  addItem: (item) =>
    set((state) =>
      state.items.some((wishlistItem) => wishlistItem.id === item.id)
        ? state
        : { items: [item, ...state.items] }
    ),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}))
