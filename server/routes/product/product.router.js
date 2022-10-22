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
  productsFilterSearch,
  productPhoto,
} = require('./product.controller')
const { userById } = require('../user/user.controller')
const productRouter = Router()
productRouter.param('userId', userById)

productRouter.param('productId', productById)
productRouter.post('/search', productsFilterSearch)
productRouter.get('/search', productsSearch)
productRouter.get('/all', productsList)
productRouter.get('/all/categories', authenticateJWT, categoriesByProduct)
productRouter.get('/all/related/:productId', productsRelated)
productRouter.get('/:productId', getProduct)
productRouter.get('/photo/:productId', productPhoto)
productRouter.post('/create', authenticateJWT, isAdmin, addProduct)
productRouter.put(
  '/update/:userId/:productId',
  authenticateJWT,
  isAdmin,
  updateProduct
)
productRouter.delete('/:productId', authenticateJWT, isAdmin, deleteProduct)

module.exports = productRouter
