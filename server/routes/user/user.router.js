const { Router } = require('express')
const { authenticateJWT, isAdmin } = require('../../middlewareFn/authJWT')
const { userById, getProfile, updateProfile } = require('./user.controller')
const userRouter = Router()

userRouter.param('userId', userById)

userRouter.get('/:userId', authenticateJWT, isAdmin, getProfile)
userRouter.put('/:userId', authenticateJWT, isAdmin, updateProfile)

module.exports = userRouter
