const { Router } = require('express')
const { authenticateJWT, isAdmin } = require('../../middlewareFn/authJWT')
const { userById } = require('./user.controller')
const userRouter = Router()

userRouter.param('userId', userById)

userRouter.get('/protected/:userId', authenticateJWT, isAdmin, (req, res) => {
  res.json({ user: req.profile })
})

module.exports = userRouter
