
let app=require('../app.js')
let expect=require('chai').expect
let chai=require('chai'), chaiHttp = require('chai-http');
  let jwt=require('jsonwebtoken');
chai.use(chaiHttp);

describe('/POST article', function() {
  
  it('successfully-create-article', function(done) {
    let article= {
      title: 'test',
      author: 'test',
      body: 'test bla bla',
      tags: 'test test1 test2',
      date: Date.now()
    };
    let token = jwt.sign({
      "name":"xxx",
      "email":"yyy"
    }, process.env.SECRET);

    chai.request(app)
    .post('/articles') 
    .set('token', token)
    .send(article)
    .end(function(err,res) {
      console.log('----',res) 
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body).to.have.property('article');
      done()
    })
  })
})
  
describe('/GET all-articles', function(){
  it('successfully-retrieves-articles', function(done) {
    chai.request(app)
    .get('/articles')
    .end(function(err,res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('success');
      expect(res.body).to.have.property('articles');
      done();
    })
  })
})

describe('/POST update-own-article', function(){
  it('successfully-updates-article', function(done) {
    let article= {
      title: 'test',
      author: 'test',
      body: 'test bla bla',
      tags: 'test test1 test2',
      date: Date.now()
    };
    let token = jwt.sign({
      "name":"xxx",
      "email":"yyy"
    }, process.env.SECRET);
    let updatedData= {
      title:'some title',
      body:'bla bla bla',
      tags:'test test1'
    };
    chai.request(app)
    .post('/articles')
    .set('token', token)
    .send(article)
    .end(function(err,res) {
      articleId=res.body.article._id;
      chai.request(app)
      .post(`/articles/${articleId}`)
      .set('token', token)
      .send(updatedData)
      .end(function(err,res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success',true);
        done();
      })
    })
  })
})

describe('/DEL delete-own-article', function(){
  it('successfully-deletes-article', function(done) {
    let article= {
      title: 'test',
      author: 'test',
      body: 'test bla bla',
      tags: 'test test',
      date: Date.now()
    };
    let articleId;
    let token = jwt.sign({
      "name":"xxx",
      "email":"yyy"
    }, process.env.SECRET);
    chai.request(app)
    .post('/articles')
    .set('token', token)
    .send(article)
    .end(function(err,res) {
      articleId=res.body.article._id;
      chai.request(app)
      .delete(`/articles/${articleId}`)
      .set('token', token)
      .end(function(err,res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success',true);
        done();
      })
    })
    
  })
})

  