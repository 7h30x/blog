const articleModel = require('../models/article')
class Article {
  static create (req,res) {
    let tags= req.body.tags.trim().split(' ')
    let data = {
      title: req.body.title,
      author: {
        name: res.locals.user.name,
        email: res.locals.user.email
      },
      body: req.body.body,
      tags: tags,
      date: Date.now()
    };
    articleModel.create(data)
    .then(result => {
      res.status(200).json({
        "success":true,
        "article":result
      })
    })
    .catch(err => res.status(500).json(err))
  }

  static getAll (req,res) {
    articleModel.find()
    .then(result => {
      res.status(200).json({
        "success":true,
        "articles": result
      })
    })
    .catch(err => res.status(500).json({
      'error':'error'
    }))
  }
  static getOne (req,res) {
    console.log(req.params.id)
    articleModel.findById(req.params.id)
    .then(result => {
      res.status(200).json({
        "success" : true,
        "article" : result
      })
    })
    .catch(err => res.status(500).json(err))
  }
  static update (req,res) {
    let articleId = req.params.id;
    
    let tags= req.body.tags.trim().split(' ')
    if(tags=="") tags =[];
    articleModel.findByIdAndUpdate(articleId, {
      title: req.body.title,
      body: req.body .body,
      tags: tags,
    })
    .then(article => {
      res.status(200).json({
        "success": true,
      });
    })
    .catch(err => res.status(500).json(err));
  }

  static delete (req,res) {
    let articleId = req.params.id;
    articleModel.findByIdAndDelete(articleId)
    .then(article => {
      if(article == null) throw 'article not found';
      res.status(200).json({
        "success": true,
        "article": article
      });
    })
    .catch(err => res.status(500).json({"msg": err}));    
  }
}
module.exports = Article;