const mongoose = require('mongoose')
const User = require('../models/user.model')
const Product = require('../models/product.model')
const CartItemSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    count: Number,
  },
  { timestamps: true }
)

const CartItem = mongoose.model('CartItem', CartItemSchema)

const AddressSchema = new mongoose.Schema({
  first: String,
  last: String,
  address: String,
  msg: String,
})
const OrderSchema = new mongoose.Schema(
  {
    items: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: AddressSchema,
    status: {
      type: String,
      default: 'Not processed',
      enum: [
        'Not processed',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
      ],
    },
    updated: Date,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)
OrderSchema.post('save', async function (doc, next) {
  try {
    const u = await User.findOneAndUpdate(
      { _id: doc.user._id },
      { $push: { history: doc._id } },
      {
        new: true,
        upsert: true,
      }
    )
    doc.items.map(async (p) => {
      const upProduct = await Product.findOneAndUpdate(
        { _id: p._id },
        { $inc: { sold: +p.count, quantity: -p.count } }
      )
    })
    next()
  } catch (err) {
    console.log(err.message)
  }
})
const Order = mongoose.model('Order', OrderSchema)

module.exports = { Order, CartItem }
