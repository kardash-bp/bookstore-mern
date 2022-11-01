import React from 'react'
import { API } from '../../config'

const ProductCardImage = ({ name, imageUrl }) => {
  return <img src={`${API}${imageUrl}`} alt={name} crossOrigin='anonymous' />
}

export default ProductCardImage
