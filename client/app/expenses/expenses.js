angular.module('fifty.expenses', [])

.filter('dateFormat', ['$filter', function($filter) {
    return function(input, format) {
      return $filter('date')(new Date(input), format);
    };
  }
])
.controller('ExpensesController', function ($scope, Expenses) {
  $scope.data = {};
  $scope.expense = {};

  $scope.getExpenses = function() {
    Expenses.getAll().then(function(expenses) {
      $scope.data.expenses = expenses;
    })
    .catch(function(error) {
      console.error(error);
    });

  };

  $scope.getExpenses();

  $scope.addExpense = function () {
    Expenses.addExpense($scope.expense).then(function () {
      $scope.getExpenses();
    })
    .catch(function (error) {
      console.log(error);
    });
  };
});


