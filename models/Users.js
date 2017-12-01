const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  token: {
    type: String,
    required: false
  }
});

mongoose.model('users', UserSchema);