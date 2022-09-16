import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
const PurchaseHistoryDash = ({ user }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Purchase history</Card.Title>
        <ListGroup variant='flash'>
          <ListGroup.Item>history</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default PurchaseHistoryDash
