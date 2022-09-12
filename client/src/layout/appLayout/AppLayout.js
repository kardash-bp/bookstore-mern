import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import { NavBar } from '../navbar/NavBar'

const AppLayout = ({
  title = 'Bookstore',
  description = 'The most comprehensive eBook library in IT, Programming and Computer Science',
  className,
  children,
}) => {
  return (
    <>
      <NavBar />
      <Container>
        <div className='jumbotron'>
          <h2>{title}</h2>
          <p className='lead'>{description}</p>
        </div>
        <div className={className}>{children}</div>
      </Container>
    </>
  )
}

export default AppLayout
