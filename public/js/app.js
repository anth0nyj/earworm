const app = angular.module('EarwormApp', ['ngRoute']);

app.controller('MainController', ['$http', function($http) {
  this.allPosts = [];
  this.post = {};

  this.getAllPosts = () => {
    $http({
      url: "/posts", method: "get"
    }).then(response => {
      this.allPosts = response.data;
    }, ex => {
      console.error(ex.data.err);
      this.error = ex.statusText;
    }).catch(err => this.error = "Server broke?");
  };

  this.getAllPosts();

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
          this.user = response.data.user;
          console.log(this.user);
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

  this.processForm = () => {
    $http({
      url: '/posts',
      method: 'post',
      data: this.formData
    }).then(response => {
      console.log("Form Data (Then): ", this.formData);
      console.log("New post successful!");
      this.posts.push(response.data);
      this.getAllPosts();
      this.formData = null;
    }, ex => {
      console.error(ex.data.err);
      console.log("Form Data (Ex): ", this.formData);
      this.error = ex.statusText;
    }).catch(err => this.error = "Server broke?");
  }

  this.deletePost = (postToDelete) => {
    $http({
      url: "/posts/" + postToDelete._id,
      method: "delete",
    }).then(response => {
      console.log("Post deleted");
      const postIndex = this.posts.findIndex(post => post._id === postToDelete._id);
      this.posts.splice(postIndex, 1);
    }, ex => {
      console.error(ex.data.err);
      this.error = ex.statusText;
    }).catch(err => this.error = "Server broke?");
  }

}]); //ends

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
$locationProvider.html5Mode({ enabled: true });
  $routeProvider.when("/profile", {
      templateUrl: "../partials/profile.html"
  })

  $routeProvider.when("/", {
      templateUrl: "../partials/home.html"
  })


}]);
