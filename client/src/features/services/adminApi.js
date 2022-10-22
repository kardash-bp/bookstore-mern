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
export const allOrders = async (userId, token) => {
  try {
    const { data } = await axios.get(`${API}/order/all/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!data) {
      throw new Error('Something went wrong. Retrieving orders failed')
    }
    //console.log(data)
    return data
  } catch (err) {
    console.log('Orders:' + err.message)
    return { error: err.message }
  }
}
export const statusOrder = async (userId, token) => {
  try {
    const { data } = await axios.get(`${API}/order/status/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!data) {
      throw new Error('Something went wrong. Retrieving orders failed')
    }
    return data
  } catch (err) {
    console.log('Orders:' + err.message)
    return { error: err.message }
  }
}
export const updateStatusOrder = async (orderId, userId, token, status) => {
  try {
    const { data } = await axios.put(
      `${API}/order/update-status/${orderId}/${userId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!data) {
      throw new Error('Something went wrong. Retrieving orders failed')
    }
    console.log(data)
    return data
  } catch (err) {
    console.log('Orders:' + err.message)
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
