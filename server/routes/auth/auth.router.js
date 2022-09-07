const { Router } = require('express')
const { authenticateJWT } = require('../../middlewareFn/authJWT')
const { validate, schemas } = require('../../utils/validator')

const { login, registerUser, signOut } = require('./auth.controller')

const authRouter = Router()
authRouter.get('/', authenticateJWT, (req, res) => {
  console.log(req.body._id)
  res.status(200).json({ message: 'authorized access' })
})
authRouter.get('/logout', signOut)
authRouter.post('/login', login)
authRouter.post('/register', validate(schemas.userSchema), registerUser)

module.exports = authRouter
