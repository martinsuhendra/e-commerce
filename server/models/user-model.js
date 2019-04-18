const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    firstName : {
        type : String,
        required : [true,'first name is cannot be empty']
    },
    lastName : {
        type : String,
    },
    address : {
        type : String,
        required : [true, `address cannot be empty`]
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        validate : [{
            validator : function(input){
                let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                    return regex.test(input);
            },
            message : `Invalid email format`
        },{
            validator : function(input){
                return mongoose.model('User', userSchema)
                        .findOne({
                            _id : {
                                $ne: this._id
                            },
                            email : input
                        })
                        .then((data)=> {
                            if (data) {
                                return false
                            }
                        })
            },
            message : `Email already registered`
        }]
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String
    }
})

userSchema.post('validate', function (doc) { 
    doc.password = hash(doc.password)
})

const User = mongoose.model('User', userSchema)
module.exports = User