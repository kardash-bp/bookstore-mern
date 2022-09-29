export const addToCart = (item, basket, setBasket) => {
  const index = basket.findIndex((c) => c._id === item._id)
  if (index === -1) {
    item.count = 1
    setBasket((prev) => [...prev, { ...item }])
  } else {
    basket[index].count++
    setBasket([...basket])
  }
}

//todo hide add to cart if out of stock
