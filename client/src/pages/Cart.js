import React from 'react'
import { UseCartContext } from '../Context'
import { BsCartDash, BsCartPlus, BsCartXFill } from 'react-icons/bs'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import AppLayout from '../layout/appLayout/AppLayout'
import { API } from '../config'
import {
  addToCart,
  removeFromCart,
  totalCart,
  removeBookFromCart,
  removeAllFromCart,
  totalBook,
} from '../features/services/cartServices'
import Checkout from '../features/UI/Checkout'
//todo uradi cart tabelu
const Cart = () => {
  const [cart, setCart] = UseCartContext()

  const emptyCart = () => (
    <h3>
      Your cart is empty.
      <br />{' '}
      <Link to='/shop' className='btn btn-card btn_width mt-3'>
        {' '}
        Back to Books
      </Link>
    </h3>
  )
  return (
    <AppLayout
      title='Your Shopping Cart'
      description='Review cart items,continue to checkout or shopping. '
      className='container-fluid cart'
    >
      <Row>
        <h3>Billing details</h3>
        <h4>
          <hr />
          Total: ${totalCart(cart.basket)}{' '}
          <BsCartXFill
            onClick={() => removeAllFromCart(setCart)}
            className='icon icon-del'
            style={{ fontSize: '2.5rem', paddingBottom: '0.5rem' }}
          />
          <hr />
        </h4>
      </Row>
      <Row>
        <Col lg={5}>
          {cart.basket.length === 0 && emptyCart()}
          {cart.basket.length > 0 &&
            cart.basket.map((c, i) => (
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
                    Price: ${c.price} x {c.count} <br />
                    <BsCartPlus
                      onClick={() => addToCart(c, cart, setCart)}
                      className='icon icon-plus'
                    />{' '}
                    <BsCartDash
                      onClick={() => removeFromCart(c, cart, setCart)}
                      className='icon icon-min'
                    />{' '}
                    <BsCartXFill
                      onClick={() => removeBookFromCart(c, cart, setCart)}
                      className='icon icon-del'
                    />{' '}
                  </Card.Text>
                  <hr />
                  <Card.Text>
                    {' '}
                    total: <strong>${totalBook(c.price, c.count)}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </Col>
        <Col lg={7}>
          <Checkout total={totalCart(cart.basket)} />
        </Col>
      </Row>
    </AppLayout>
  )
}
export default Cart
