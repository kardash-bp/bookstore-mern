const { errorHandler } = require('../../utils/dbErrorHandler')
const Category = require('../../models/category.model')
async function addCategory(req, res) {
  try {
    const category = await Category.create(req.body.category)
    if (!category) {
      throw new Error("Category isn't created")
    }

    res.status(200).json({ category })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
async function getCategoryById(req, res, next, categoryId) {
  try {
    const cat = await Category.findById(categoryId).select({
      name: 1,
      _id: 0,
    })
    req.category = cat
    next()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
async function updateCategory(req, res) {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.categoryId, {
      name: req.body.name,
    })

    res.status(200).json(cat)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
async function deleteCategory(req, res) {
  try {
    await Category.findByIdAndDelete(req.params.categoryId)
    res.status(204).send('Category deleted successfully')
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
async function allCategories(req, res) {
  try {
    const cat = await Category.find({}, '_id, name')
    req.categories = cat
    res.json({ categories: req.categories })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
async function category(req, res) {
  if (!req.category) {
    return res.status(404).json({ error: 'Category not found.' })
  }

  res.json(req.category)
}
module.exports = {
  category,
  addCategory,
  getCategoryById,
  allCategories,
  deleteCategory,
  updateCategory,
}
