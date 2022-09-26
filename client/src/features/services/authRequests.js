import axios from 'axios'
import { API } from '../../config'

export const registerUser = async (user, values, setValues) => {
  try {
    const response = await axios.post(`${API}/auth/register`, user)
    console.log(response.data)
    if (!response.data) {
      throw new Error('The account was not created. Try again.')
    } else {
      setValues({
        ...values,
        name: '',
        email: '',
        password: '',
        error: '',
        success: true,
      })
      return response.data
    }
  } catch (err) {
    setValues({
      ...values,

      error: err.response.data,
      success: false,
    })
    console.log(err)
    return err
  }
}
export const loginUser = async (user, values, setValues) => {
  try {
    const { data } = await axios.post(`${API}/auth/login`, user)
    console.log(data)
    if (!data) {
      throw new Error('You are not logged in. Try again.')
    } else {
      authenticatedUser(data, () => {
        setValues({
          ...values,

          email: '',
          password: '',
          error: '',
          loading: true,
        })
      })
    }
  } catch (err) {
    setValues({
      ...values,

      error: err.response.data,
      loading: false,
    })
    console.log('login:' + err)
    return err
  }
}
export const logoutUser = async (cb) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt')
    }
    try {
      const response = await axios.get(`${API}/auth/logout`)
      console.log(response)
      cb()
      return response
    } catch (err) {
      console.log(err.message)
    }
  }
}
export const authenticatedUser = (data, cb) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data))
    cb()
  }
}
export const isAuth = () => {
  if (typeof window === 'undefined') return false
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  } else {
    return false
  }
}
export const isAdmin = () => {
  if (typeof window === 'undefined') return false

  if (
    localStorage.getItem('jwt') &&
    JSON.parse(localStorage.getItem('jwt')).user.role === 1
  ) {
    return JSON.parse(localStorage.getItem('jwt'))
  } else {
    return false
  }
}
