const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        default: 200
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
    // timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart