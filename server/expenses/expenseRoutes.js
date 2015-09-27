var expenseController = require('./expenseController');

module.exports = function (app) {
  app.route('/')
    .get(expenseController.allExpenses)
    .post(expenseController.newExpense);

  // Route for req to get graph data
  app.route('/reports')
    .get(expenseController.expensesPerPayer);

  app.route('/categories')
    .get(expenseController.expensesByCategory);

};
