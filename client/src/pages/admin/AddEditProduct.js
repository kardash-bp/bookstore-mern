import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AppLayout from '../../layout/appLayout/AppLayout'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { isAuth } from '../../features/services/authRequests'
import { createProduct, getCategories } from '../../features/services/adminApi'
import AlertMessage from '../../features/UI/AlertMessage'
import { firstUpperCase } from '../../features/utils/firstUpperCase'
import Spinner from 'react-bootstrap/Spinner'
import { UseCartContext } from '../../Context'
import { updateProduct } from '../../features/services/productApi'

const initialState = {
  name: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  shipping: false,
  quantity: '',
  photo: '',
  loading: false,
  error: false,
  success: false,
}

const AddEditProduct = () => {
  const [cart, setCart] = UseCartContext()
  const [searchParams] = useSearchParams()
  const flag = searchParams.get('flag') || ''
  const navigate = useNavigate()
  const [state, setState] = useState(initialState)
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
        if (flag === 'update') {
          setState({ ...cart.editBook, categories: catArr })
        } else {
          setState({ ...state, categories: catArr })
        }
      }
    }
    allCategories()
    return () => (isSubscribed = false)
  }, [flag])

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
      if (!name || !price || !quantity) return
      let data = false
      if (flag === 'add') {
        data = await createProduct(token, {
          name,
          description,
          photo,
          price,
          quantity,
          shipping,
          category,
        })
      } else {
        data = await updateProduct(user._id, token, {
          id: state._id,
          name,
          description,
          photo,
          price,
          quantity,
          shipping,
          category,
        })
      }
      console.log('data', data)
      if (data.error || !data) {
        console.log('No data response')
        setState({ ...state, error: true, success: false, loading: false })
      } else {
        setCart((prev) => ({ ...prev, editBook: {} }))
        if (flag === 'update') {
          navigate(-1)
        }
        setState({ ...initialState, success: true })
      }
    } catch (err) {
      console.log('error: ' + err.message)
      setState({ name: '', error: true, success: false, loading: false })
    }
  }
  //console.log('state:', state)
  return (
    <AppLayout
      title={flag === 'update' ? 'Edit Book Details  ' : 'Add a new product'}
      description={`Admin: ${firstUpperCase(user.name)} `}
    >
      {loading && error !== true && (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}
      <Form
        onSubmit={handleSubmit}
        className='col-md-10 offset-md-1'
        encType='multipart/form-data'
      >
        {success && flag === 'add' && (
          <div>
            <AlertMessage variant='success' msg={`Book is added. Another?`} />
            <Button
              type='link'
              variant='outline-secondary'
              onClick={() => navigate(-1)}
              className='ms-3 mb-4'
            >
              View all books list
            </Button>
          </div>
        )}
        {error && flag === 'add' && (
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
        <Button type='submit' variant='outline-danger'>
          {flag === 'add' ? 'Add Book' : 'Update Book'}
        </Button>

        <Button
          type='link'
          variant='outline-secondary'
          onClick={() => navigate(-1)}
          className='ms-3'
        >
          Go Back
        </Button>
      </Form>
    </AppLayout>
  )
}

export default AddEditProduct
