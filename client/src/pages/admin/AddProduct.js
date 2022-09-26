import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../layout/appLayout/AppLayout'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { isAuth } from '../../features/services/authRequests'
import { createProduct, getCategories } from '../../features/services/adminApi'
import AlertMessage from '../../features/UI/AlertMessage'
import { firstUpperCase } from '../../features/utils/firstUpperCase'
import Spinner from 'react-bootstrap/Spinner'
const AddProduct = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: false,
    quantity: '',
    photo: '',
    loading: '',
    error: false,
    success: false,
  })
  const { token, user } = isAuth()
  const {
    photo,
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    success,
  } = state

  useEffect(() => {
    let isSubscribed = true
    const allCategories = async () => {
      const catArr = await getCategories(token)
      if (isSubscribed) {
        setState({ ...state, categories: catArr })
      }
    }
    allCategories()
    return () => (isSubscribed = false)
  }, [])

  const handleChange = (fieldName) => (e) => {
    let value = fieldName === 'photo' ? e.target.files[0] : e.target.value
    if (fieldName === 'shipping') {
      setState({ ...state, [fieldName]: !shipping })
    } else {
      setState({ ...state, [fieldName]: value })
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({ ...state, error: false, loading: true })
    try {
      const data = await createProduct(token, {
        name,
        description,
        photo,
        price,
        quantity,
        shipping,
        category,
      })
      if (data.error) {
        setState({ ...state, error: true, success: false, loading: false })
      } else {
        setState({ ...state, error: false, success: true, loading: false })
      }
    } catch (err) {
      console.log('error: ' + err.message)
      setState({ name: '', error: true, success: false, loading: false })
    }
  }
  return (
    <AppLayout
      title='Add a new product'
      description={`Admin: ${firstUpperCase(user.name)} `}
    >
      {loading && (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
      <Form
        onSubmit={handleSubmit}
        className='col-md-10 offset-md-1'
        encType='multipart/form-data'
      >
        {success && (
          <AlertMessage variant='success' msg={`${name} is created`} />
        )}
        {error && (
          <AlertMessage variant='danger' msg={`Product is not added.`} />
        )}
        <FloatingLabel
          controlId='floatingName'
          label='Product Name'
          className='mb-3'
        >
          <Form.Control
            type='text'
            value={name}
            placeholder='Product Name'
            onChange={handleChange('name')}
            autoFocus
          />
        </FloatingLabel>
        <FloatingLabel
          controlId='floatingDescription'
          label='Product Description'
          className='mb-3'
        >
          <Form.Control
            as='textarea'
            value={description}
            placeholder='Product Description'
            onChange={handleChange('description')}
            style={{ height: '100px' }}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId='floatingPrice'
          label='Product Price'
          className='mb-3'
        >
          <Form.Control
            type='number'
            value={price}
            placeholder='Product Price'
            onChange={handleChange('price')}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId='floatingCat'
          label='Product Category'
          className='mb-3'
        >
          <Form.Select
            type='text'
            value={category}
            aria-label='Floating label select'
            onChange={handleChange('category')}
          >
            <option>Select Category</option>
            {categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          controlId='floatingQty'
          label='Quantity'
          className='mb-3'
        >
          <Form.Control
            type='number'
            value={quantity}
            placeholder='Quantity'
            onChange={handleChange('quantity')}
          />
        </FloatingLabel>
        <Form.Group className='p-2 bg-secondary text-white mb-3'>
          <Form.Check
            type='switch'
            id='switch'
            label='Select Shipping'
            checked={shipping}
            onChange={handleChange('shipping')}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Product Photo</Form.Label>
          <Form.Control
            type='file'
            name='photo'
            accept='image/*'
            placeholder='Product Photo'
            onChange={handleChange('photo')}
          />
        </Form.Group>

        <hr className='my-4'></hr>
        <Button type='submit' variant='outline-primary'>
          Add Product
        </Button>

        <Button
          type='link'
          variant='outline-info'
          onClick={() => navigate(-1)}
          className='ms-3'
        >
          Back to Dashboard
        </Button>
      </Form>
    </AppLayout>
  )
}

export default AddProduct
