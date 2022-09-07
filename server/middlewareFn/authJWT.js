const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization
  let token = null
  if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
    token = authHeader.split(' ')[1]
  } else if (req.cookies.t) {
    token = req.cookies.t
  }
  if (token) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(tokenData)
      req.body._id = tokenData._id
      req.body.role = tokenData.role
      next()
    } catch (err) {
      return res.status(403).json({ error: '403 Access denied.' })
    }
  } else {
    return res.status(401).json({ error: '401 Not authenticated.' })
  }
}
const isAdmin = (req, res, next) => {
  // console.log(req.body._id)
  if (req.profile?.role === 0 || req.body.role === 0) {
    return res
      .status(403)
      .json({ error: '403  Access denied, admin resource.' })
  } else {
    next()
  }
}
module.exports = { authenticateJWT, isAdmin }
