import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import Card from 'react-bootstrap/Card'
import { getOrderById } from '../../features/services/order'
const PurchaseHistoryDash = ({ history }) => {
  const [state, setState] = useState([])
  const init = useCallback((arr) => {
    Promise.all(arr.map((h) => getOrderById(h)))
      .then((values) => {
        setState(values)
      })
      .catch((err) => console.log(err.message))
  }, [])

  useEffect(() => {
    init(history)
  }, [history])

  return (
    <div>
      <h3>Purchase history</h3>
      {state.length === 0
        ? 'History is empty'
        : state.map((h, i) => (
            <Card key={i} className='p-3'>
              {h.items.map((p, i) => {
                return (
                  <Card.Body key={i}>
                    <h5>
                      Product name: <strong>{p.name}</strong>
                    </h5>
                    <h6>Product price: ${p.price}</h6>
                    <h6>Product count: {p.count}</h6>
                    <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                    <h6>{h._id}</h6>
                    <h6>
                      Total amount: <strong> ${h.amount} </strong> Status:
                      <strong> {h.status}</strong>
                    </h6>
                  </Card.Body>
                )
              })}
            </Card>
          ))}
    </div>
  )
}

export default PurchaseHistoryDash
