const User = require('../../models/user.model')

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res
        .status(400)
        .json({ err: 'User with that email does not exist.' })
    }
    // user found check password
    if (!user.authenticate(req.body.password)) {
      return res.status(400).json({ err: 'Wrong credentials.' })
    }
    //console.log(user)
    // create token & add to cookie
    const token = user.newToken()
    res.cookie('t', token, { expire: new Date() + 99999 })
    console.log('cookie created successfully')
    res.status(201).json({ token, user })
  } catch (err) {
    return res.status(400).send(err.message)
  }
}
// =================================================
async function registerUser(req, res) {
  let newUser = new User(req.body)

  try {
    let user = await newUser.save()
    user = user.toJSON()
    if (!user) {
      throw new Error('User is not created.')
    }
    res.status(201).json({ user })
  } catch (err) {
    return res.status(400).json({ err: err.message })
  }
}
// =================================================
function signOut(req, res) {
  console.log(req.cookies.t)
  res.clearCookie('t')
  console.log('Cookie cleared')
  res.status(200).json({ message: 'You have successfully been logged out.' })
}

module.exports = {
  login,
  registerUser,
  signOut,
}
