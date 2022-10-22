import axios from 'axios'
import { API } from '../../config'

export const getUserProfile = async (id, token) => {
  try {
    const { data } = await axios.get(`${API}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!data) {
      throw new Error('Products not found.')
    }
    return data
  } catch (err) {
    console.log('user profile:' + err.message)
    return { error: err.message }
  }
}
export const updateUserProfile = async (id, token, user) => {
  try {
    const { data } = await axios.put(`${API}/user/${id}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!data) {
      throw new Error('Products not found.')
    }
    return data
  } catch (err) {
    console.log('user profile:' + err.message)
    return { error: err.message }
  }
}
