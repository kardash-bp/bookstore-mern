import React, { useState } from 'react'
import 'braintree-web'
import DropIn from 'braintree-web-drop-in-react'
import { UseCartContext } from '../../Context'
import AppLayout from '../../layout/appLayout/AppLayout'
import Alert from 'react-bootstrap/Alert'
import { processPurchase } from '../services/payment'
import { removeAllFromCart } from '../services/cartServices'
import { addOrder } from '../services/order'
import { Link } from 'react-router-dom'
const CheckoutPurchasing = () => {
  const [cart, setCart] = UseCartContext()
  const [success, setSuccess] = useState(false)
  const [, setInst] = useState({})

  /**
   *  VISA 4111 1111 1111 1111
   * 12/22
   *
   *
   * */

  const buy = async () => {
    try {
      // const { nonce } = await inst.requestPaymentMethod()
      const response = await processPurchase(cart.user._id, cart.total)
      if (response.success) {
        const res = await addOrder(cart.user._id, {
          address: cart.address,
          items: cart.basket,
          amount: cart.total,
        })
        if (!res) return
        setSuccess(response.success)
        removeAllFromCart(setCart, res.data.order._id, 'success')

        localStorage.removeItem('cart')
      }
    } catch (err) {
      console.log(err.message)
      setCart((prev) => ({ ...prev, error: err.message }))
    }
  }
  const renderError = (err) => (
    <Alert key='danger' variant='danger' style={{ display: err ? '' : 'none' }}>
      {err}
    </Alert>
  )
  const renderSuccess = () => (
    <Link to='/shop' className='btn btn-card btn_width'>
      <Alert
        key='success'
        variant='success'
        style={{ display: success ? '' : 'none' }}
      >
        Purchase was successful. Back to shopping.
      </Alert>
    </Link>
  )
  if (!cart.user) {
    return <div>Loading...</div>
  } else {
    return (
      <AppLayout title='Purchasing' description='Chose the purchasing method.'>
        {!success ? (
          <div onBlur={() => setCart((prev) => ({ ...prev, error: '' }))}>
            {cart.error !== '' && renderError(cart.error)}
            <DropIn
              options={{
                authorization: cart.payment.token,
              }}
              onInstance={(instance) => setInst(instance)}
            />
            <button onClick={buy} className='btn-card btn_width'>
              PAY
            </button>
          </div>
        ) : (
          renderSuccess()
        )}
      </AppLayout>
    )
  }
}

export default CheckoutPurchasing
