import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { isAdmin, isAuth } from './features/services/authRequests'
import ProtectedRoute from './features/utils/ProtectedRoute'
import AddCategory from './pages/admin/AddCategory'
import AddProduct from './pages/admin/AddProduct'
import BookSingle from './pages/BookSingle.js'
import Dashboard from './pages/dashboard/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ShopPage from './pages/ShopPage/'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute isAuthenticated={isAuth}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/create/category'
          element={
            <ProtectedRoute isAuthenticated={isAdmin}>
              <AddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path='/create/product'
          element={
            <ProtectedRoute isAuthenticated={isAdmin}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<Home />} />
        <Route path='/product/:bookId' element={<BookSingle />} />
        <Route path='/shop' element={<ShopPage />} />
      </Routes>
    </Router>
  )
}
export default App
