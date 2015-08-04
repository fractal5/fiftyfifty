var db = require('../config');
var Expense = require('./expenseModel');

var Expenses = new db.Collection();

Expenses.model = Expense;

module.exports = Expenses;