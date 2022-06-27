import React from 'react'
import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Cart from '../../icons/CartIcon'
import './index.css'
import { useShoppingCart } from '../../context'

const Navbar = () => {
  const { cartQuantity, openCart } = useShoppingCart()
  return (
    <NavbarBs className='bg-white shadow-sm mb-3' sticky='top'>
      <Container>
        <Nav className='me-auto'>
          <Nav.Link to='/' as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to='/store' as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to='/about' as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        <Button
          className='nav-button rounded-circle'
          variant='outline-secondary'
          onClick={openCart}
        >
          <Cart />
          {cartQuantity > 0 && (
            <div className='rounded-circle bg-danger d-flex justify-content-center align-items-center num-items'>
              {cartQuantity}
            </div>
          )}
        </Button>
      </Container>
    </NavbarBs>
  )
}

export default Navbar
