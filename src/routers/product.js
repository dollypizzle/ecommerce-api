const express = require('express')
const Product = require('../models/product')
const auth = require('../middleware/auth')
const router = new express.Router()

//Create a Product
router.post('/products', auth, async (req, res) => {
    const product = new Product({
        ...req.body,
        owner: req.user._id
    })

    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

////Get all the products from db
router.get('/products', (req, res) => {
    Product.find({}, function(err, products){
        if(err){
            res.status(500).send()
        } else {
            res.status(201).send(products)
        }
    });
})

// Get a product by id
router.get('/products/:id', (req, res) => {
    const _id = req.params.id

    Product.findById(_id).then((product) => {
        if (!product) {
            return res.status(404).send()
        }

        res.send(product)
    }).catch((e) => {
        res.status(500).send()
    })
})

// Update a product by id
router.patch('/products/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'price', 'image', 'brand', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const product = await Product.findOne({ _id: req.params.id, owner:req.user._id})

        if (!product) {
            return res.status(404).send()
        }

        updates.forEach((update) => product[update] = req.body[update])
        await product.save()

        res.send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete a product by id
router.delete('/products/:id', auth, async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, owner:req.user._id})

        if (!product) {
            res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
