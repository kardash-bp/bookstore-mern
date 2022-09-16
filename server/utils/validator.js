const Joi = require('joi')
const User = require('../models/user.model')
const pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})'

// email is unique
const checkEmail = async (email) => {
  const user = await User.findOne({ email })
  if (user) {
    return {
      message: '"email" must be unique',
    }
  } else {
    return false
  }
}

const schemas = {
  userSchema: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.base': '"" must contain alpha characters only',
    }),
    password: Joi.string().trim().regex(RegExp(pattern)).messages({
      'string.base': `"" should be a type of 'text'`,
      'string.pattern.base': `must contain at least one upper case, one lower case letter, number and min length 6`,
      'any.required': `"" is a required field`,
    }),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'rs'] },
    }),
  }),
  loginSchema: Joi.object({
    password: Joi.string().trim().regex(RegExp(pattern)).messages({
      'string.base': `"" should be a type of 'text'`,
      'string.pattern.base': `must contain at least one upper case, one lower case letter, number and min length 6`,
      'any.required': `"" is a required field`,
    }),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'rs'] },
    }),
  }),
}

const validate = (schema) => async (req, res, next) => {
  const { error } = schema.validate(req.body)
  const emailUnique = await checkEmail(req.body.email)
  if (error) {
    const { details } = error
    const message = details.map((d) => d.message).join(',')
    req.body.error = message
  } else if (emailUnique) {
    req.body.error = 'Email is already in use.'
  }
  next()
}
module.exports = { validate, schemas }
