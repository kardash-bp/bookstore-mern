const { Router } = require('express')
const { authenticateJWT, isAdmin } = require('../../middlewareFn/authJWT')
const {
  addProduct,
  productById,
  getProduct,
  deleteProduct,
  updateProduct,
  productsList,
  productsRelated,
  categoriesByProduct,
  productsSearch,
  productPhoto,
} = require('./product.controller')
const { userById } = require('../user/user.controller')
const productRouter = Router()

productRouter.param('id', productById)
productRouter.post('/search', authenticateJWT, productsSearch)
productRouter.get('/all', authenticateJWT, productsList)
productRouter.get('/all/categories', authenticateJWT, categoriesByProduct)
productRouter.get('/all/related/:id', authenticateJWT, productsRelated)
productRouter.get('/:id', authenticateJWT, getProduct)
productRouter.get('/photo/:id', authenticateJWT, productPhoto)
productRouter.post('/create', authenticateJWT, isAdmin, addProduct)
productRouter.post('/update/:id', authenticateJWT, isAdmin, updateProduct)
productRouter.delete('/:id', authenticateJWT, isAdmin, deleteProduct)

module.exports = productRouter
