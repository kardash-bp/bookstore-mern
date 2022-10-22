import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../layout/appLayout/AppLayout'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import { deleteProduct, getAll } from '../features/services/productApi'
import { isAuth } from '../features/services/authRequests'
import { GiBookshelf, GiTrashCan } from 'react-icons/gi'
import { UseCartContext } from '../Context'
const Products = () => {
  const [cart, setCart] = UseCartContext()
  const [books, setBooks] = useState([])
  const { token } = isAuth()
  const navigate = useNavigate()
  const loadBooks = async () => {
    try {
      const all = await getAll()
      setBooks(all)
    } catch (err) {
      console.log(err.message)
    }
  }
  const delBook = async (id) => {
    try {
      await deleteProduct(id, token)
      loadBooks()
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    loadBooks()
  }, [])
  return (
    <AppLayout
      title='Books management'
      description='Books '
      className='container'
    >
      <Row style={{ maxWidth: '768px', margin: '0 auto' }}>
        <Col md={12}>
          <ListGroup>
            <ListGroup.Item className='mb-4'>
              <Link to='/create/product?flag=add' className='nav-item nav-link'>
                Add a new book{' '}
                <GiBookshelf
                  style={{ fontSize: '1.3rem', marginLeft: '2rem' }}
                />
              </Link>
            </ListGroup.Item>
            <h5>Total {books.length} books</h5>
            {books.map((b, i) => (
              <ListGroup.Item
                key={i}
                className='d-flex justify-content-between align-items-center'
              >
                <strong>{b.name}</strong>
                <span>
                  <Badge
                    bg='light'
                    text='dark'
                    style={{
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      verticalAlign: 'top',
                      padding: '.4rem',
                    }}
                    onClick={() => {
                      setCart((prev) => ({
                        ...prev,
                        editBook: { ...b, _id: b._id },
                      }))
                      navigate(`/create/product?flag=update`)
                    }}
                  >
                    Update
                  </Badge>
                  <Badge
                    bg='danger'
                    onClick={() => delBook(b._id)}
                    style={{
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      marginLeft: '1rem',
                      verticalAlign: 'top',
                      paddingBottom: '.5rem',
                    }}
                  >
                    <GiTrashCan />
                  </Badge>
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </AppLayout>
  )
}

export default Products
