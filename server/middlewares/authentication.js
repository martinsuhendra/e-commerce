const { verify } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        const decoded = verify(req.headers.token)
        req.authenticatedUSer = decoded
        
        if (req.body.token) {
            res.status(200).json({message: `user is verified`})
        }  else {
            next()
        }
    } catch (error) {
        res.status(401).json({message : `you don't have any access`})
    }
}