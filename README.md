# e-commerce

## User Routes
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/signUp  |POST  |none|firstName: String(**required**), lastName: String(**required**),address:String(**required**),email: String (****required****),  password: String (****required****)|****Success****: Register a user, ****Error****: Internal server error (Validation)|Register a user|
|/users/signIn  |POST  |none|email: String (****required****), password: String (****required****) |****Success****: Login as a user, ****Error****: Internal server error (Validation)|Login as a user|
|/users/googleSignIn  |POST  |none|email: String (****required****), password: String (****required****) |****Success****: Login as a user via Google, ****Error****: Internal server error (Validation)|Login as a user via Google|
|/users/:userId  |PATCH  |token|firstName: String(**optional**), lastname:String(**required**),address:String(**required**),email: String (****required****), password: String (****required****) |****Success****: Updating user data, ****Error****: Internal server error (Validation)|Update user data|

## Product Routes
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/products  |GET  |token|none |****Success****: Get all products available on the market, ****Error****: Internal server error (Validation)|Get all posted products|
|/products/:userId  |POST  |token|productName: String(****required****), description: String(****required****), availableStock: Number(****required****), image: File (****optional****) |****Success****: Post a product to the market, ****Error****: Internal server error (Validation)|Post a product|
|/products/:productId |GET |token | none |****Success****: Get details of one product, ****Error****: Internal server error (Validation)| Get product details
|/products/:productId  |PATCH  |token|productName: String (****optional****), description: String (****optional****),availableStock:Number(****optional****) image: File (****optional****) |****Success****: Update an product, ****Error****: Internal server error (Validation)|Update an article|
|/products/:productId  |DELETE  |token|none|****Success****: Delete product, ****Error****: Internal server error (Validation)|Delete a product|


## Cart Routes
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/carts/:userId  |GET  |token|none |****Success****: Get all carts for spesific user, ****Error****: Internal server error (Validation)|Get all created carts for authenticated user|
|/carts/:userId  |POST  |token|productId: Number(****required****), userId: Number, quantity: Number(****required****)|****Success****: Add a new cart, ****Error****: Internal server error (Validation)|Add cart|
|/carts/:cartId |GET |token | none |****Success****: Get details of one product, ****Error****: Internal server error (Validation)| Get cart details
|/carts/:cartId  |PATCH  |token|productName: String (****optional****), description: String (****optional****),availableStock:Number(****optional****) image: File (****optional****) |****Success****: Update an product, ****Error****: Internal server error (Validation)|Update a cart|
|/carts/:cartId  |DELETE  |token|none|****Success****: Delete a cart, ****Error****: Internal server error (Validation)|Delete a cart|