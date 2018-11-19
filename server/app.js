require("dotenv").config();

var path = require('path');
var articlesRouter = require('./routes/article');
var usersRouter = require('./routes/users');
let commentsRouter = require('./routes/comment');
const express = require ('express');
const app = express();
const cors = require('cors');
const port = 3000 || process.env.PORT;
const mongoose = require('mongoose');
const uri='mongodb://7h30x:atumefaciens1620@ds261253.mlab.com:61253/blog-theo'
mongoose.connect(uri, (err) => console.log(err));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('in err')
  next(new Error(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.status,err.message)
  // render the error page
  res.status(err.status || 500).json(err.message);
  // res.render('error');
});
app.listen(port, ()=> console.log('cors-enabled server is listening'))
module.exports = app;
