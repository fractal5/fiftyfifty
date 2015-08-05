angular.module('fifty.categories', [])

.controller('CategoriesController', function ($scope, Expenses) {

  $scope.data = {}; // spending per category 

  $scope.getCategories = function() {
    console.log('CategoriesController: getCategories');

    Expenses.getCategories().then(function(categories) {
      $scope.data = categories;
      console.log('CategoriesController : getCategories, categories ', 
        $scope.data);
    })
    .catch(function(error) {
      console.error(error);
    });

  };

  $scope.getCategories();

})

.directive('categoryReport', function($window) {
  return {
    restrict: 'A',
    scope: {
      data: '=' 
    },
    template: '<div class="chart"></div>',
    link: function(scope, elem, attrs) {

      // Hardcoded data to play with for now ...
      var categories = [ 
          { category: 'Entertainment', 'sum(`amount`)': 500 },
          { category: 'Food', 'sum(`amount`)': 350 },
          { category: 'Games', 'sum(`amount`)': 800 },
          { category: 'Rent', 'sum(`amount`)': 3000 },
          { category: 'Utilities', 'sum(`amount`)': 145 } 
      ];

      // d3.select(".chart")
      //   .selectAll("div")
      //     // .data($scope.data.spending)
      //     .data(spending)
      //   .enter().append("div")
      //     .style("width", function(d) { return d['sum(`amount`)'] / 3 + "px"; })
      //     .text(function(d) { return (d.payer + ': ' + d['sum(`amount`)']); });


      scope.$watch('data', function(newVals, oldVals) {
        return scope.render(newVals);
      }, true);


      scope.render = function(data) {
        // our custom d3 code

        // looks like just checking if data is ! is not sufficient
        // if (!data) {
        //   return;
        // }
        var count = 0;
        for (var k in data) {
          count++;
        }
        if (count === 0) {
          return;
        }
        console.log('categoriesReport: render with data ', data);

        var width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
            // .range(["#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a"]);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d['sum(`amount`)']; });

        var svg = d3.select(".chart").append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // d3.csv("data.csv", function(error, data) {

          // data.forEach(function(d) {
          //   d.population = +d.population;
          // });
          for (var i = 0; i < data.length; i++) {
            data[i]['sum(`amount`)'] = +data[i]['sum(`amount`)'];
          }

          var g = svg.selectAll(".arc")
              .data(pie(data))
            .enter().append("g")
              .attr("class", "arc");

          g.append("path")
              .attr("d", arc)
              .style("fill", function(d) { return color(d.data.category); });

          g.append("text")
              .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style("text-anchor", "middle")
              .text(function(d) { return d.data.category; });

        // });


    //     // EE: this render function hook up seems to be getting 
    //     // the correct data now
    //     console.log('spendingReport: render with data ', data);

    //     d3.select(".chart")
    //     .selectAll("div")
    //       // .data(data.spending)
    //       .data(data)
    //       // .data(spending)
    //       .enter().append("div")
    //       .style("width", function(d) { return d['sum(`amount`)'] / 3 + "px"; })
    //       .text(function(d) { return (d.payer + ': ' + d['sum(`amount`)']); });
        }; // end scope.render

        // scope.render(categories);
    } // end link
  } // end return
}); // end directive


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


