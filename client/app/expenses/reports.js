angular.module('fifty.reports', [])

.controller('ReportsController', function ($scope, Expenses) {
  $scope.data = {}; // spending per payer

  $scope.getSpending = function() {

    Expenses.getSpending().then(function(spending) {
      $scope.data.spending = spending;
    })
    .catch(function(error) {
      console.error(error);
    });

  };

  $scope.getSpending();
})

.directive('spendingReport', function($window) {
  return {
    restrict: 'A',
    scope: {
      data: '=' 
    },
    template: '<div class="chart"></div>',
    link: function(scope, elem, attrs) {
      var margin = parseInt(attrs.margin) || 20;
      var barHeight = parseInt(attrs.barHeight) || 20;
      var barPadding = parseInt(attrs.barPadding) || 5;

      scope.$watch('data', function(newVals, oldVals) {
        return scope.render(newVals);
      }, true);

      scope.render = function(data) {
        if (!data) {
          return;
        }

        d3.select(".chart")
        .selectAll("div")
          .data(data)
          .enter().append("div")
          .style("width", function(d) { return d['sum(`amount`)'] / 3 + "px"; })
          .text(function(d) { return (d.payer + ': ' + d['sum(`amount`)']); });
        };
    }
  };
});
