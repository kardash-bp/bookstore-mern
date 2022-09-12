import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export const useScrollToTop = () => {
  const location = useLocation()
  useEffect(() => {
    //scroll to top of the window when changing route
    window.scrollTo({ top: 0 })
  }, [location])
}
