import React from 'react'
import AppLayout from '../layout/appLayout/AppLayout'
import RegisterForm from '../features/UI/RegisterForm'
const Register = () => {
  return (
    <AppLayout
      title='Register'
      description='Register & Access the most comprehensive bookshop'
      className='container col-md-8 offset-md-2'
    >
      <RegisterForm />
    </AppLayout>
  )
}

export default Register
