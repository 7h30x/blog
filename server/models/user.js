let mongoose = require('mongoose');
let Schema= mongoose.Schema;
let userSchema = new Schema ({
  email: String,
  password: String,
  name: String,
  role: String
});

let userModel= mongoose.model('user',userSchema);
module.exports = userModel;
