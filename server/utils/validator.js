const Joi = require('joi')
const pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})'

const schemas = {
  userSchema: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.base': '"" must contain alpha characters only',
      'any.required': `"" is a required field`,
    }),
    password: Joi.string().trim().regex(RegExp(pattern)).messages({
      'string.base': `"" should be a type of 'text'`,
      'string.pattern.base': `must contain at least one upper case, one lower case letter, number and min length 6`,
      'any.required': `"" is a required field`,
    }),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  }),
}

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) {
    const { details } = error
    const message = details.map((d) => d.message).join(',')
    return res.status(422).json({ error: message })
  }
  next()
}

module.exports = { validate, schemas }
