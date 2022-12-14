import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import useCategories from '../../hooks/useCategories'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { getProductsSearch } from '../services/productApi'
import ProductCard from './ProductCard'
const Search = () => {
  const [categories, err] = useCategories()
  const [category, setCategory] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [flag, setFlag] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!searchTerm) return
    const data = await getProductsSearch(searchTerm, category)
    setResults(data)
    setFlag(true)
    setSearchTerm('')
    setCategory('all')
  }
  console.log(categories)
  return (
    <>
      <div className='w-50 my-3 md-my-0'>
        <Form onSubmit={submitHandler}>
          <InputGroup>
            <DropdownButton
              variant='outline-secondary'
              title={categoryName ? categoryName : 'All Categories'}
              id='input-group-dropdown-1'
              onSelect={(eventKey) => {
                setFlag(false)

                setCategory(eventKey)
                setCategoryName(
                  categories.find((el) => el._id === eventKey).name
                )
              }}
            >
              {!err &&
                categories.map((c, i) => (
                  <Dropdown.Item key={i} eventKey={c._id}>
                    {c.name}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
            <Form.Control
              type='search'
              placeholder='Search by title'
              aria-label='Search field with dropdown and button'
              value={searchTerm}
              onChange={(e) => {
                setFlag(false)
                setSearchTerm(e.target.value)
              }}
            />

            <Button type='submit' variant='outline-secondary'>
              <BsSearch />
            </Button>
          </InputGroup>
        </Form>
      </div>

      {flag && results.length === 0 && (
        <Container fluid='lg p-4'>
          <h2>No search results</h2>
        </Container>
      )}
      {results.length > 0 && (
        <Container fluid='lg p-4'>
          <Row className='mt-4 mb-4'>
            <h2>
              Found{' '}
              {results.length === 1
                ? 'one result'
                : `${results.length} results`}
            </h2>
            {results.map((p, i) => (
              <Col md={4}>
                {' '}
                <ProductCard key={i} product={p} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  )
}

export default React.memo(Search)
