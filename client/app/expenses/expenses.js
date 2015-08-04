angular.module('fifty.expenses', [])

.filter('dateFormat', ['$filter', function($filter) {
    return function(input, format) {
      return $filter('date')(new Date(input), format);
    };
  }
])
.controller('ExpensesController', function ($scope, Expenses) {
  // Your code here

  $scope.data = {};
  $scope.expense = {};

  $scope.getExpenses = function() {
    Expenses.getAll().then(function(expenses) {
      $scope.data.expenses = expenses;
    console.log('ExpensesController : getExpenses, expense[0].date', 
      $scope.data.expenses);
    })
    .catch(function(error) {
      console.error(error);
    });

  };

  $scope.getExpenses();

  $scope.addExpense = function () {
    Expenses.addExpense($scope.expense).then(function () {
      // XXX EE: load / display the new expense added
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  // $scope.getLinks = function () {
  //   Links.getAll()
  //     .then(function (links) {
  //       $scope.data.links = links;
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };
  // $scope.getLinks();
});


