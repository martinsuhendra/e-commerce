const User = require('../models/user-model')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class UserController {
    
    static signUp(req, res) {
    
    let body = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        address : req.body.address,
        email : req.body.email,
        password : req.body.password,
        role : 'customer'
    }
        User.create(body)
            .then((data)=> {
                res.status(201).json({data, message: 'Congratulation, you are successfully registered'})
            })
            .catch((err)=> {  
                res.status(400).json(err.message)
            })

    }

    static signIn(req, res){
        
        let { email } = req.body
      
        User.findOne({email})
            .then(user => {
                if (!user) {
                    res.status(404).json({message: `user not found`})
                } else if(!compare(req.body.password, user.password)){  
                    res.status(401).json({message : `Email/password is incorrect`})
                } else {
                    let payload = {
                        id: user._id,
                        email: user.email,
                        role: 'customer'
                    }
                    let token = sign(payload)
                    req.headers.token = token
                    res.status(200).json({
                        message : `You have successfully login!`,
                        token,
                        details : payload
                    })
                }
            })
            .catch((err)=>{
                res.status(500).json(err.message)
            })
    }

    static signUpAdmin(req, res) {

        let body = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            address : req.body.address,
            email : req.body.email,
            password : req.body.password,
            role : 'admin'
        }

        User.create( body )
        .then((newAdmin)=> {
            res.status(201).json({newAdmin, message: `you are registered as an admin!`})
        })
        .catch((err)=> {
            res.status(500).json(err.message)
        })
    }

    static signInAdmin(req, res) {

        let { email } = req.body.email

        User.findOne(email)
            .then(user => {
                if (!user) {
                    res.status(404).json({message: `user not found`})
                } else if(!compare(req.body.password, user.password)){
                    res.status(401).json({message : `Email/password is incorrect`})
                } else {
                    
                    let payload = {
                        id: user._id,
                        email: user.email,
                        role: 'admin'
                    }
                    let token = sign(payload)
                    req.headers.token = token

                    res.status(200).json({
                        message : `You have successfully login!`,
                        token,
                        details : payload
                    })
                }
            })
            .catch((err)=>{
                res.status(500).json(err.message)
            })
    }
}
module.exports = UserController