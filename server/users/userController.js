var User = require('./userModel');
var jwt = require('jwt-simple');

module.exports = {
  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    new User({ username: username }).fetch().then(function(user) {
      if (!user) {
        next(new Error('User does not exist'));
      } else { 
        user.comparePassword(password, function(match) {
          if (match) {
            var token = jwt.encode(user, 'secret');
            res.json({token: token});
          } else {
            next(new Error('No user'));
          }
        });
      }
    });
  },

  signup: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    new User({ username: username }).fetch().then(function(user) {
      if (user) {
        next(new Error('User already exist!'));
      } else {
        var newUser = new User({
          username: username,
          password: password
        });

        newUser.save().then(function(savedUser) {
          var token = jwt.encode(savedUser, 'secret');
          res.json({token: token});
        });
      } 
    });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which ends up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');

      new User({ username: user.username }).fetch().then(function(user) {
        if (user) {
          res.send(200);
        } else {
          res.send(401);
        }
      });
    }
  }

};
