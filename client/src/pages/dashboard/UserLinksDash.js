import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
const UserLinksDash = () => {
  return (
    <Card className='mb-4'>
      <Card.Body>
        <Card.Title>User links</Card.Title>
        <ListGroup variant='flash'>
          <ListGroup.Item>
            <Link to='/cart' className='nav-item nav-link'>
              My Cart
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/profile/update' className='nav-item nav-link'>
              Update Profile
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default UserLinksDash
