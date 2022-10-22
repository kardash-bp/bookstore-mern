const User = require('../../models/user.model')
const { Order } = require('../../models/order.model')

async function userById(req, res, next, id) {
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }
    req.profile = user.toJSON()
    next()
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ error: 'User not found.' })
  }
}
function getProfile(req, res) {
  if (!req.profile) {
    return res.status(400).json({ error: 'User not found!' })
  }
  //console.log(req.profile)
  // req.profile.salt = undefined
  // req.profile.hash = undefined
  res.json(req.profile)
}
async function updateProfile(req, res) {
  console.log(req.body)
  try {
    const newUser = await User.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { new: true }
    )
    res.json(newUser.toJSON())
  } catch (err) {
    return res.status(400).json({ error: 'No user exists in db to update.' })
  }
}

async function userOrdersHistory(req, res) {
  try {
    const data = await Order.findById(req.params.id)
    if (!data) {
      return res.status(404).json({ error: 'User not found.' })
    }
    res.json(data)
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ error: 'User not found.' })
  }
}
module.exports = { userById, getProfile, updateProfile, userOrdersHistory }
