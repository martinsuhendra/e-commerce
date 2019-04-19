const Cart = require('../models/cart-model')

class CartController {
    static create(req, res){
      
        if (!req.headers.token) {
            res.status(401).json({message: 'Access denied'})
        } else {
            let {userId, productId, total, amount} = req.body
            Cart.create({ userId, productId, total, amount })
            .then((cart)=> {
                res.status(201).json({cart, message : `cart successfully created`})
            })
            .catch((err)=> {
                res.status(500).json(err)
            })
        }
    }

    static showAll(req, res) {
       
        Cart
            .find({
                userId : req.authenticatedUser.id
            })
            .populate('productId')
            .then((data)=> {
                res.status(200).json(data)
            })
            .catch((err)=> {
                res.status(500).json(err)
            })

    }

    static delete(req, res){
    
        Cart
            .deleteOne({
                _id : req.params.cartId
            })
            .then((data)=> {
                res.status(200).json({data, message : 'deleted successfully'})
            })
            .catch((err)=> {
                console.log(err);
            })
    }
}

module.exports = CartController