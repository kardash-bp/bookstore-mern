import React, { useState, useEffect, useCallback } from 'react'
import AppLayout from '../layout/appLayout/AppLayout'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ShopSidebar from '../features/components/ShopSidebar'
import { getProductsFiltered } from '../features/services/productApi'
import ProductCard from '../features/components/ProductCard'
import useCategories from '../hooks/useCategories'
import { TbLayoutSidebarLeftExpand } from 'react-icons/tb'
import FilterModal from '../features/components/FilterModal'
const ShopPage = () => {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState({ limit: 6, skip: 0, size: 6 })
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [shopFilters, setShopFilters] = useState({
    category: [],
    price: [],
  })
  const [categories, err] = useCategories()
  const [error, setError] = useState(false)
  const { limit, skip, size } = query

  const filtersHandler = useCallback(
    (filters, filterMethod) => {
      const newFilters = shopFilters
      newFilters[filterMethod] = filters
      setShopFilters({ ...newFilters })
      setQuery((prev) => ({ ...prev, skip: 0 }))
    },
    [shopFilters]
  )
  const loadProducts = useCallback(async () => {
    const data = await getProductsFiltered(limit, skip, shopFilters)
    if (!data.data) {
      setError('PRODUCTS NOT AVAILABLE.')
    } else {
      setProducts(data.data)
      setQuery((prev) => ({ ...prev, skip: 0, size: data.size }))
    }
  }, [limit, skip, shopFilters])
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
  const handleResetToggle = () => {
    setToggleSidebar(false)
  }

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  if (error) {
    console.log(error, err)
  }
  return (
    <AppLayout
      title='Shop Page'
      description='Choose the next book to read.'
      className='container'
    >
      <Row>
        <ShopSidebar categories={categories} filtersHandler={filtersHandler} />
        <Col md={12} lg={9} className='mb-5'>
          <span
            onClick={() => setToggleSidebar(!toggleSidebar)}
            style={{ color: '#e98074', cursor: 'pointer' }}
          >
            {' '}
            <TbLayoutSidebarLeftExpand
              size={32}
              className={!toggleSidebar ? 'd-lg-none mt-3' : 'mt-3'}
            />
          </span>

          {toggleSidebar && (
            <FilterModal
              toggle={toggleSidebar}
              resetToggle={handleResetToggle}
              filtersHandler={filtersHandler}
              categories={categories}
            />
          )}
          <Row>
            {products.map((product, i) => (
              <Col key={i} sm={6} md={4} lg={4} className='mt-3'>
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
