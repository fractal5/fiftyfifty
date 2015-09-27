angular.module('fifty', [
  'fifty.services',
  'fifty.expenses',
  'fifty.reports',
  'fifty.categories',
  'fifty.auth',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/expenses', {
      templateUrl: 'app/expenses/expenses.html',
      controller: 'ExpensesController',
      authenticate: true,
    })
    .when('/reports', {
      templateUrl: 'app/expenses/reports.html',
      controller: 'ReportsController',
      authenticate: true,
    })
    .when('/categories', {
      templateUrl: 'app/expenses/categories.html',
      controller: 'CategoriesController',
      authenticate: true,
    })
    .otherwise({
      redirectTo: '/expenses'
    });
    
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // Look in local storage and find the user's token then add it 
  // to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.fifty');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // Listen for a request to change routes, then look for the token in 
  // localstorage and send that token to the server to see if it is a 
  // real user or hasn't expired if it's not valid, we then redirect 
  // back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/login');
    }
  });
});
