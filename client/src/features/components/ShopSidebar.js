import React from 'react'
import Col from 'react-bootstrap/Col'
import { prices } from '../prices/fixedPricesRange'
import Checkbox from './Checkbox'

const ShopSidebar = ({ categories, filtersHandler }) => {
  return (
    <Col md={3} className='d-none d-lg-block'>
      <h5 className='mb-3'>Filtered by categories</h5>
      <ul>
        <Checkbox
          filMet='category'
          data={categories}
          filtersHandler={filtersHandler}
        />
      </ul>
      <h5 className='mt-5 mb-3'>Filtered by price</h5>
      <ul>
        <Checkbox
          filMet='price'
          data={prices}
          filtersHandler={filtersHandler}
        />
      </ul>
    </Col>
  )
}

export default React.memo(ShopSidebar)
