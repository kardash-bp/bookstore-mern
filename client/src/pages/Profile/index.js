import React from 'react'
import AppLayout from '../../layout/appLayout/AppLayout'
import RegisterForm from '../../features/UI/RegisterForm'

const Profile = () => {
  return (
    <AppLayout title='Edit Profile'>
      <RegisterForm flag='update' />
    </AppLayout>
  )
}

export default Profile
