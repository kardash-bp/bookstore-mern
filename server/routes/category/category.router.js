const { Router } = require('express')
const { authenticateJWT, isAdmin } = require('../../middlewareFn/authJWT')
const { userById } = require('../user/user.controller')
const {
  category,
  addCategory,
  getCategoryById,
  allCategories,
  updateCategory,
  deleteCategory,
} = require('./category.controller')
const catRouter = Router()
catRouter.param('categoryId', getCategoryById)
catRouter.param('userId', userById)
catRouter.get('/:categoryId', category)
catRouter.get('/', allCategories)
catRouter.post('/create/:userId', authenticateJWT, isAdmin, addCategory)
catRouter.put('/update/:categoryId', authenticateJWT, isAdmin, updateCategory)
catRouter.delete(
  '/delete/:categoryId',
  authenticateJWT,
  isAdmin,
  deleteCategory
)

module.exports = catRouter
