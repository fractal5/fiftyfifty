// This Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('fifty.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.fifty', token);
        $location.path('/expenses');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.fifty', token);
        $location.path('/expenses');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
