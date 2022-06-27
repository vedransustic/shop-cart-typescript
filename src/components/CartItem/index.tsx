import React from 'react'
import { CartItemProps } from './types'
import { useShoppingCart } from '../../context'
import storeItems from '../../data/items.json'
import { Button, Stack } from 'react-bootstrap'
import { formatCurrency } from '../../util/formatCurrency'

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart()
  const item = storeItems.find((item) => item.id === id)
  if (item == null) return null
  return (
    <Stack direction='horizontal' gap={2}>
      <img
        src={item.imgUrl}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
        alt='cartItemImg'
      />
      <div className='me-auto'>
        <div>
          {item.name}{' '}
          {quantity > 1 && (
            <span className='text-muted' style={{ fontSize: '.65rem' }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className='text-muted' style={{ fontSize: '.75rem' }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button variant='outline-danger' size='sm' onClick={() => removeFromCart(item.id)}>
        &times;
      </Button>
    </Stack>
  )
}

export default CartItem
