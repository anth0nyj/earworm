const app = angular.module('EarwormApp', ['ngRoute']);

app.controller('MainController', ['$http', function($http) {
  // auth functions
  this.registerUser = () => {
    $http({
      url: '/users', method: 'POST', data: this.newUserForm })
     .then(response => {
       console.log('Register successful!');
       this.user = response.data;
     }, ex => {
       console.log(ex.data.err);
       this.error = ex.statusText;
     })
     .catch(err => this.error = 'Server broke?' );
  };

  this.loginUser = () => {
    $http({
    url: '/session/login',
    method: 'post',
    data: this.loginForm })
        .then(response =>  {
          console.log('Log in successful!');
          this.user = response.data
        }, ex => {
          console.log(ex.data.err);
          this.error = ex.statusText;
        })
        .catch(err => this.error = 'Server broke?' );
  };

  this.logout = () => {
    $http({
      url: '/session/logout',
      method: "delete"
    }).then(response => {
      console.log("Logout successful");
      this.user = {};
    }, ex => {
      console.error(ex.data.err);
      this.error = ex.statusText;
    }).catch(err => this.error = "Server broke?");
  };

}]);

/////////


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
