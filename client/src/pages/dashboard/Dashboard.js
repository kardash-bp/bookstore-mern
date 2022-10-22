import React from 'react'
import { isAuth } from '../../features/services/authRequests'
import UserInformationDash from './UserInformationDash'
import PurchaseHistoryDash from './PurchaseHistoryDash'
import AppLayout from '../../layout/appLayout/AppLayout'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserLinksDash from './UserLinksDash'
import AdminLinksDash from './AdminLinksDash'
import { firstUpperCase } from '../../features/utils/firstUpperCase'
const Dashboard = () => {
  const { user } = isAuth()
  return (
    <AppLayout
      title='Dashboard'
      description={`${firstUpperCase(user.name)} / ${
        user.role === 1 ? 'adimn' : 'user'
      } `}
      className='container'
    >
      <Row>
        <Col md={4}>
          {user.role === 1 ? (
            <AdminLinksDash userId={user._id} />
          ) : (
            <UserLinksDash userId={user._id} />
          )}
        </Col>
        <Col md={8}>
          <UserInformationDash user={user} />
        </Col>
      </Row>
      <Row>
        <PurchaseHistoryDash history={user.history} />
      </Row>
    </AppLayout>
  )
}

export default Dashboard
