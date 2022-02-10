const express = require('express')
const Cart = require('../models/cart')
const auth = require('../middleware/auth')
const router = new express.Router()

//Add to cart
router.post('/cart', async (req, res) => {
    const cart = new Cart({
        ...req.body, 
        owner: req.user._id
    })

    try {
        await cart.save()
        res.status(201).send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router