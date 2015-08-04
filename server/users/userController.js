var User = require('./userModel');
var jwt = require('jwt-simple');

module.exports = {
  //
  // XXX EE: I switched from promises to callbacks -- ok?
  //
  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    new User({ username: username }).fetch().then(function(user) {
      if (!user) {
        // XXX EE: this is the Bookshelf version.
        // res.redirect('/login');

        console.log('User login: user does not exist');
        next(new Error('User does not exist'));
      } else { 
        user.comparePassword(password, function(match) {
          if (match) {
            console.log('User login: success!');
            var token = jwt.encode(user, 'secret');
            res.json({token: token});
          } else {
            // XXX EE: this is the Bookshelf version.
            // res.redirect('/login')

            // XXX EE: removed a return stmt ... believe ok.
            console.log('User login: password does not match');
            next(new Error('No user'));
          }
        });
      }
    });
    // XXX EE: need a catch?
    // .fail(function (error) {
    //   next(error);
    // });
  },

  signup: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    new User({ username: username }).fetch().then(function(user) {
      if (user) {
        // XXX EE: this is the Bookshelf version.
        // console.log('Account already exists');
        // res.redirect('/signup');

        console.log('User signup: user already exists, ', user);
        next(new Error('User already exist!'));
      } else {
        var newUser = new User({
          username: username,
          password: password
        });

        // XXX EE: save to collection?
        // Solution never saves to Users collection.
        newUser.save().then(function(savedUser) {
          console.log('User signup: new user saved, ', savedUser);
          var token = jwt.encode(savedUser, 'secret');
          res.json({token: token});
        });
      } 
    });
    // XXX EE: need a catch?
    // .fail(function (error) {
    //   next(error);
    // });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      console.log('User checkAuth: no token.');
      next(new Error('No token'));
    } else {
      console.log('User checkAuth: token found.');
      var user = jwt.decode(token, 'secret');

      new User({ username: user.username }).fetch().then(function(user) {
        if (user) {
          res.send(200);
        } else {
          res.send(401);
        }
      });
      // XXX EE: need a catch?
      // .fail(function (error) {
      //   next(error);
      // });
    }
  }

};
