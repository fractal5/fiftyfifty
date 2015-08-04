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
      // d3 = $window.d3;

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

/*
     link: function(scope, elem, attrs){
           var exp = $parse(attrs.chartData);

           var salesDataToPlot=exp(scope);
           var padding = 20;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);

           scope.$watchCollection(exp, function(newVal, oldVal){
               salesDataToPlot=newVal;
               redrawLineChart();
           });

           function setChartParameters(){

               xScale = d3.scale.linear()
                   .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length-1].hour])
                   .range([padding + 5, rawSvg.attr("width") - padding]);

               yScale = d3.scale.linear()
                   .domain([0, d3.max(salesDataToPlot, function (d) {
                       return d.sales;
                   })])
                   .range([rawSvg.attr("height") - padding, 0]);

               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(salesDataToPlot.length - 1);

               yAxisGen = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(5);

               lineFun = d3.svg.line()
                   .x(function (d) {
                       return xScale(d.hour);
                   })
                   .y(function (d) {
                       return yScale(d.sales);
                   })
                   .interpolate("basis");
           }
         
         function drawLineChart() {

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0,180)")
                   .call(xAxisGen);

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(20,0)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(salesDataToPlot),
                       "stroke": "blue",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   });
           }

           function redrawLineChart() {

               setChartParameters();

               svg.selectAll("g.y.axis").call(yAxisGen);

               svg.selectAll("g.x.axis").call(xAxisGen);

               svg.selectAll("."+pathClass)
                   .attr({
                       d: lineFun(salesDataToPlot)
                   });
           }

           drawLineChart();
       }
   };
   */


  } // end of return block

  // return {
  //   link: link
  // };

}]);


