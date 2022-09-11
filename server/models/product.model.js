const { default: mongoose } = require('mongoose')
const { ObjectId } = mongoose.Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 33,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 33,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
