import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertMessage from './AlertMessage'
import { loginUser } from '../services/authRequests'
const LoginForm = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
  })

  const { email, password, error, loading } = values
  useEffect(() => {
    loading && navigate('/')
  }, [loading])

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      loginUser({ email, password }, values, setValues)
    } catch (err) {
      setValues({
        ...values,

        error: err.message,
        loading: false,
      })
    }
  }
  if (loading) {
    return (
      <div className='d-grid'>
        <AlertMessage variant='success' msg={`Loading...`} />
      </div>
    )
  } else {
    return (
      <Form onSubmit={handleSubmit}>
        {error && <AlertMessage variant='danger' msg={error} />}

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
          <button size='lg' type='submit' className='btn-card'>
            Login
          </button>
        </div>
      </Form>
    )
  }
}

export default LoginForm
