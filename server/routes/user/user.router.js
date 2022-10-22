const { Router } = require('express')
const { authenticateJWT, isAdmin } = require('../../middlewareFn/authJWT')
const {
  userById,
  getProfile,
  updateProfile,
  userOrdersHistory,
} = require('./user.controller')
const userRouter = Router()

userRouter.param('userId', userById)

userRouter.get('/order/:id', authenticateJWT, userOrdersHistory)
userRouter.get('/:userId', authenticateJWT, getProfile)
userRouter.put('/:userId', authenticateJWT, updateProfile)

module.exports = userRouter
