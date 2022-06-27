import { useContext, createContext, useState } from 'react'
import { ShoppingCartProviderProps, ShoppingCartContextObj, CartItem } from './types'
import { ShoppingCart } from '../../components'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const ShoppingCartContext = createContext({} as ShoppingCartContextObj)

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}

// Provider needs to vrap around the children
export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])
  const [cartState, setCartState] = useState<boolean>(false)
  const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0)

  const getItemQuantity = (id: number) => {
    return cartItems.find((x) => x.id === id)?.quantity || 0
  }

  const increaseItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      }
      return currItems.map((item) => {
        return item.id === id ? { ...item, quantity: item.quantity + 1 } : { ...item }
      })
    })
  }

  const decreaseItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      }
      return currItems.map((item) => {
        return item.id === id ? { ...item, quantity: item.quantity - 1 } : { ...item }
      })
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id))
  }

  const openCart = () => setCartState(true)

  const closeCart = () => setCartState(false)

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <ShoppingCart cartState={cartState} />
    </ShoppingCartContext.Provider>
  )
}
