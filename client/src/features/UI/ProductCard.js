import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { API } from '../../config'

const ProductCard = ({ product }) => {
  return (
    <Col md={6} lg={4} xl={3} className='mt-3'>
      <Card>
        <Card.Img
          crossOrigin='anonymous'
          variant='top'
          src={`${API}/product/photo/${product._id}`}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.description
              .split(' ')
              .slice(0, 15)
              .join(' ')}
            ...
          </Card.Text>
          <Card.Text>Price: ${product.price}</Card.Text>
        </Card.Body>

        <Card.Body className='d-grid'>
          <button className='my-2 btn-card'>View Product</button>
          <button className='my-2 btn-card'>Add to Cart</button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ProductCard
