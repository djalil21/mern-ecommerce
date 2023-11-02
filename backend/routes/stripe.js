require('dotenv')
const express = require('express')
const { default: Stripe } = require('stripe')
const router = express.Router()
const cors = require('cors')
const stripe = new Stripe(process.env.STRIPE_SECRET)

router.post("/pay", cors(), async (req, res) => {
    let { amount, id } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Djalil Store",
            payment_method: id,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never"
            },
            confirm: true
        })
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
})



module.exports = router