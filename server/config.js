var Bookshelf = require('bookshelf');
var path = require('path');

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });


// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('clicks').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('clicks', function (click) {
//       click.increments('id').primary();
//       click.integer('link_id');
//       click.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

/************************************************************/
// Add additional schema definitions below
/************************************************************/
var db = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'fiftydb',
    charset: 'utf8'
    // filename: path.join(__dirname, '/db/fifty.sqlite')
  }
});

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

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

      // XXX EE: Not sure we need the references etc calls
      // b/c we have 'belongsTo' + 'hasMany' calls in the models
      table.integer('userid');
        // .unsigned().references('id').inTable('users');
        // XXX EE: .onDelete( ... ).onUpdate( ... )

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

