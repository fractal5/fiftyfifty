var db = require('../config');
var User = require('../users/userModel');

var Expense = db.Model.extend({
  tableName: 'expenses',
  hasTimestamps: true,
  defaults: {
    category: 'uncategorized'
  },
  user: function() {
    return this.belongsTo(User, 'userid');
  },
  // initialize: function(){
  // }
});

module.exports = Expense;