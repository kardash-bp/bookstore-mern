import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../layout/appLayout/AppLayout'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { isAuth } from '../features/services/authRequests'
import { createCategory } from '../features/services/adminApi'
import AlertMessage from '../features/components/AlertMessage'

const AddCategory = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    name: '',
    error: false,
    success: false,
  })
  const { token, user } = isAuth()
  const handleChange = (e) => {
    setState({ ...state, name: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await createCategory(user._id, token, {
        name: state.name,
      })
      if (data.error) {
        setState({ ...state, error: true, success: false })
      } else {
        setState({ ...state, error: false, success: true })
      }
    } catch (err) {
      console.log('error: ' + err.message)
      setState({ name: '', error: true, success: false })
    }
  }
  return (
    <AppLayout title='Add Category' description='Add new category'>
      <Form onSubmit={handleSubmit} className='col-md-8'>
        {state.success && (
          <AlertMessage variant='success' msg={`${state.name} is created`} />
        )}
        {state.error && (
          <AlertMessage variant='danger' msg={`Category must be unique.`} />
        )}
        <FloatingLabel
          controlId='floatingCategory'
          label='New Category'
          className='mb-3'
        >
          <Form.Control
            type='text'
            value={state.name}
            placeholder='Category'
            onChange={handleChange}
            autoFocus
          />
        </FloatingLabel>
        <Button type='submit' variant='outline-primary'>
          Add Category
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

export default AddCategory
