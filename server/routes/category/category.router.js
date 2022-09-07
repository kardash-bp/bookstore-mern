const { Router } = require('express')
const { authenticateJWT, isAdmin } = require('../../middlewareFn/authJWT')
const { addCategory } = require('./category.controller')
const catRouter = Router()

catRouter.post('/create', authenticateJWT, isAdmin, addCategory)

module.exports = catRouter
