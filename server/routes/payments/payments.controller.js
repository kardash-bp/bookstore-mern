const braintree = require('braintree')

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
})

function getPaymentToken(req, res) {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.send(response)
  })
}
function purchase(req, res) {
  console.log(req.body)
  // const nonceClient = req.body.nonce
  const totalClient = req.body.total

  // const newTransaction = gateway.transaction.sale(
  //   {
  //     amount: totalClient,
  //     paymentMethodNonce: nonceClient,
  //     options: {
  //       submitForSettlement: true,
  //     },
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return res.status(500).json(error)
  //     }
  //     res.json(result)
  //   }
  // )
  res.json({ success: true })
}
module.exports = {
  getPaymentToken,
  purchase,
}
