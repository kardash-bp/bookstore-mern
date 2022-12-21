import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { isAdmin, isAuth } from './features/services/authRequests'
import CheckoutPurchasing from './features/components/CheckoutPurchasing'
import Orders from './features/components/Orders'
import ProtectedRoute from './features/utils/ProtectedRoute'
import ScrollToTop from './features/utils/ScrollToTop/ScrollToTop'
import AddCategory from './pages/AddCategory'

import BookSingle from './pages/BookSingle'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Spinner from 'react-bootstrap/Spinner'
const Profile = lazy(() => import('./pages/Profile'))
const Home = lazy(() => import('./pages/Home'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Register = lazy(() => import('./pages/Register'))
const Products = lazy(() => import('./pages/Products'))
const AddEditProduct = lazy(() => import('./pages/AddEditProduct'))

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Suspense fallback={<Spinner animation='grow' variant='danger' />}>
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
            path='/profile/:userId'
            element={
              <ProtectedRoute isAuthenticated={isAuth}>
                <Profile />
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
            path='/products'
            element={
              <ProtectedRoute isAuthenticated={isAdmin}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path='/create/product'
            element={
              <ProtectedRoute isAuthenticated={isAdmin}>
                <AddEditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path='/orders'
            element={
              <ProtectedRoute isAuthenticated={isAdmin}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path='/' element={<Home />} />
          <Route path='/product/:bookId' element={<BookSingle />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/buy' element={<CheckoutPurchasing />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
export default App
