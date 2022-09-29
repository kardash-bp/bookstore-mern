import React from 'react'
import { API } from '../../config'

const ProductCardImage = ({ item, imageUrl }) => {
  return <img src={`${API}/${imageUrl}/photo/${item._id}`} alt={item.name} />
}

export default ProductCardImage
