const Cart = require('../models/cart-model')

module.exports = function(done){
    if (process.env.NODE_ENV == 'test') {
        Cart
        .deleteMany({})
        .then(()=>{
            console.log('success');
        })
        .catch((err)=> {
            console.log(err);
        })
    }
}