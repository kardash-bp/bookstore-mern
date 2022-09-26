import axios from 'axios'
import { API } from '../../config'

export const getProducts = async (sortBy) => {
  try {
    const { data } = await axios.get(
      `${API}/product/all?sortBy=${sortBy}&order=desc&limit=6`
    )
    if (!data) {
      throw new Error('Products not found.')
    }
    return data
  } catch (err) {
    console.log('Products:' + err.message)
    return { error: err.message }
  }
}
export const getProductsFiltered = async (limit, skip, filters) => {
  console.log('GPF run')
  try {
    const { data } = await axios.post(`${API}/product/search`, {
      skip,
      limit,
      filters,
    })
    console.log(data)
    return data
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}
