const formidable = require('formidable')
const fs = require('fs')
const checkKeyInObject = require('../../utils/checkKeyInObject')

const Category = require('../../models/category.model')

const Product = require('../../models/product.model')
const isFileValid = require('../../utils/isValidFile')
const updateObject = require('../../utils/updateObject')

function getProduct(req, res) {
  if (!req.product) {
    return res.status(404).json({ error: 'Product not found.' })
  } else {
    req.product.photo = undefined
  }

  res.json(req.product)
}

function addProduct(req, res) {
  console.log(req.body)
  let form = new formidable.IncomingForm()
  // Basic Configuration
  form.keepExtensions = true
  form.multiples = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err.message)
      return res.status(400).json({ error: 'Image could not be uploaded' })
    }
    let product = new Product(fields)
    console.log(product)
    if (
      !checkKeyInObject(product, [
        'name',
        'description',
        'price',
        'category',
        'quantity',
      ])
    ) {
      return res.status(400).json({ error: 'All fields are required.' })
    }

    if (files.photo && files.photo.size > 1 * 1024 * 1024) {
      return res.status(400).json({ error: 'Image should be less than 1mb' })
    }
    if (files.photo && isFileValid(files.photo)) {
      product.photo.data = fs.readFileSync(files.photo.filepath)
      product.photo.contentType = files.photo.mimetype
    }
    try {
      const savedProduct = await product.save()
      if (!savedProduct) {
        throw new Error("Product isn't stored.")
      }

      res.status(200).json({ product: savedProduct })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  })
}
// update product ======================================
function updateProduct(req, res) {
  let form = new formidable.IncomingForm()
  // Basic Configuration
  form.keepExtensions = true
  form.multiples = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' })
    }
    let product = req.product
    product = updateObject(product, fields)
    console.log(product)
    if (
      !checkKeyInObject(product, [
        'name',
        'description',
        'price',
        'category',
        'quantity',
      ])
    ) {
      return res.status(400).json({ error: 'All fields are required.' })
    }

    if (files.photo.size > 1 * 1024 * 1024) {
      return res.status(400).json({ error: 'Image should be less than 1mb' })
    }
    if (files.photo && isFileValid(files.photo)) {
      product.photo.data = fs.readFileSync(files.photo.filepath)
      product.photo.contentType = files.photo.mimetype
    }
    try {
      const savedProduct = await Product.findByIdAndUpdate(
        { _id: product._id },
        { ...product },
        { new: true }
      )
      if (!savedProduct) {
        throw new Error("Product isn't stored.")
      }

      res.status(200).json({ product: savedProduct })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  })
}
// get product ========================================
async function productById(req, res, next) {
  const id = req.params.id
  try {
    const product = await Product.findById(id).populate('category', '_id name')
    req.product = product

    next()
  } catch (error) {
    res.status(400).json({ error: `Product not found. ${error.message}` })
  }
}

async function deleteProduct(req, res) {
  const product = req.product
  try {
    await Product.findByIdAndDelete(product._id)
    res.status(204).json({ message: 'Product deleted successfully.' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
/**
 *  sell / arrival
 * by sell = /all?sortBy=sold&order=desc&limit=5
 * by arrival = /all?sortBy=createdAt&order=desc&limit=5
 * no params return all products limit=5
 */
async function productsList(req, res) {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  let limit = req.query.limit ? +req.query.limit : 4
  try {
    const prod = await Product.find()
      .select('-photo')
      .populate('category')
      .sort([[sortBy, order]])
      .limit(limit)
    // console.log(prod)
    res.status(200).json(prod)
  } catch (err) {
    return res
      .status(400)
      .json({ error: `Product not found. - ${err.message}` })
  }
}
/**
 * products in same category with selected product
 */
async function productsRelated(req, res) {
  let limit = req.query.limit ? +req.query.limit : 4
  try {
    const related = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    })
      .select('-photo')
      .limit(limit)
      .populate('category', '_id name')

    res.json(related)
  } catch (err) {
    return res
      .status(400)
      .json({ error: `Product not found. - ${err.message}` })
  }
}
async function categoriesByProduct(req, res) {
  try {
    const cat = await Product.distinct('category', {})
    res.status(200).json(cat)
  } catch (err) {
    return res
      .status(400)
      .json({ error: `Categories not found. - ${err.message}` })
  }
}
/**
 * list products by search
 *  implement product search in react frontend
 *  show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 *  send request and show the products to users based on what he wants
 */
async function productsFilterSearch(req, res) {
  let order = req.body.order ? req.body.order : 'desc'
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
  let limit = req.body.limit ? parseInt(req.body.limit) : 20
  let skip = parseInt(req.body.skip)
  let findArgs = {}

  console.log(order, sortBy, limit, skip, req.body.filters)
  console.log(req.body)

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }
  try {
    const data = await Product.find(findArgs)
      .select('-photo')
      .populate('category')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)

    if (!data) {
      return res.status(400).json({ error: `Didn't find anything.` })
    }

    res.status(200).json({ size: data.length, data })
  } catch (err) {
    res.status(400).json({ error: `Didn't find anything. - ${err.message}` })
  }
}

/**
 * products in category search for string
 */
async function productsSearch(req, res) {
  let text = req.query.text
  let catId = req.query.category
  const q =
    catId === 'all'
      ? {
          name: { $regex: `${text}`, $options: 'i' },
        }
      : {
          name: { $regex: `${text}`, $options: 'i' },
          category: `${catId}`,
        }
  try {
    const result = await Product.find(q)
      .select('-photo')
      .limit(10)
      .populate('category', '_id name')

    res.json(result)
  } catch (err) {
    return res
      .status(400)
      .json({ error: `Product not found. - ${err.message}` })
  }
}

function productPhoto(req, res, next) {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }
  next()
}
module.exports = {
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
}
