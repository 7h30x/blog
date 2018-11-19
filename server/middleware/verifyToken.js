const jwt= require('jsonwebtoken');

function verifyToken (req,res, next) {
  if(!req.headers.token) {
    res.status(500).json({
    'msg':'no token sent with request'
    })
  } else {
    jwt.verify(req.headers.token, process.env.SECRET, function(err,decoded) {
      if(err) {
        res.status(500).json({
        'msg':'not a valid token'
        })
      } else {
        console.log('decoded',decoded)
        res.locals.user = decoded;
        next()
      }
      
    })
    
  }
}
module.exports=verifyToken