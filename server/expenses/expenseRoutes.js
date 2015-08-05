var expenseController = require('./expenseController');

module.exports = function (app) {
  // app === linkRouter injected from middleware.js

  // app.param will hijack any request with a 'code' parameter on in
  // like line 16 below. That code will actually be the shortned url
  // so the real URL will be pre fetched from mongo and attached to
  // req.navLink before it reaches line 16.

  // XXX EE: need to flesh this out ...
  // app.param('code', linksController.findUrl);

  app.route('/')
    .get(expenseController.allExpenses)
    .post(expenseController.newExpense);

  // Route for req to get graph data
  // XXX EE: ideally should support parameters for 
  // specifiying time period, other search params.
  app.route('/reports')
    .get(expenseController.expensesPerPayer);

  app.route('/categories')
    .get(expenseController.expensesByCategory);

  // app.get('/:code', linksController.navToLink);

};
