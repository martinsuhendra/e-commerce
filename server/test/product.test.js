const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const clearProduct = require('../helpers/clearProduct')
const clearCart = require('../helpers/clearCart')
const jwt = require('../helpers/jwt')
const User = require('../models/user-model')
const Product = require('../models/product-model')
const Cart = require('../models/cart-model')

chai.use(chaiHttp)

let token = null;
let productId = null;
let userId = null;
let cartId = null;

before(function(done){
    User.create({
        firstName : `Martin`,
        lastName :  `Suhendra`,
        address :  `Bandung`,
        email : `suhendra.martin90@gmail.com`,
        password : `12345`,
        role : `admin`
    })
    .then((data)=>{
        userId = data._id
        token = jwt.sign({
            email : data.email,
            id : data._id
        }, process.env.JWT_SECRET)
        done()
    })
    .catch((err)=>{
       
        done()
    })
})

after(function(done){
    clearProduct(done)
    clearCart(done)
})

describe(`/POST Create Product`, function(){
    
    //SUCCEESS CREATE
    describe(`success test`, function(){
        it(`should be return status 201 with object of product`, function(done){
            let product = {
                productName : `Guitar`,
                description : 'Maple wood 24 frets PRS',
                availableStock : 2,
                image : 'image/jpg',
                price : 100
            }
            chai
            .request(app)
            .post('/products')
            .set({token})
            .send(product)
            .end((err, res)=> {
                let { message } = res.body
                expect(res).to.have.status(201)
                expect(res.body).is.an(`object`)
                expect(message).equal(`product created`)
                expect(res.body.data.availableStock).greaterThan(0)
                
                done()
            })
        })
    }),
    describe(`error test`, function(){
        //PRODUCT NAME EMPTY
        it(`should be return status 500 (ERROR: all required data need to be complete)`, function(done){
            let product = {
                productName : ``,
                description : 'Maple wood 24 frets PRS',
                availableStock : 5,
                image : 'image/jpg',
                price : 100
            }
            chai
            .request(app)
            .post('/products')
            .set({token})
            .send(product)
            .end((err, res)=> {
                expect(res.text).to.include('empty')
                expect(res).to.have.status(500)
                done()
            })
        }),
        it(`should be return status 500 (ERROR: stock must be more than 0)`, function(done){
            let product = {
                productName : `Guitar`,
                description : 'Maple wood 24 frets PRS',
                availableStock : 0,
                image : 'image/jpg',
                price : 100
            }
            chai
            .request(app)
            .post('/products')
            .set({token})
            .send(product)
            .end((err, res)=> {
                expect(res.text).to.include('0')
                done()
            })
        })
    })
})

describe(`/GET All Products`, function(){
    let newProduct = {
        productName : `Guitar`,
        description : 'Maple wood 24 frets PRS',
        availableStock : 47000,
        image : 'image/jpg',
        price : 100
    }

    Product.create(newProduct)
        .then((data)=> {
        })
        .catch(err => {
            console.log(err);
            done()
        })

    describe(`success test`, function(){
        it(`should be returned status 200 with an array of data objects`, function(){
            chai
                .request(app)
                .get('/products')
                .set({token})
                .end((req, res)=> {
                    expect(res.body).is.an('array')
                })
        })
    })

    describe(`error test`, function(){
        it(`should be returned status 500 (ERROR: You are not authenticated)`, function(done){
            chai
            .request(app)
            .get('/products')
            .end((err, res)=> {
                expect(res.text).to.include(`access`)
                expect(res).to.have.status(401)
                done()
            })
        })
    })
})
//DELETE PRODUCTS
describe(`/DELETE products`, function(){
    let productId = null

    let newProduct = {
        productName : `Guitar`,
        description : 'Maple wood 24 frets PRS',
        availableStock : 47000,
        image : 'image/jpg',
        price : 100
    }

    Product.create(newProduct)
    .then((data)=> {
        productId = data._id
       
    })
    .catch(err => {
        console.log(err);
    })

    describe(`success test`, function(){
        it(`should be returned status 200 with a message success deleting data`, function(){
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .set({token})
                .end((req, res)=> {
                    expect(res).to.have.status(200)
                    expect(res.body.message).equal('success deleting data')
                })
        })
    })

    describe(`error test`, function(){
        it(`should be returned status 500 (ERROR: You are not authenticated)`, function(done){
            chai
            .request(app)
            .get(`/products/${productId}`)
            .end((err, res)=> {
                expect(res.text).to.include(`access`)
                expect(res).to.have.status(401)
                done()
            })
        })
    })
})

describe(`/POST User Cart`, function(){
    describe(`success test`, function(){
        it(`should be returned status 201 with an object of cart`, function(done){
            let newProduct = {
                productName : `Guitar`,
                description : 'Maple wood 24 frets PRS',
                availableStock : 47000,
                image : 'image/jpg',
                price : 100
            }
        
            Product.create(newProduct)
                .then((data)=> {
                    productId = data._id
                    done()
                })
                .catch(err => {
                    console.log(err);
                    done()
                })

            chai
                .request(app)
                .post(`/carts`)
                .set({token})
                .send({
                    userId, productId, quantity: 5
                })
                .end((err, res)=> {
                    expect(res.body).is.an('object')
                    expect(res).to.have.status(201)
                })
        })
    })
})

// describe(`/DELETE User Cart`, function(){
//     describe(`success test`, function(){
//         it(`should be returned status 200 with an object of cart`, function(done){
//             let newProduct = {
//                 productName : `Guitar`,
//                 description : 'Maple wood 24 frets PRS',
//                 availableStock : 47000,
//                 image : 'image/jpg',
//                 price : 100
//             }

//             Product.create(newProduct)
//                 .then((data)=> {
//                     productId = data._id
                    
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     done()
//                 })
            
//             Cart.create({ userId, productId, quantity: 5})
//                 .then((cart) => {
//                 cartId = cart._id
//                 })
//                 .catch((err)=> {
//                     done()
//                 })

//             chai
//                 .request(app)
//                 .delete(`/carts/${cartId}`)
//                 .set({token})
//                 .end((err, res)=> {
                    
//                 })
//         })
//     })
// })

