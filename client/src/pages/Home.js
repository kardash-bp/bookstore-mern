import React, { useState, useEffect } from 'react'
import AppLayout from '../layout/appLayout/AppLayout'
import { getProducts } from '../features/services/productApi'
import Card from '../features/UI/ProductCard'
import Row from 'react-bootstrap/Row'
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
      {error && error.message}
      <Row className='mt-4 mb-4'>
        <h2> Trending books </h2>
        {productsBySell.map((p, i) => (
          <Card key={i} product={p} />
        ))}
      </Row>
      <Row>
        <h2 className='mt-4 mb-2'> New Arrival </h2>
        {productsByArrival.map((p, i) => (
          <Card key={i} product={p} />
        ))}
      </Row>
    </AppLayout>
  )
}

export default Home
