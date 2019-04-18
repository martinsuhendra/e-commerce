const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName : {
        type : String,
        required: [true, `product cannot be empty`]
    },
    description : {
        type : String,
    },
    price : {
        type : Number,
        required: [true, 'price cannot be empty'],
        min: [0,'price cannot below 0']
    },
    availableStock : {
        type : Number,
        required : [true, `stock must be more than 0`],
        min : [0,`stock must be more than 0`]
    },
    image : {
        type : String
    }
})

const Product = mongoose.model('Product',productSchema)
module.exports = Product