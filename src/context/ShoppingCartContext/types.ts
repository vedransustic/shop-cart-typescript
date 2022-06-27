import { ReactNode } from 'react'

export type ShoppingCartProviderProps = {
  children: ReactNode
}

export type ShoppingCartContextObj = {
  getItemQuantity: (id: number) => number
  increaseItemQuantity: (id: number) => void
  decreaseItemQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  openCart: () => void
  closeCart: () => void
  cartQuantity: number
  cartItems: CartItem[]
}

export type CartItem = {
  id: number
  quantity: number
}

export type ShoppingCartProps = {
  cartState: boolean
}
