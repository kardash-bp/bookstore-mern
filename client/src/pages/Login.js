import React from 'react'
import { API } from '../config'
import AppLayout from '../layout/appLayout/AppLayout'

const Login = () => {
  return (
    <AppLayout
      title='Login'
      description='Login & Access the most comprehensive bookshop '
    >
      ...API: {API}
    </AppLayout>
  )
}

export default Login
