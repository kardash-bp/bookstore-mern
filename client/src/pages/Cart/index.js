import React from 'react'
import { UseCartContext } from '../../Context'

import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import ProductCard from '../../features/UI/ProductCard'
import AppLayout from '../../layout/appLayout/AppLayout'
import ProductCardImage from '../../features/UI/ProductCardImage'
import { API } from '../../config'
//todo uradi cart tabelu
const Cart = () => {
  const [cart, setCart] = UseCartContext()
  console.log(cart)
  const emptyCart = () => (
    <h3>
      Your cart is empty.&nbsp <Link to='/shop'>Back to Books</Link>
    </h3>
  )
  return (
    <AppLayout
      title='Your Shopping Cart'
      description='Review cart items,continue to checkout or shopping. '
      className='container-fluid cart'
    >
      <Row>
        {cart.map((c, i) => (
          <Card key={i}>
            <Card.Body>
              {' '}
              <Image
                crossOrigin='anonymous'
                className='float-start small-image me-3'
                src={`${API}/product/photo/${c._id}`}
              />
              <Card.Title>{c.name}</Card.Title>
              <Card.Text>
                ${c.price} x {c.count}{' '}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
      <Row>
        <h4>checkout/shipping</h4>
      </Row>
    </AppLayout>
  )
}
export default Cart
