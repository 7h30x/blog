let mongoose = require('mongoose');
let Schema= mongoose.Schema;

let commentSchema = new Schema ({
  user: String,
  email: String,
  body: String
});


let articleSchema = new Schema ({
  title: String,
  author: {
    name: String,
    email: String
  },
  body: String,
  date: Date,
  tags: {
    type: [String],
    default: []
  },
  comments: {
    type:[commentSchema],
    default:[]
  }
});


let articleModel= mongoose.model('article',articleSchema);
module.exports = articleModel;
