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


      // var svg = d3.select(elem[0])
      //       .append('svg')
      //       .style('width', '100%');


      // Browser onresize event
      // window.onresize = function() {
      //   // scope.$apply();
      // };

      // Hardcoded data to play with for now ...
      // var spending =  [ 
      //     { payer: 'Alice', 'sum(`amount`)': 425 },
      //     { payer: 'Bob', 'sum(`amount`)': 3000 },
      //     { payer: 'Dan', 'sum(`amount`)': 500 },
      //     { payer: 'Kat', 'sum(`amount`)': 870 } 
      // ];

      // d3.select(".chart")
      //   .selectAll("div")
      //     // .data($scope.data.spending)
      //     .data(spending)
      //   .enter().append("div")
      //     .style("width", function(d) { return d['sum(`amount`)'] / 3 + "px"; })
      //     .text(function(d) { return (d.payer + ': ' + d['sum(`amount`)']); });

      // Watch for resize event
      // scope.$watch(function() {
      //   // return angular.element($window)[0].innerWidth;
      // }, function() {
      //   scope.render(scope.data);
      // });

      scope.$watch('data', function(newVals, oldVals) {
        return scope.render(newVals);
      }, true);


      scope.render = function(data) {
        // our custom d3 code
        if (!data) {
          return;
        }

        // EE: this render function hook up seems to be getting 
        // the correct data now
        console.log('spendingReport: render with data ', data);

        d3.select(".chart")
        .selectAll("div")
          // .data(data.spending)
          .data(data)
          // .data(spending)
          .enter().append("div")
          .style("width", function(d) { return d['sum(`amount`)'] / 3 + "px"; })
          .text(function(d) { return (d.payer + ': ' + d['sum(`amount`)']); });
        };
    }
  };
});


/*
// .directive('spendingReport', function($parse, $window, Expenses) {
.directive('spendingReport', ['Expenses', function(Expenses) {
  return {
    restrict: 'A',
    require: '^ngModel',
    scope: {
      ngModel: '='
    },
    // template: '<div ng-repeat >hello</div>'
    // template: "<svg width='850' height='200'></svg>",
    // template: '<div class="chart">{{ ngModel }}</div>',
    template: '<div class="chart"></div>',



    // controller: ['$scope', 'Expenses', function($scope, Expenses) {
    //   $scope.getPayerSpending = function(Expenses) {
    //     console.log('SpendingReportController: getSpending');

    //     Expenses.getSpending().then(function(spending) {
    //       $scope.spending = spending;
    //       console.log('SpendingReportController : getSpending, spending', 
    //         $scope.spending);
    //     })
    //     .catch(function(error) {
    //       console.error(error);
    //     });
    //   }
    // }],

    // link: function(scope, elem, attrs, ctrl){
    //   // scope.getPayerSpending();

    //   // XXX: seems like the scope.data.spending val doesn't get set
    //   // quickly enough ...
    //   console.log('spendingReport: link, data', scope[attrs.ngModel]);

    //   scope.$watch('data.spending', function(newVal) {
    //     if (newVal) {
    //       console.log('spendingReport $watch triggered');
    //     }
    //   });
    // },

    link: function(scope, elem, attrs){

      console.log('spendingReport attrs: ', attrs);
      console.log('spendingReport scope.data: ', scope.data);
      // console.log('spendingReport ngModel: ', ngModel);



     // var exp = $parse(attrs.chartData);
     //  var spendingDataToPlot = exp(scope);
     //  console.log('spendingDataToPlot: ', spendingDataToPlot);
      // console.log('spendingReport: scope ' + scope + ' d3 ' + d3);

      // Hardcoded data to play with for now ...
      var spending =  [ 
          { payer: 'Alice', 'sum(`amount`)': 425 },
          { payer: 'Bob', 'sum(`amount`)': 3000 },
          { payer: 'Dan', 'sum(`amount`)': 500 },
          { payer: 'Kat', 'sum(`amount`)': 870 } 
      ];

      d3.select(".chart")
        .selectAll("div")
          // .data($scope.data.spending)
          // .data(testD)
          .data(spending)
        .enter().append("div")
          .style("width", function(d) { return d['sum(`amount`)'] / 3 + "px"; })
          .text(function(d) { return (d.payer + ': ' + d['sum(`amount`)']); });
          // .style("width", function(d) { return d * 20 + "px"; })
          // .text(function(d) { return d; });
    }



  } // end of return block


}]);
*/


