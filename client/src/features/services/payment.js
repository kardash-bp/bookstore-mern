import axios from 'axios'
import { API } from '../../config'
import { isAuth } from './authRequests'

export const getPaymentClientToken = async (userId, token) => {
  try {
    const { data } = await axios.get(`${API}/payments/token/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!data) {
      throw new Error('Products not found.')
    }
    return data.clientToken
  } catch (err) {
    console.log('Checkout:' + err.message)
    return err.message
  }
}
export const processPurchase = async (userId, total) => {
  try {
    const { data } = await axios.post(
      `${API}/payments/purchase/${userId}`,
      {
        total,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${isAuth().token}`,
        },
      }
    )
    return data
  } catch (err) {
    console.log(err.message)
  }
}
