var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'fiftydb',
    charset: 'utf8'
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('expenses').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('expenses', function (table) {
      table.increments('id').primary();
      table.integer('userid');
      table.date('date');
      table.string('payee', 100);
      table.decimal('amount', 9, 2);
      table.string('category', 100);
      table.string('payer', 100);
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;

