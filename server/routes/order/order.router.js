const { Router } = require('express')
const { authenticateJWT, isAdmin } = require('../../middlewareFn/authJWT')
const { userById } = require('../user/user.controller')
const {
  addOrder,
  getAllOrders,
  getStatus,
  updateStatus,
} = require('./order.controller')
const orderRouter = Router()

orderRouter.param('userId', userById)

orderRouter.post('/new/:userId', authenticateJWT, addOrder)
orderRouter.get('/all/:userId', authenticateJWT, isAdmin, getAllOrders)
orderRouter.get('/status/:userId', authenticateJWT, isAdmin, getStatus)
orderRouter.put(
  '/update-status/:orderId/:userId',
  authenticateJWT,
  isAdmin,
  updateStatus
)

module.exports = orderRouter
