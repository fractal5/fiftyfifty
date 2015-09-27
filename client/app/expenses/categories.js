angular.module('fifty.categories', [])

.controller('CategoriesController', function ($scope, Expenses) {

  $scope.data = {}; // spending per category 

  $scope.getCategories = function() {
    Expenses.getCategories().then(function(categories) {
      $scope.data = categories;
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

      scope.$watch('data', function(newVals, oldVals) {
        return scope.render(newVals);
      }, true);

      scope.render = function(data) {
        // Check if there are any values in data.
        var count = 0;
        for (var k in data) {
          count++;
        }
        if (count === 0) {
          return;
        }

        var width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

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

        };
    }
  }
});



