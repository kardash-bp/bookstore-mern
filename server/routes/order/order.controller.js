const { Order } = require('../../models/order.model')

async function addOrder(req, res) {
  let newOrder = req.body.order
  newOrder.user = req.profile
  try {
    const order = new Order(newOrder)
    const savedOrder = await order.save()
    if (!savedOrder) {
      throw new Error("Order isn't stored.")
    }
    //  console.log(order)
    res.status(200).json({ order: savedOrder })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ error: err.message })
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate('user', 'name role')
      .sort('-createdAt')
    res.json(orders)
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ error: err.message })
  }
}
async function updateStatus(req, res) {
  console.log(req.body)
  console.log(req.params['orderId'])
  try {
    const updated = await Order.findOneAndUpdate(
      { _id: req.params['orderId'] },
      { status: req.body.status },
      { new: true }
    )

    res.json(updated)
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ error: err.message })
  }
}

function getStatus(req, res) {
  res.json(Order.schema.path('status').enumValues)
}

module.exports = { addOrder, getAllOrders, getStatus, updateStatus }
