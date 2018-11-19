let app=require('../app.js');
let chai=require('chai'), chaiHttp = require('chai-http');
let expect=chai.expect;
chai.use(chaiHttp);

describe('login', function() {
  it('successfully-logins-user', function(done) {
    chai.request(app)
    .post('/users/login')
    .send({
      email:'x@mail.com',
      password:'12345'
    })
    .end(function (err, res) {
      console.log(res.body)
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success',true);
      expect(res.body).to.have.property('token');
      done();
    })
  });

  it('fails-to-login-unknown-user', function(done){
    chai.request(app)
    .post('/users/login')
    .send({
      email:'unknown',
      password:'xxxx'
    })
    .end(function (err,res) {
      expect(res).to.have.status(500);
      expect(res.body.msg).to.be.string('email not found');
      done();
    })     
  })  
})

describe('POST /register', function() {
  let newUser= {
    'name':'theo darmawan',
    'email': 'td@gmail.com',
    'password':'abc123'
  }
  it('successfully adds new user', function(done) {
    
    chai.request(app)
    .post('/users/register')
    .send(newUser)
    .end(function(err,res) {
      console.log(']]]]]',res.body)
      expect(err).to.be.null;
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('token');
      expect(res.body.success).to.equal(true);
      done();
    })
  })
})



