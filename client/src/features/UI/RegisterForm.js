import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertMessage from './AlertMessage'
import { isAuth, registerUser } from '../services/authRequests'
import { getUserProfile, updateUserProfile } from '../services/userProfile'
import { UseCartContext } from '../../Context'
const RegisterForm = ({ flag = 'register' }) => {
  const { userId } = useParams()
  const { user, token } = isAuth()
  const [cart, setCart] = UseCartContext()
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
      if (flag === 'register') {
        await registerUser({ name, email, password }, values, setValues)
      } else {
        const data = await updateUserProfile(userId, token, {
          name,
          email,
          password,
        })
        console.log(data)
        if (localStorage.getItem('jwt')) {
          const { token } = JSON.parse(localStorage.getItem('jwt'))
          localStorage.setItem(
            'jwt',
            JSON.stringify({ token, user: { ...data } })
          )
        }
        setValues((prev) => ({ ...prev, ...data, success: true }))
        setCart((prev) => ({ ...prev, user: { ...data }, userId: data._id }))
      }
    } catch (err) {
      setValues({
        ...values,

        error: err.message,
        success: false,
      })
    }
  }
  const loadProfile = useCallback(async (id) => {
    try {
      const data = await getUserProfile(id, token)
      if (!data) {
        setValues((prev) => ({
          ...prev,
          error: `Can't find profile with your id`,
          success: false,
        }))
      }
      setValues((prev) => ({ ...prev, ...data, error: false }))
    } catch (err) {
      setValues((prev) => ({
        ...prev,
        error: err.message,
        success: false,
      }))
    }
  }, [])
  useEffect(() => {
    if (flag === 'update') {
      loadProfile(userId)
    }
  }, [flag])

  if (success && flag === 'register') {
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
  } else if (success && flag === 'update') {
    return (
      <div className='d-grid gap-2'>
        <AlertMessage variant='success' msg={`Update success.`} />

        <Link to='/dashboard' className='my-2 btn btn-card'>
          Go to Dashboard
        </Link>
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
          <button className='btn-card' size='lg' type='submit'>
            {flag === 'register' ? 'Register' : 'Update Profile'}
          </button>
        </div>
      </Form>
    )
  }
}

export default RegisterForm
