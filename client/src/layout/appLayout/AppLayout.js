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
      <div className='px-5 pt-5 mb-5 jumbotron'>
        <h2 className='display-3'>{title}</h2>
        <p className='lead'>{description}</p>
        <hr className='my-4'></hr>
      </div>
      <Container>
        <div className={className}>{children}</div>
      </Container>
    </>
  )
}

export default AppLayout
