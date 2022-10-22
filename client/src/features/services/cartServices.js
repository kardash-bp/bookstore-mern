import { isAuth } from './authRequests'

export const addToCart = (item, cart, setCart) => {
  if (!cart.user) return
  const index = cart.basket.findIndex((c) => c._id === item._id)
  if (index === -1) {
    item.count = 1
    const newBasket = [...cart.basket, item]
    setCart((prev) => ({ ...prev, basket: newBasket }))
  } else {
    cart.basket[index].count++
    setCart({ ...cart })
  }
}
export const removeFromCart = (item, cart, setCart) => {
  const index = cart.basket.findIndex((c) => c._id === item._id)
  if (cart.basket[index].count === 1) {
    setCart((prev) => ({
      ...prev,
      basket: [...prev.basket.filter((p) => p._id !== item._id)],
    }))
  } else {
    cart.basket[index].count--
    setCart({ ...cart })
  }
}
export const removeAllFromCart = (setBasket, orderId = '', flag = 'remove') => {
  if (flag === 'remove') {
    setBasket((prev) => ({
      ...prev,
      basket: [],
      total: 0,
      payment: { token: '', instance: {} },
      error: false,
    }))
  }
  if (flag === 'success') {
    setBasket((prev) => {
      const { token } = isAuth()
      localStorage.setItem(
        'jwt',
        JSON.stringify({
          token,
          user: { ...prev.user, history: [...prev.user.history, orderId] },
        })
      )
      return {
        ...prev,
        user: { ...prev.user, history: [...prev.user.history, orderId] },
        basket: [],
        total: 0,
        payment: { token: '', instance: {} },
        error: false,
      }
    })
  }
}

export const totalCart = (cart) => {
  return cart
    .map((c) => c.price * c.count)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2)
}
export const totalBook = (price, count) => {
  return (price * count).toFixed(2)
}
export const removeBookFromCart = (item, cart, setCart) => {
  const index = cart.basket.findIndex((c) => c._id === item._id)
  if (index !== -1) {
    setCart((prev) => ({
      ...prev,
      basket: [...prev.basket.filter((p) => p._id !== item._id)],
    }))
  }
}
//todo hide add to cart if out of stock
