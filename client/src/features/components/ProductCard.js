import React from 'react'
import moment from 'moment'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { API } from '../../config'
import { UseCartContext } from '../../Context'
import { addToCart } from '../services/cartServices'
import ProductCardImage from './ProductCardImage'
const ProductCard = ({ product, showButton = true, flag = 'small' }) => {
  const [cart, setCart] = UseCartContext()
  console.log(product.description)
  const handleClick = () => {
    addToCart(product, cart, setCart)
  }
  return (
    <Card>
      <Row className={`${flag !== 'small' ? 'card-horizontal' : 'smallImg'}`}>
        <Col lg={flag !== 'small' ? 6 : 12} className='text-center p-1'>
          <ProductCardImage name={product.name} imageUrl={product.photoUrl} />
        </Col>
        <Col lg={flag !== 'small' ? 6 : 12}>
          <Card.Body>
            {flag !== 'small' && <Card.Title>{product.name}</Card.Title>}
            <p className={showButton && 'cutoff-text'}>{product.description}</p>
            <Card.Text>
              Price: <span style={{ color: '#e45b51' }}>${product.price}</span>
            </Card.Text>
            {!showButton && (
              <>
                <Card.Text>
                  {product.quantity < 1 ? 'Out of stock ' : 'In stock:'}{' '}
                  <span style={{ color: '#e45b51' }}> {product.quantity}</span>
                </Card.Text>
                <Card.Text>
                  Category:{' '}
                  <span style={{ color: '#e45b51' }}>
                    {product.category.name}
                  </span>
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
              <Link
                to={`/product/${product._id}`}
                className='my-2 btn btn-card'
              >
                View Product
              </Link>
            )}
            {product.quantity > 0 && Object.keys(cart.user).length > 0 && (
              <button className='my-2 btn-card' onClick={handleClick}>
                Add to Cart
              </button>
            )}
            {product.quantity === 0 && (
              <Card.Title> Currently unavailable</Card.Title>
            )}
          </Card.Body>
        </Col>
      </Row>{' '}
    </Card>
  )
}

export default ProductCard
