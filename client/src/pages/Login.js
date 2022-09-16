import React from 'react'
import LoginForm from '../features/UI/LoginForm'
import AppLayout from '../layout/appLayout/AppLayout'

const Login = () => {
  return (
    <AppLayout
      title='Login'
      description='Login & Access the most comprehensive bookshop '
      className='container col-md-8 offset-md-2'
    >
      <LoginForm />
    </AppLayout>
  )
}

export default Login
