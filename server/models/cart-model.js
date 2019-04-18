const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: [{
        type : Schema.Types.ObjectId,
        ref: 'Product'
    }],
    quantity : {
        type : Number,
        required: [true, 'Stock must be filled'],
        min: [1, 'Stock cannot be zero']
    },
    status: {
        type : String,
        default : 'pending'
    }
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart