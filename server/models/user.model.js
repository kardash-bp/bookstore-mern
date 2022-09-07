const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')
const UserSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 33,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },

  {
    //   toObject: {
    //     transform: function (doc, ret) {
    //       delete ret._id
    //     },
    //   },
    //   toJSON: {
    //     transform: function (doc, ret) {
    //       delete ret.hash
    //       delete ret.salt
    //       return ret
    //     },
    //   },
    timestamps: true,
  }
)
// virtual password field
UserSchema.virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = v4()
    this.hash = this.hashPassword(password)
  })
  .get(function () {
    return this._password
  })
UserSchema.methods.toJSON = function () {
  delete this._doc.hash
  delete this._doc.salt
  return this._doc
}
UserSchema.methods.hashPassword = function (password) {
  if (!password) return ''
  try {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
  } catch (err) {
    console.log(err)
    return ''
  }
}
UserSchema.methods.authenticate = function (enteredPassword) {
  return this.hashPassword(enteredPassword) === this.hash
}
UserSchema.methods.newToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
}

module.exports = mongoose.model('User', UserSchema)
