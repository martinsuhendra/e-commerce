//Check for User Registration

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
const app = require('../app')
const clearUser = require('../helpers/clearUser')
chai.use(chaiHttp);

before(function(done){
    clearUser(done)
})

after(function(done){
    clearUser(done)
})


let user  = {
    firstName : `Martin`,
    lastName :  `Suhendra`,
    address :  `Bandung`,
    email : `suhendra.martin@gmail.com`,
    password : `12345`,
    role : `admin`
}

describe(`/POST Register User`, function(){
    describe(`success test`, function(){
        it(`should be return status 201 with object of data`, function(done){
            chai
                .request(app)
                .post('/users/signUp')
                .send(user)
                .end((err, res)=> {
                    console.log(res.body,'===== body');
                    
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.data).to.have.property('firstName')
                    expect(res.body.data).to.have.property('email')
                    expect(res.body.data).to.have.property('address')
                    expect(res.body.data).to.have.property('password')
                    expect(res.body.data.firstName).to.be.a('string')
                    expect(res.body.data.lastName).to.be.a('string')
                    expect(res.body.data.address).to.be.a('string')
                    expect(res.body.data.email).to.be.a('string')
                    expect(res.body.data.password).to.be.a('string')
                    expect(res.body.data.password).not.equal('12345')
                    done()
                })
        })
    })

    describe(`error test`, function(){
        //FIRSTNAME IS EMPTY
        it(`should be return status 400 with (ERROR: firstname cannot be empty)`, function(done){
            let userDummy = {
                firstName : ``,
                lastName :  `Suhendra`,
                address :  `Bandung`,
                email : `suhendra.martin@gmail.com`,
                password : `12345`,
                role: `user`
            }
            chai
                .request(app)
                .post('/users/signUp')
                .send(userDummy)
                .end((err, res)=> {
                    expect(res).to.have.status(400);
                    expect(res.body.errors.firstName.value).to.have.lengthOf(0);
                    expect(res.body.errors.firstName.message).equal(`first name is cannot be empty`)
                    done()
                })
        }),
        //EMAIL IS EMPTY
        it(`should be return status 400 with (ERROR: email is required)`, function(done){
            let userDummy = {
                firstName : `Martin`,
                lastName :  `Suhendra`,
                address :  `Bandung`,
                email : ``,
                password : `12345`
            }
            chai
                .request(app)
                .post('/users/signUp')
                .send(userDummy)
                .end((err, res)=> {
                    expect(res).to.have.status(400);
                    expect(res.body.errors.email.value).to.have.lengthOf(0);
                    expect(res.body.errors.email.message).to.include(`required`)
                    done()
                })
        })
        //EMAIL FORMAT VALIDATION
        it(`should be return status 400 with (ERROR: Invalid email format)`, function(done){
            let userDummy = {
                firstName : `Martin`,
                lastName :  `Suhendra`,
                address :  `Bandung`,
                email : `b@com`,
                password : `12345`
            }
            chai
            .request(app)
            .post('/users/signUp')
            .send(userDummy)
            .end((err, res)=> {
                expect(res).to.have.status(400);
                expect(res.body.errors.email.message).to.include(`Invalid`)
                done()
            })
        })
        //UNIQUE EMAIL
        it(`should be return 400 with (ERROR: Email already registered)`, function(done){
            let userDummy = {
                firstName : `Martin`,
                lastName :  `Suhendra`,
                address :  `Bandung`,
                email : `suhendra.martin@gmail.com`,
                password : `12345`
            }
            chai
            .request(app)
            .post('/users/signUp')
            .send(userDummy)
            .end((err, res)=> {
                expect(res).to.have.status(400);
                expect(res.body.errors.email.message).to.include(`registered`)
                done()
            })
        })
        //ADDRESSS EMPTY
        it(`should be return status 400 with (ERROR: address cannot be empty)`, function(done){
            let userDummy = {
                firstName : `Martin`,
                lastName :  `Suhendra`,
                address :  ``,
                email : `suhendra@mail.com`,
                password : `12345`
            }
            chai
                .request(app)
                .post('/users/signUp')
                .send(userDummy)
                .end((err, res)=> {
                    expect(res).to.have.status(400);
                    expect(res.body.errors.address.value).to.have.lengthOf(0);
                    expect(res.body.errors.address.message).to.include(`empty`)
                    done()
                })
        })
    })
  
})

describe(`/POST SignIn User`, function(){
    describe(`success test`, function(){
        it(`should be return status 200 with object of data`, function(done){
            let registeredUser = {
                email : user.email,
                password : user.password
            } 
            chai
                .request(app)
                .post(`/users/signIn`)
                .send(registeredUser)
                .end((err, res)=> {
                    expect(res.body).to.have.property(`token`)
                    expect(res).to.have.status(200)
                    token = res.body.token
                    done()
                })
        })

    }),
    describe(`error test`, function(){
        it(`should be return status 400 (ERROR: 'Email/password is incorrect')`, function(done){
            let registeredUser = {
                email : user.email,
                password : `12341`
            } 
            chai
                .request(app)
                .post(`/users/signIn`)
                .send(registeredUser)
                .end((err, res)=> {
                    expect(res.body.message).equal(`Email/password is incorrect`)
                    done()
                })
        })

    })
})


