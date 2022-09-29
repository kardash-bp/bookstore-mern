import axios from 'axios'
import { API } from '../../config'

export const getBook = async (id) => {
  try {
    const { data } = await axios.get(`${API}/product/${id}`)
    if (!data) {
      throw new Error('Products not found.')
    }
    return data
  } catch (err) {
    console.log('Products:' + err.message)
    return { error: err.message }
  }
}
export const relatedBooks = async (id) => {
  try {
    const { data } = await axios.get(`${API}/product/all/related/${id}`)
    if (!data) {
      throw new Error('Products not found.')
    }
    return data
  } catch (err) {
    console.log('Products:' + err.message)
    return { error: err.message }
  }
}

export const getProducts = async (sortBy) => {
  try {
    const { data } = await axios.get(
      `${API}/product/all?sortBy=${sortBy}&order=desc&limit=4`
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
  try {
    const { data } = await axios.post(`${API}/product/search`, {
      skip,
      limit,
      filters,
    })
    return data
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}
export const getProductsSearch = async (text, category) => {
  try {
    const { data } = await axios.get(
      `${API}/product/search?text=${text}&category=${category}`
    )
    console.log(data)
    return data
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}
