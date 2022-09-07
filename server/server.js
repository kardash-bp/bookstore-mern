const http = require('http')
require('dotenv').config()
const app = require('./app')
require('./db')

const server = http.createServer(app)
const port = process.env.PORT || 5000
server.listen(port, (err) => {
  if (err) {
    console.log('Something went wrong', err)
  }
  console.log(`CORS enabled server running on ${port}`)
})
