import React from 'react'
import moment from 'moment'

import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { API } from '../../config'
import { UseCartContext } from '../../Context'
import { addToCart } from '../services/cartServices'
const ProductCard = ({ product, showButton = true }) => {
  const [cart, setCart] = UseCartContext()

  const handleClick = () => {
    addToCart(product, cart, setCart)
  }
  return (
    <Card>
      <Card.Img
        crossOrigin='anonymous'
        variant='top'
        src={`${API}/product/photo/${product._id}`}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {showButton
            ? product.description.split(' ').slice(0, 15).join(' ')
            : product.description}
          {!showButton && '...'}
        </Card.Text>
        <Card.Text>
          Price: <span style={{ color: '#e45b51' }}>{product.price}</span>
        </Card.Text>
        {!showButton && (
          <>
            <Card.Text>
              {product.quantity < 1 ? 'Out of stock ' : 'In stock:'}{' '}
              <span style={{ color: '#e45b51' }}> {product.quantity}</span>
            </Card.Text>
            <Card.Text>
              Category:{' '}
              <span style={{ color: '#e45b51' }}>{product.category.name}</span>
            </Card.Text>
            <Card.Text>
              Added{' '}
              <span style={{ color: '#e45b51' }}>
                {moment(product.createdAt).fromNow()}
              </span>
            </Card.Text>
          </>
        )}
      </Card.Body>

      <Card.Body className='d-grid'>
        {showButton && (
          <Link to={`/product/${product._id}`} className='my-2 btn btn-card'>
            View Product
          </Link>
        )}
        {product.quantity > 0 && Object.keys(cart.user).length > 0 && (
          <button className='my-2 btn-card' onClick={handleClick}>
            Add to Cart
          </button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductCard
