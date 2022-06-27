import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { formatCurrency } from '../../util/formatCurrency'
import { StoreItemProps } from './types'
import { useShoppingCart } from '../../context'

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart } =
    useShoppingCart()

  const quantity = getItemQuantity(id)

  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={imgUrl} height='200px' style={{ objectFit: 'cover' }} />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <span className='fs-2'>{name}</span>
          <span className='fs-2 text-muted'>{formatCurrency(price)}</span>
        </Card.Title>
        <div className='mt-auto'>
          {quantity === 0 ? (
            <Button className='w-100' onClick={() => increaseItemQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div className='d-flex align-items-center flex-column' style={{ gap: '.5rem' }}>
              <div
                className='d-flex align-items-center justify-content-center'
                style={{ gap: '.5rem' }}
              >
                <Button className='bg-secondary' onClick={() => decreaseItemQuantity(id)}>
                  -
                </Button>
                <div className='text-center'>
                  <span className='fs-3'>{quantity}</span> in cart
                </div>
                <Button className='bg-secondary' onClick={() => increaseItemQuantity(id)}>
                  +
                </Button>
              </div>
              <Button variant='danger' size='sm' onClick={() => removeFromCart(id)}>
                Reset
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default StoreItem
