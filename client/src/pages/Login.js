import React from 'react'
import AppLayout from '../layout/appLayout/AppLayout'
import LoginForm from '../features/components/LoginForm'

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
