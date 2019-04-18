require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
//cors
const cors = require('cors')
//routes
const userRoutes = require('./routes/user-routes.js')
const productRoutes = require('./routes/product-route')
const cartRoutes = require('./routes/cart-route')
//mongoose
const NODE_ENV = process.env.NODE_ENV || 'development'
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/e-commerce-' + NODE_ENV, { useNewUrlParser: true })

app.use(cors())

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/carts', cartRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app