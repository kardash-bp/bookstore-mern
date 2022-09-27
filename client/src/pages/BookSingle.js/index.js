import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBook } from '../../features/services/productApi'
import ProductCard from '../../features/UI/ProductCard'
import { useEffectAsync } from '../../hooks/useEffectAsync'
import AppLayout from '../../layout/appLayout/AppLayout'
const BookSingle = () => {
  const { bookId } = useParams()
  const [book, setBook] = useState({})

  const fetchBook = useCallback(async () => {
    const b = await getBook(bookId)
    setBook(b)
  }, [])
  useEffect(() => {
    fetchBook().catch(console.error)
  }, [fetchBook])

  console.log(book)

  return (
    <AppLayout title={book && book.name}>
      {book && book.name && <ProductCard product={book} showButton={false} />}
    </AppLayout>
  )
}

export default BookSingle
