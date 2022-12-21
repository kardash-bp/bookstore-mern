import React, { useState, useEffect, Suspense } from 'react'
import AppLayout from '../layout/appLayout/AppLayout'
import { getProducts } from '../features/services/productApi'
import Card from '../features/components/ProductCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
const Search = React.lazy(() => import('../features/components/Search'))
const Home = () => {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductsBySell = async () => {
    try {
      const data = await getProducts('sold')
      if (data.error) {
        setError(data.error)
      } else {
        setProductsBySell(data)
      }
    } catch (err) {
      console.log(err.message)
      setError(true)
    }
  }
  const loadProductsByArrival = async () => {
    try {
      const data = await getProducts('createdAt')
      if (data.error) {
        setError(data.error)
      } else {
        setProductsByArrival(data)
      }
    } catch (err) {
      console.log(err.message)
      setError(true)
    }
  }
  useEffect(() => {
    loadProductsBySell()
    loadProductsByArrival()
  }, [])

  return (
    <AppLayout title='Home Page'>
      <Suspense fallback={<Spinner />}>
        {' '}
        <Search />
      </Suspense>
      {error && error.message}
      <Row className='mt-4 mb-4'>
        <h2>Best selling books</h2>
        {productsBySell.map((p, i) => (
          <Col key={i} md={6} lg={4} xl={3} className='mt-3'>
            <Card product={p} />
          </Col>
        ))}
      </Row>
      <Row>
        <h2 className='mt-4 mb-2'>Recently Added Books</h2>
        {productsByArrival.map((p, i) => (
          <Col key={i} md={6} lg={4} xl={3} className='mt-3'>
            <Card key={i} product={p} />
          </Col>
        ))}
      </Row>
    </AppLayout>
  )
}

export default Home
