angular.module('fifty.services', [])

.factory('Expenses', function ($http) {
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/expenses'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addExpense = function (expense) {
    return $http({
      method: 'POST',
      url: '/api/expenses',
      data: expense
    });
  };

  var getSpending = function() {
    return $http({
      method: 'GET',
      url: '/api/expenses/reports'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getCategories = function() {
    return $http({
      method: 'GET',
      url: '/api/expenses/categories'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getAll: getAll,
    addExpense: addExpense,
    getSpending: getSpending,
    getCategories: getCategories
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Authenticates our user by exchanging the user's username 
  // and password for a JWT from the server. The JWT is then 
  // stored in localStorage as 'com.fifty'.
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.fifty');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.fifty');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
