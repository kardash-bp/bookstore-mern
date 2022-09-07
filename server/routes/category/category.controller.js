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

module.exports = { addCategory }
