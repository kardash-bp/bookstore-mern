import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { isAuth } from './features/services/authRequests'
import ProtectedRoute from './features/services/ProtectedRoute'
import Dashboard from './pages/dashboard/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
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
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}
export default App
