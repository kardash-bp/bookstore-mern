import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertMessage from './AlertMessage'
import { registerUser } from '../services/authRequests'
const RegisterForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  })

  const { name, email, password, error, success } = values

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      registerUser({ name, email, password }, values, setValues)
    } catch (err) {
      setValues({
        ...values,

        error: err.message,
        success: false,
      })
    }
  }
  if (success) {
    return (
      <div className='d-grid gap-2'>
        <AlertMessage
          variant='success'
          msg={`New account is created. Please login.`}
        />
        <Button variant='warning' size='lg'>
          <Link to='/login'>login</Link>
        </Button>
      </div>
    )
  } else {
    return (
      <Form onSubmit={handleSubmit}>
        {error && <AlertMessage variant='danger' msg={error} />}
        <FloatingLabel controlId='floatingInput' label='Name' className='mb-3'>
          <Form.Control
            onChange={handleChange('name')}
            type='text'
            placeholder='Enter a name'
            value={name}
          />
        </FloatingLabel>
        <FloatingLabel controlId='floatingEmail' label='Email' className='mb-3'>
          <Form.Control
            onChange={handleChange('email')}
            type='email'
            placeholder='Email'
            value={email}
          />
        </FloatingLabel>
        <FloatingLabel controlId='floatingPassword' label='Password'>
          <Form.Control
            onChange={handleChange('password')}
            type='password'
            placeholder='Password'
            className='mb-3'
            value={password}
          />
        </FloatingLabel>
        <div className='d-grid'>
          <Button variant='primary' size='lg' type='submit'>
            Submit
          </Button>
        </div>
      </Form>
    )
  }
}

export default RegisterForm
