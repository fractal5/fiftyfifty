var userController = require('./userController');

module.exports = function (app) {
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
};
