import React from 'react'
import { useShoppingCart } from '../../context'
import { Offcanvas, Stack } from 'react-bootstrap'
import { ShoppingCartProps } from '../../context/ShoppingCartContext/types'
import { CartItem } from '..'
import storeItems from '../../data/items.json'
import { formatCurrency } from '../../util/formatCurrency'

const ShoppingCart = ({ cartState }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart()
  return (
    <Offcanvas show={cartState} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />
          })}
          <div className='ms-auto fw-bold fs-5'>
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0),
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart
