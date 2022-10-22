import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UseCartContext } from '../../Context'
import { BsCartXFill } from 'react-icons/bs'
import {
  totalCart,
  removeAllFromCart,
} from '../../features/services/cartServices'
import { isAuth } from '../services/authRequests'
import { getPaymentClientToken } from '../services/payment'
import AddressForm from './AddressForm'
const Checkout = () => {
  const [cart, setCart] = UseCartContext()

  const userId = isAuth() && isAuth().user._id
  const token = isAuth().token

  const getToken = useCallback(
    async (userId, token) => {
      if (cart.basket.length === 0) return
      try {
        const pt = await getPaymentClientToken(userId, token)
        if (!pt) {
          setCart((prev) => ({ ...prev, error: 'Authentication error' }))
        } else {
          setCart((prev) => ({
            ...prev,
            payment: { token: pt, instance: {} },
            total: totalCart(cart.basket),
          }))
        }
      } catch (err) {
        setCart((prev) => ({ ...prev, error: err.message }))
      }
    },
    [cart.basket, setCart]
  )

  useEffect(() => {
    getToken(userId, token)
  }, [token, userId, getToken])

  useEffect(() => {
    if (cart.basket.length > 0) {
      setCart((prev) => ({
        ...prev,
        total: totalCart(cart.basket),
      }))
    }
  }, [setCart, cart.basket])

  return (
    cart.basket.length > 0 && (
      <>
        <AddressForm />
        <Link to='/buy' className='btn btn-card btn_width'>
          Checkout
        </Link>
      </>
    )
  )
}

export default Checkout
