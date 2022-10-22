const { Router } = require('express')
const { authenticateJWT, isAdmin } = require('../../middlewareFn/authJWT')
const { userById } = require('../user/user.controller')
const { getPaymentToken, purchase } = require('./payments.controller')
const paymentRouter = Router()

paymentRouter.param('userId', userById)

paymentRouter.get('/token/:userId', authenticateJWT, getPaymentToken)
paymentRouter.post('/purchase/:userId', authenticateJWT, purchase)

module.exports = paymentRouter
