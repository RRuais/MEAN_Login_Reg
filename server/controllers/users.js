var User = require('mongoose').model('User');

// Users Controller Export
module.exports = {

  index: function(req, res) {
    res.sendFile('index.html')
  },


  register: function(req, res) {
    User.create(req.body)
      .then(function(user) {
        req.session.userID = user._id
        res.json(user);
      })
      .catch(function(err) {
        console.log(err.message);
        res.status(500).json(err);
      })
  },

  login: function(req, res) {
    User.findOne({email: req.body.email})
      .then(function(user) {
        console.log(user);
        res.json(user);
      })
      .catch(function(err) {
        var message = {
          message: "Email doesn't exist"
        }
        console.log(message.message);
        res.status(500).json(message);
      })
  },

  getUsers: function(req, res) {
       User.find({})
        .then(function(user) {
          res.json(user)
        })
        .catch(function(err) {
          res.status(500).json(err);
        })
   },

   showUser: function(req, res) {
     User.find({ _id: req.params.id })
     .then(function(user) {
       res.json(user);
     })
     .catch(function(err) {
       res.status(500);
       res.json(err);
     });
   },

  delete: function (req, res) {
     User.remove({ _id: req.params.id })
     .then(function() {
       res.json(true);
     })
     .catch(function(err) {
       res.status(500);
       res.json(err);
     })
   }
}//End Module Exports
