const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const userModel = require('../models/user');
class User {
  static register(req,res) {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hash
      }
      return newUser
    })
    .then(data => {
      return userModel.findOne({
        email:data.email
      }, function (err,user) {
        if(err) res.status(500).json({
          "msg":"server error. Try again."
        });
        else {
          if(user) res.status(500).json({
            "msg":"email already registered. choose another email or please login."
          });
          else {
            let token = jwt.sign({
              email: req.body.email,
              name: req.body.name,
              role: req.body.role 
            }, process.env.SECRET );
            userModel.create(data)
            .then(() => {
              res.status(200).json({
                "success":true,
                "token": token 
              })
            })
            .catch(err => res.status(500).json(err))
          }
        } 
      })
    })
    .catch(err => res.status(500).json(err))
  }
  static login(req,res) {
    //find User in DB
    userModel.findOne({
      email:req.body.email
    })
    .then(user => {
      if(user == null) return res.status(500).json({
        "msg":"email not found"
      });
      else {
        bcrypt.compare(req.body.password,user.password, function (err,same) {
          if(err) return res.status(500).json({
            "msg":"internal server error, try again."
          });
          if(!same) return res.status(200).json({
            "msg":"wrong password."
          });
          else {
             //create token 
            let data = {
              email: user.email,
              name: user.name,
              role: user.role
            };
            let token = jwt.sign(data, process.env.SECRET);
            return res.status(200).json({
              "success" : true,
              "token" : token,
              "user" : data
            });
          }
        })
      }
    })
    .catch(err => res.status(500).err({
      "msg":err
      })
    );
  }
  // static checkToken (req,res) {
  //   if(typeof req.body.token !=='string') {
  //     return res.status(500).json('err');
  //   }
  //   else{
      
  //   }
  // }
} 

module.exports = User