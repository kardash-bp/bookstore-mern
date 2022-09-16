import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
const UserInformationDash = ({ user }) => {
  const { name, email, role } = user
  return (
    <Card className='mb-4'>
      <Card.Body>
        <Card.Title>User Information</Card.Title>
        <ListGroup variant='flash'>
          <ListGroup.Item>{name}</ListGroup.Item>
          <ListGroup.Item>{email}</ListGroup.Item>
          <ListGroup.Item>{role === 1 ? 'Admin' : 'User'}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default UserInformationDash
