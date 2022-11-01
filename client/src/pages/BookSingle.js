import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBook, relatedBooks } from '../features/services/productApi'
import ProductCard from '../features/UI/ProductCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AppLayout from '../layout/appLayout/AppLayout'
const BookSingle = () => {
  const { bookId } = useParams()
  const [book, setBook] = useState({})
  const [related, setRelated] = useState([])
  const fetchBook = useCallback(async (bookId) => {
    try {
      const b = await getBook(bookId)
      setBook(b)
      const r = await relatedBooks(bookId)
      setRelated(r)
    } catch (err) {
      console.log(err.message)
    }
  }, [])
  useEffect(() => {
    fetchBook(bookId).catch(console.error)
  }, [fetchBook, bookId])
  console.log(book)
  return (
    <AppLayout title={book && book.name}>
      <Row>
        <Col md={8}>
          {' '}
          {book && book.name && (
            <ProductCard product={book} showButton={false} flag='big' />
          )}
        </Col>
        <Col md={4}>
          <h4>Recommendations </h4>
          {related.map((r, i) => (
            <ProductCard product={r} key={i} />
          ))}
        </Col>
      </Row>
    </AppLayout>
  )
}

export default BookSingle
