import React, { useState, useEffect } from 'react'
import { FaCartPlus } from 'react-icons/fa'
import Navbar from 'react-bootstrap/NavBar'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'

import { Link, useNavigate, useLocation } from 'react-router-dom'
import { isAuth, logoutUser } from '../../features/services/authRequests'
import { firstUpperCase } from '../../features/utils/firstUpperCase'
import { UseCartContext } from '../../Context'
export const NavBar = () => {
  const [cart, setCart] = UseCartContext()
  let count = 0
  if (cart.basket.length) {
    count = Object.values(cart.basket).reduce((acc, cur) => acc + cur.count, 0)
  }
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

  useEffect(() => {
    setCart((prev) => ({
      ...prev,
      user: { ...auth.user },
      basket: [...prev.basket],
    }))
  }, [auth, setCart])

  return (
    <Navbar collapseOnSelect expand='md' className='sticky-top'>
      <Container>
        <Link to='/' className='navbar-brand'>
          <Image src='http://localhost:3000/images/literature.png' /> Bookstore
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
                {' '}
                <Link
                  className={`nav-item nav-link ${
                    location.pathname === '/shop' ? 'active' : ''
                  }`}
                  to='/cart'
                >
                  <FaCartPlus style={{ fontSize: '1.3rem' }} />
                  <sup>
                    {cart.basket.length > 0 && (
                      <Badge bg='danger' text='light'>
                        {count}
                      </Badge>
                    )}
                  </sup>
                </Link>
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
                <Link
                  className={`nav-item nav-link ${
                    location.pathname === '/profile' ? 'active' : ''
                  }`}
                  to={`/profile/${auth.user._id}`}
                >
                  {auth.user.name && firstUpperCase(auth.user.name)}
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
