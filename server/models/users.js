//Dependencies
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-as-promised')

//Schema
var UsersSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
    minlength: 2,
    trim: true,
    message: 'Last name is required and must be longer than 2 characters',
  },
  lastName: {
    required: true,
    type: String,
    minlength: 2,
    trim: true,
    message: 'Last name is required and must be longer than 2 characters',
  },
  email: {
    type: String,
    unique: [true, 'Email already in use'],
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

UsersSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password)
};


UsersSchema.pre('save', function(next) {
  if(!this.isModified('password')) return next();
  var self = this;
  bcrypt.hash(this.password, 10)
    .then(function(hash) {
      self.password = hash;
      next();
    })
    .catch(next);
});

//model
module.exports = mongoose.model('User', UsersSchema);
