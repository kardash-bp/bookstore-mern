import React, { useState, useEffect, useCallback } from 'react'
import AppLayout from '../../layout/appLayout/AppLayout'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ShopSidebar from './ShopSidebar'
import { getProductsFiltered } from '../../features/services/productApi'
import ProductCard from '../../features/UI/ProductCard'
import useCategories from '../../hooks/useCategories'

const ShopPage = () => {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState({ limit: 6, skip: 0, size: 6 })
  const [shopFilters, setShopFilters] = useState({
    category: [],
    price: [],
  })
  const [categories, err] = useCategories()
  const [error, setError] = useState(false)
  const { limit, skip, size } = query

  const filtersHandler = useCallback((filters, filterMethod) => {
    const newFilters = shopFilters
    newFilters[filterMethod] = filters
    setShopFilters({ ...newFilters })
    setQuery((prev) => ({ ...prev, skip: 0 }))
  }, [])
  const loadProducts = useCallback(async () => {
    const data = await getProductsFiltered(limit, skip, shopFilters)
    if (!data.data) {
      setError('PRODUCTS NOT AVAILABLE.')
    } else {
      setProducts(data.data)
      setQuery((prev) => ({ ...prev, skip: 0, size: data.size }))
    }
  }, [])
  const loadMoreProducts = async () => {
    let newSkip = skip + limit

    const data = await getProductsFiltered(limit, newSkip, shopFilters)
    if (!data.data) {
      setError('PRODUCTS NOT AVAILABLE.')
    } else {
      setProducts((prev) => [...prev, ...data.data])
      setQuery((prev) => ({
        ...prev,
        skip: newSkip,
        size: data.size,
      }))
    }
  }

  useEffect(() => {
    loadProducts()
  }, [shopFilters])

  console.log(error, err)
  return (
    <AppLayout
      title='Shop Page'
      description='Choose the next book to read.'
      className='container'
    >
      <Row>
        <ShopSidebar categories={categories} filtersHandler={filtersHandler} />
        <Col md={8} className='mb-5'>
          <h2>Browse Books</h2>
          <Row>
            {products.map((product, i) => (
              <Col key={i} md={6} lg={4} className='mt-3'>
                <ProductCard key={i} product={product} />
              </Col>
            ))}
            {size >= limit && (
              <Button
                onClick={loadMoreProducts}
                variant='warning'
                size='lg'
                className='m-3'
              >
                Load more...
              </Button>
            )}
          </Row>
        </Col>
      </Row>
    </AppLayout>
  )
}

export default React.memo(ShopPage)
