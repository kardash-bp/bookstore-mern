import React from 'react'
import AppLayout from '../../layout/appLayout/AppLayout'
import { isAuth } from '../../features/services/authRequests'
import UserInformationDash from './UserInformationDash'
import PurchaseHistoryDash from './PurchaseHistoryDash'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserLinksDash from './UserLinksDash'
import AdminLinksDash from './AdminLinksDash'
const Dashboard = () => {
  const { user } = isAuth()
  return (
    <AppLayout
      title='Dashboard'
      description={`${user.name} Dashboard`}
      className='container'
    >
      <Row>
        <Col md={3}>
          {user.role === 1 ? <AdminLinksDash /> : <UserLinksDash />}
        </Col>
        <Col md={9}>
          <UserInformationDash user={user} />
          <PurchaseHistoryDash user={user} />
        </Col>
      </Row>
    </AppLayout>
  )
}

export default Dashboard
