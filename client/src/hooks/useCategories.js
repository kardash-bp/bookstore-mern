import { useEffect, useState, useCallback } from 'react'
import { getCategories } from '../features/services/adminApi'

export default function useCategories() {
  const [categories, setCategories] = useState([])
  const [err, setErr] = useState('')
  const init = useCallback(async () => {
    if (
      localStorage['categories'] &&
      JSON.parse(localStorage['categories']).length > 0
    ) {
      setCategories(JSON.parse(localStorage.getItem('categories')))
    } else {
      try {
        const data = await getCategories()

        if (!data) {
          setErr('Error occurred when fetching categories')
        } else {
          setCategories(data)
        }
      } catch (error) {
        console.log(error.message)
        setErr(error.message)
      }
    }
  }, [getCategories])
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    if (
      !localStorage['categories'] ||
      JSON.parse(localStorage['categories']).length < 1
    ) {
      localStorage.setItem('categories', JSON.stringify(categories))
    }
  }, [categories])

  return [categories, err]
}
