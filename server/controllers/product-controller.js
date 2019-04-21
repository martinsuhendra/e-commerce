const Product = require('../models/product-model')

class ProductController {
    static create(req, res){
   
       let {productName, description, availableStock, image, price} = req.body
       let gcsUrl = ''
       if (!req.file) {
           gcsUrl = 'https://upload.wikimedia.org/wikipedia/en/d/d1/Image_not_available.png'
       } else {
           gcsUrl = req.file.gcsUrl
       }
        if (req.headers.token) {
            Product.create({
                productName, description, availableStock, image : gcsUrl, price
            })
            .then((data)=> {
                res.status(201).json({data, message: `product created`})
            })
            .catch((err)=> {
                res.status(500).json(err.message)
            })
        }
    }

    static showAll(req, res){
            Product
            .find()
            .then((data)=> {
                res.status(200).json(data)
            })
            .catch(err=> {
                res.status(500).json(err.message)
            })
    }

    static showOne(req,res){
     
        Product
            .findById({_id : req.params.productId})
            .then((product)=>{
                if (product) {
                    res.status(200).json(product)
                } else {
                    res.status(404).json({message : `item is not found`})
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
        
    }
    static edit(req,res){
        console.log(req.params,'======= req.params');
        
        if (!req.headers.token) {
            res.status(401).json({message : 'You dont have any access'})            
        } else {
            let {productName, description, price, availableStock, image} = req.body
            Product
            .findOneAndUpdate({_id : req.params.productId},{
                productName, description, price, availableStock, image
            })
            .then((data)=>{
                if (!data) {
                    res.status(404).json({message: 'product not found!'})
                } else {
                    res.status(200).json({data, message: 'update success'})
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            }) 
        }
    }

    static delete(req,res) {
        if (!req.headers.token) {
            res.status(401).json({message : 'You dont have any access'})
        } else {
            Product
                .deleteOne({_id : req.params.productId})
                .then((data)=>{
                    if (!data) {
                        res.status(404).json({message: 'product not found!'})
                    } else {
                        res.status(200).json({data,message : `success deleting data`})
                    }
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        }
    }
}

module.exports = ProductController