import React, { useState, createContext, useEffect, useContext } from 'react'

export const Context = createContext(undefined)

export const UseCartContext = () => useContext(Context)

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('cart')) {
      setCart([...JSON.parse(localStorage.getItem('cart'))])
    }
  }, [])

  useEffect(() => {
    if (typeof window !== undefined && cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  return <Context.Provider value={[cart, setCart]}>{children}</Context.Provider>
}
