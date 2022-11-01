import React, { useEffect, useState } from 'react'
import AppLayout from '../../layout/appLayout/AppLayout'
import { allOrders, statusOrder, updateStatusOrder } from '../services/adminApi'
import { isAdmin } from '../services/authRequests'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import moment from 'moment'
import { inputGroupField } from '../utils/inputGroupField'
import FormSelect from 'react-bootstrap/esm/FormSelect'
const Orders = () => {
  const [orders, setOrders] = useState([])
  const [selectStatus, setSelectStatus] = useState([])
  const { token, user } = isAdmin()
  const init = async () => {
    const arrOrders = await allOrders(user._id, token)
    setOrders([...arrOrders])

    const statusEnum = await statusOrder(user._id, token)
    setSelectStatus([...statusEnum])
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <AppLayout
      title='Orders'
      description='Reviewing, approving, and fulfilling customer orders'
    >
      <Row className='d-flex justify-content-center'>
        <Col md={10}>
          {orders.length === 0 ? (
            <h2 variant='danger'>No Orders</h2>
          ) : (
            orders.map((o, i) => (
              <div className='mt-5' key={i}>
                <h2>Order ID: {o._id}</h2>
                <ListGroup>
                  <ListGroup.Item>
                    <h5>Order Status: {o.status}</h5>
                    <FormSelect
                      onChange={(e) => {
                        setOrders((prev) =>
                          prev.map((el) => {
                            if (el._id === o._id) {
                              el.status = e.target.value
                            }
                            return el
                          })
                        )
                        updateStatusOrder(
                          o._id,
                          user._id,
                          token,
                          e.target.value
                        )
                      }}
                    >
                      <option>Set Status</option>
                      {selectStatus.map((s, i) => (
                        <option key={i} className='opt' value={s}>
                          {s}
                        </option>
                      ))}
                    </FormSelect>
                  </ListGroup.Item>
                  <ListGroup.Item>Amount: ${o.amount}</ListGroup.Item>
                  <ListGroup.Item>Customer: {o.user.name}</ListGroup.Item>
                  <ListGroup.Item>
                    Order date: {moment(o.createdAt).fromNow()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className='fw-bold'>Delivery address:</div>

                    {inputGroupField(
                      'Full name',
                      o.address.first + ' ' + o.address.last
                    )}

                    {inputGroupField('address', o.address.address)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h5>Total Items: {o.items.length}</h5>
                    {o.items.map((item, index) => (
                      <Row key={index} className='orders mb-3'>
                        <Col md={12}> {inputGroupField('Name', item.name)}</Col>
                        <Col md={6}>
                          {' '}
                          {inputGroupField('Quantity', item.count)}
                        </Col>
                        <Col md={6}>
                          {' '}
                          {inputGroupField('Price', item.price)}
                        </Col>
                      </Row>
                    ))}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            ))
          )}
        </Col>
      </Row>
    </AppLayout>
  )
}

export default Orders
