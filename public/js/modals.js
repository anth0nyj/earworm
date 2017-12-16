const app = angular.module('EarwormApp', ['ngRoute']);

app.controller('LoginController', function() {
})

app.controller('RegisterController', function() {
})

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  //enables push state
  $locationProvider.html5Mode({ enabled: true });

//ROUTES
$routeProvider.when('/login', {
  templateUrl: '../partials/login.html',
  controller: 'LoginController',
  controllerAs: 'ctrl'
});

$routeProvider.when('/register', {
  templateUrl: '../partials/register.html',
  controller: 'RegisterController',
  controllerAs: 'ctrl'
});

}]);
