import React, { useState } from 'react'
import Navbar from 'react-bootstrap/NavBar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { isAuth, logoutUser } from '../../features/services/authRequests'
import { firstUpperCase } from '../../features/utils/firstUpperCase'
export const NavBar = () => {
  const [auth, setAuth] = useState(isAuth())
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = () => {
    logoutUser(() => {
      if (!auth) {
        navigate('/login')
      } else {
        navigate('/')
      }
      setAuth(false)
    })
  }

  return (
    <Navbar collapseOnSelect expand='md'>
      <Container>
        <Link to='/' className='navbar-brand'>
          Bookstore
        </Link>
        <Navbar.Toggle area-aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='justify-content-end flex-grow-1 pe-3'>
            <Link
              className={`nav-item nav-link ${
                location.pathname === '/' ? 'active' : ''
              }`}
              to='/'
            >
              Home
            </Link>
            <Link
              className={`nav-item nav-link ${
                location.pathname === '/shop' ? 'active' : ''
              }`}
              to='/shop'
            >
              Shop
            </Link>
            {!auth && (
              <>
                <Link
                  className={`nav-item nav-link ${
                    location.pathname === '/login' ? 'active' : ''
                  }`}
                  to='/login'
                >
                  Login
                </Link>
                <Link
                  className={`nav-item nav-link ${
                    location.pathname === '/register' ? 'active' : ''
                  }`}
                  to='/register'
                >
                  Register
                </Link>
              </>
            )}
            {auth && (
              <>
                <Link
                  className={`nav-item nav-link ${
                    location.pathname === '/dashboard' ? 'active' : ''
                  }`}
                  to='/dashboard'
                >
                  Dashboard
                </Link>
                <Navbar.Text
                  className='nav-item nav-link'
                  style={{ cursor: 'pointer' }}
                  onClick={handleClick}
                >
                  Logout
                </Navbar.Text>
                <Navbar.Text
                  className='nav-item nav-link active'
                  style={{ cursor: 'pointer' }}
                >
                  {auth.user.name && firstUpperCase(auth.user.name)}
                </Navbar.Text>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
