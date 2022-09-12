import React from 'react'
import Navbar from 'react-bootstrap/NavBar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useLocation } from 'react-router-dom'
export const NavBar = () => {
  const location = useLocation()
  console.log(location.pathname)
  return (
    <Navbar expand='md' bg='primary' variant='dark' className='mb-3'>
      <Container>
        <Navbar.Brand href='/'>Bookstore</Navbar.Brand>
        <Navbar.Toggle area-aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav
            activeKey={location.pathname}
            className='justify-content-end flex-grow-1 pe-3'
          >
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/login' eventKey='/login'>
              Login
            </Nav.Link>
            <Nav.Link href='/register' eventKey='/register'>
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
