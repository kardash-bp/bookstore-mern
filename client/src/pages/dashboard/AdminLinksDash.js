import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
const AdminLinksDash = ({ userId }) => {
  return (
    <Card className='mb-4'>
      <Card.Body>
        <Card.Title>Admin links</Card.Title>
        <ListGroup variant='flash'>
          <ListGroup.Item>
            <Link to='/orders' className='nav-item nav-link'>
              Orders
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/create/category' className='nav-item nav-link'>
              Create Category
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/products' className='nav-item nav-link'>
              Books CRUD
            </Link>
          </ListGroup.Item>

          <ListGroup.Item>
            <Link to='/cart' className='nav-item nav-link'>
              My Cart
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to={`/profile/${userId}`} className='nav-item nav-link'>
              Update Profile
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default AdminLinksDash
