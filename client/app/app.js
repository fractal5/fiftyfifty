angular.module('fifty', [
  'fifty.services',
  'fifty.expenses',
  'fifty.reports',
  'fifty.categories',
  // 'shortly.shorten',
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
    // .when('/shorten', {
    //   templateUrl: 'app/shorten/shorten.html',
    //   controller: 'ShortenController',
    //   authenticate: true,
    // })
    .otherwise({
      redirectTo: '/expenses'
    });
    
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      // console.log('attach tokens');
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
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/login');
    }
  });
});
