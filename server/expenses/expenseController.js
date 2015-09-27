var Expense = require('./expenseModel');
var Expenses = require('./expenseCollection');
var db = require('../config');


module.exports = {
  allExpenses: function (req, res, next) {
    Expenses.reset().fetch().then(function(expenses) {
      res.send(200, expenses.models);
    })
    .catch(function(err) {
      next(err);
    });
  },

  newExpense: function (req, res, next) {
    var userid = req.user.id;
    var date = req.body.date.slice(0, 10); //  2015-08-03T07:00:00.000Z
    var payee = req.body.payee;
    var amount = req.body.amount;
    var category = req.body.category;
    var payer = req.body.payer;

    var expense = new Expense({
      userid: userid,
      date: date,
      payee: payee,
      amount: amount,
      category: category,
      payer: payer
    });

    expense.save().then(function(newExpense) {
      Expenses.add(newExpense);
      res.send(200, newExpense);
    })
    .catch(function(err) {
      next(err);
    });
  },

  expensesPerPayer: function (req, res, next) {
    // Get the list of distinct payers for this user/group
    //  select distinct payer from expenses where userid = id
    //
    // For each payer, sum the amount that they paid.
    //  select *, sum(payer) from expenses wehre userid = id 
    //  and payer = currpayer
    var userid = req.user.id;

    db.knex('expenses').groupBy('payer').where('userid', userid).select('payer').sum('amount').then(function(data) {
      res.send(200, data);
    })
    .catch(function(err) {
      next(err);
    });
  },

  expensesByCategory: function (req, res, next) {
    var userid = req.user.id;

    db.knex('expenses').groupBy('category').where('userid', userid).select('category').sum('amount').then(function(data) {
      res.send(200, data);
    })
    .catch(function(err) {
      next(err);
    });
  },
};
