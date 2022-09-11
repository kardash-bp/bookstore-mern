const { Router } = require('express')
const { authenticateJWT, isAdmin } = require('../../middlewareFn/authJWT')
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
catRouter.get('/:categoryId', category)
catRouter.get('/', authenticateJWT, isAdmin, allCategories)
catRouter.post('/create', authenticateJWT, isAdmin, addCategory)
catRouter.put('/update/:categoryId', authenticateJWT, isAdmin, updateCategory)
catRouter.delete(
  '/delete/:categoryId',
  authenticateJWT,
  isAdmin,
  deleteCategory
)

module.exports = catRouter
