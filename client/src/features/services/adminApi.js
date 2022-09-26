import axios from 'axios'
import { API } from '../../config'

export const getCategories = async (token) => {
  try {
    const { data } = await axios.get(`${API}/category/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!data) {
      throw new Error('Category must be unique.')
    }
    return data
  } catch (err) {
    console.log('Categories:' + err.message)
    return { error: err.message }
  }
}

export const createCategory = async (userId, token, category) => {
  try {
    const { data } = await axios.post(
      `${API}/category/create/${userId}`,
      category,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!data) {
      throw new Error('Category must be unique.')
    }
    return data
  } catch (err) {
    console.log('Category:' + err.message)
    return { error: err.message }
  }
}

export const createProduct = async (token, product) => {
  try {
    const { data } = await axios.post(`${API}/product/create`, product, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!data) {
      throw new Error('Product has not been created.')
    }
    return data
  } catch (err) {
    console.log('Product:' + err.message)
    return { error: err.message }
  }
}
