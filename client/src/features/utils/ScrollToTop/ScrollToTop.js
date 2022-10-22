import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaAngleUp } from 'react-icons/fa'
import './scrollToTop.css'
const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false)
  const { pathname } = useLocation()
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowTopBtn(true)
    } else {
      setShowTopBtn(false)
    }
  }
  useEffect(() => {
    if (pathname != '/contact') {
      goToTop()
    }
  }, [pathname])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className='top-to-btm' onClick={goToTop}>
      {showTopBtn && <FaAngleUp className='icon-position icon-style' />}
    </div>
  )
}

export default ScrollToTop
