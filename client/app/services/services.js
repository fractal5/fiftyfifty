angular.module('fifty.services', [])

.factory('Expenses', function ($http) {
  var getAll = function () {
    console.log("Expenses.getAll");
    return $http({
      method: 'GET',
      url: '/api/expenses'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addExpense = function (expense) {
    console.log("Expenses.addExpense, ", expense);
    return $http({
      method: 'POST',
      url: '/api/expenses',
      data: expense
    });
  };

  var getSpending = function() {
    console.log("Expenses.getSpending");
    return $http({
      method: 'GET',
      url: '/api/expenses/reports'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getAll: getAll,
    addExpense: addExpense,
    getSpending: getSpending
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
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
