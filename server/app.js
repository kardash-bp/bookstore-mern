const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth/auth.router')
const userRouter = require('./routes/user/user.router')
const catRouter = require('./routes/category/category.router')
const productRouter = require('./routes/product/product.router')
const app = express()

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
)
app.use(helmet())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/category', catRouter)
app.use('/product', productRouter)

app.get('/', (req, res) => {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
  let response = 'Not logged in!'

  if (req.cookies.t) {
    response = 'Yup! You are logged in!'
  }

  res.send(response)
})
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('Invalid token...')
  }
  res.send(err.message)
})
module.exports = app
