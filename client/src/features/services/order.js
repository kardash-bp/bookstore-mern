import axios from 'axios'
import { API } from '../../config'
import { isAuth } from './authRequests'

export const addOrder = async (userId, order) => {
  try {
    const response = await axios.post(
      `${API}/order/new/${userId}`,
      {
        order,
      },
      {
        headers: { Authorization: `Bearer ${isAuth().token}` },
      }
    )
    return response
  } catch (err) {
    console.log(err.message)
  }
}
export const getOrderById = async (orderId) => {
  try {
    const { data } = await axios.get(
      `${API}/user/order/${orderId}`,

      {
        headers: { Authorization: `Bearer ${isAuth().token}` },
      }
    )
    if (!data) {
      return 'Something went wrong!'
    }
    return data
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}
