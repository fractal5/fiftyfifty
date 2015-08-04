angular.module('fifty.reports', [])

.controller('ReportsController', function ($scope, Expenses) {
  // Your code here

  $scope.data = {}; // spending per payer

  $scope.getSpending = function() {
    console.log('ReportsController: getSpending');

    Expenses.getSpending().then(function(spending) {
      $scope.data.spending = spending;
      console.log('ReportsController : getSpending, spending', 
        $scope.data.spending);
    })
    .catch(function(error) {
      console.error(error);
    });

  }

  $scope.getSpending();

});


