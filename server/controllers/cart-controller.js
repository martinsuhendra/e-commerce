const Cart = require('../models/cart-model')

class CartController {
    static create(req, res){
        let {userId, productId, quantity} = req.body
        Cart.create({ userId, productId, quantity })
        .then((cart)=> {
            res.status(201).json({cart, message : `cart successfully created`})
        })
        .catch((err)=> {
            res.status(500).json(err)
        })
    }

    static delete(req, res){
        console.log(req.headers.token,'======');
        
    }
}

module.exports = CartController