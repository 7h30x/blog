const articleModel = require('../models/article')

class Comment {
  static create (req,res) {
    let comment = {
      user : res.locals.user.name, 
      email : res.locals.user.email, 
      body : req.body.comment
    };
    let articleId = req.body.articleId;
    articleModel.findByIdAndUpdate(articleId, {
      $push: {comments: comment}
    })
    .then(result => {
      res.status(200).json({
        "success":true,
      })
    })
    .catch(err => res.status(500).json(err))
  }

  static delete (req,res) {
    let articleId = req.body.articleId;
    let commentId = req.body.commentId
    articleModel.findByIdAndUpdate(articleId, {
      $pull: {comments: {_id: commentId }}
    })
    .then(result => {
      res.status(200).json({
        "success":true
      })
    })
    .catch(err => res.status(500).json(err))
  }
}

module.exports = Comment


