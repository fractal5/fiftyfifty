var userController = require('./userController');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/login', userController.login);
  app.post('/signup', userController.signup);

  // XXX EE: not clear how this was utilized.
  // 'signedin' not referenced in any other files.
  app.get('/signedin', userController.checkAuth);
};
