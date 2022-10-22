import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from 'react'
import { isAuth } from './features/services/authRequests'

export const Context = createContext(undefined)

export const UseCartContext = () => useContext(Context)

const initialState = {
  user: { ...isAuth().user },
  basket: [],
  payment: { token: '', instance: {} },
  error: '',
  total: 0,
  userId: '',
  address: {},
  editBook: {},
}
//todo local storage cart
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(initialState)
  const loadStorage = useCallback(() => {
    if (!localStorage.getItem('jwt')) {
      return
    }
    const { user } = isAuth()
    if (!localStorage.getItem('state')) {
      setCart({ ...initialState, user: user, userId: user._id })
      return
    }
    if (localStorage.getItem('state')) {
      const ls = JSON.parse(localStorage.getItem('state'))
      if (cart.userId === ls.userId) setCart(ls)
    } else {
      localStorage.removeItem('state')
      setCart({ ...initialState, user: user, userId: user._id })
    }
  }, [cart.userId])

  const saveBasket = useCallback(() => {
    if (!localStorage.getItem('jwt')) return
    const { user } = isAuth()
    if (!localStorage.getItem('state') && cart.userId !== '') {
      localStorage.setItem(
        'state',
        JSON.stringify({ ...initialState, user, userId: user._id })
      )
    }
    if (user._id === cart.userId && cart.basket.length > 0) {
      localStorage.setItem('state', JSON.stringify(cart))
    } else {
      if (Object.keys(cart.editBook).length > 0) return
      localStorage.removeItem('state')
      setCart({ ...initialState, user: isAuth().user, userId: user._id })
    }
  }, [cart])

  useEffect(() => {
    loadStorage()
  }, [loadStorage])

  useEffect(() => {
    saveBasket()
  }, [cart.basket])
  return <Context.Provider value={[cart, setCart]}>{children}</Context.Provider>
}
