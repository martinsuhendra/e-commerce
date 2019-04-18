const { verify } = require('../helpers/jwt')
const User = require('../models/user-model')

module.exports = (req, res, next) => { 
    const decoded = verify(req.headers.token)
   
    User
        .findOne({_id : decoded.id})
        .then((user)=> {
            if (user._id == decoded.id && user.role == 'admin') {
                next()
            } else {
                res.status(401).json({
                    message : `You dont have any access!`
                })
            }
        })
}