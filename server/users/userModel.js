var db = require('../config');
var Expense = require('../expenses/expenseModel');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  expenses: function() {
    return this.hasMany(Expense);
  },
  initialize: function(){
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    
    return cipher(this.get('password'), null, null)
      .bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});

module.exports = User;

