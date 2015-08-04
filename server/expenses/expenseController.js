var Expense = require('./expenseModel');
var Expenses = require('./expenseCollection');
var db = require('../config');
// var Q = require('q');
// var util = require('../config/utils.js');


module.exports = {
  // findUrl: function (req, res, next, code) {
  //   var findLink = Q.nbind(Link.findOne, Link);
  //   findLink({code: code})
  //     .then(function (link) {
  //       if (link) {
  //         req.navLink = link;
  //         next();
  //       } else {
  //         next(new Error('Link not added yet'));
  //       }
  //     })
  //     .fail(function (error) {
  //       next(error);
  //     });
  // },

  allExpenses: function (req, res, next) {
    console.log("ExpenseController : allExpenses");

    Expenses.reset().fetch().then(function(expenses) {
      res.send(200, expenses.models);
    })
    .catch(function(err) {
     console.log("ExpenseController : allExpenses error ", err);
      next(err);
    });
    // var findAll = Q.nbind(Link.find, Link);

    // findAll({})
    //   .then(function (links) {
    //     res.json(links);
    //   })
    //   .fail(function (error) {
    //     next(error);
    //   });
  },

  newExpense: function (req, res, next) {

    console.log('newExpense, req.user, ', req.user);

    // XXX EE: what error checking if any is needed?
    var userid = req.user.id;
    var date = req.body.date.slice(0, 10); //  2015-08-03T07:00:00.000Z
    var payee = req.body.payee;
    var amount = req.body.amount;
    var category = req.body.category;
    var payer = req.body.payer;

    console.log('newExpense: userid ' + userid + ' date ' + date 
                + ' payee ' + payee + ' amount ' + amount + 
                ' category ' + category + ' payer ' + payer);

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


  // Open Questions: 
  // - how much work to do here vs on the client?
  // - what format to return the data to the client?
  expensesPerPayer: function (req, res, next) {
    // Get the list of distinct payers for this user/group
    //  select distinct payer from expenses where userid = id
    //
    // For each payer, sum the amount that they paid.
    //  select *, sum(payer) from expenses wehre userid = id 
    //  and payer = currplayer
    //
    var userid = req.user.id;

    // db.knex('expenses').distinct('payer')
    //   .where('userid', userid).select().then(function(data) {
    //     // [ { payer: 'Alice' }, ... ]
    //     console.log('expensesPerPayer: unique payers', data); 
    //   });

    // select payer, sum(amount) from expenses 
    //   where userid = id 
    //   group by payer;

    // db.knex('expenses').groupBy('payer').where('userid', userid).
    //   sum('amount').select('payer').then(function(data) {
    //     console.log("expensesPerPayer: data");
    // });

    // expensesPerPayer: data  [ { 'sum(`amount`)': 425 },
    // { 'sum(`amount`)': 3000 },
    // { 'sum(`amount`)': 500 },
    // { 'sum(`amount`)': 570 } ]

    // expensesPerPayer: data  [ { payer: 'Alice', 'sum(`amount`)': 425 },
    // { payer: 'Bob', 'sum(`amount`)': 3000 },
    // { payer: 'Dan', 'sum(`amount`)': 500 },
    // { payer: 'Kat', 'sum(`amount`)': 570 } ]

    db.knex('expenses').groupBy('payer').where('userid', userid).select('payer').sum('amount').then(function(data) {
      console.log("expensesPerPayer: data ", data);
      res.send(200, data);
    })
    .catch(function(err) {
      next(err);
    });
  },

  // navToLink: function (req, res, next) {
  //   var link = req.navLink;
  //   link.visits++;
  //   link.save(function (err, savedLink) {
  //     if (err) {
  //       next(err);
  //     } else {
  //       res.redirect(savedLink.url);
  //     }
  //   });
  // }

};
