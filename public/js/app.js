const app = angular.module('EarwormApp', ['ngRoute']);

app.controller('MainController', ['$http', function($http) {
  this.allPosts = [];
  this.post = {};
  this.loggedInUser = {};
  this.allUsers = [];
  this.onePost = {};
  this.deleteToggled = true;
  this.currentPost = {};
  this.allComments = [];

  // Show Posts Function
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

  // Initial Show Posts Call
  this.getAllPosts();

  this.getPostComments = (post) => {
    this.onePost.comments = post.commentsOnOnePost;
  }

  //  Show One Post
  this.getOne = (post) => {
    $http({
      url: "/posts/" + post._id,
      method: "get"
    }).then(response => {
      this.onePost = response.data.onePost;
      this.getPostComments(response.data)
      // console.log(this.onePost);
    }, ex => {
      console.error(ex.data.err);
      this.error = ex.statusText;
    }).catch(err => this.error = "Server broke?");
  };

  // Get All Users
  this.getAllUsers = () => {
    $http({
      url: "/users", method: "get"
    }).then(response => {
      this.allUsers = response.data.users;
    }, ex => {
      console.error(ex.data.err);
      this.error = ex.statusText;
    }).catch(err => this.error = "Server broke?");
  };

  this.getAllUsers();

  this.getUser = (user) => {
    $http({
      url: "/users/profile/" + user._id,
      method: "get"
    }).then(response => {
      console.log(response.data);
    }, ex => {
      console.error(ex.data.err);
    }).catch(err => console.error("Catch: ", err));
  }

  // Auth Functions

  // Register
  this.registerUser = () => {
    $http({
      url: '/users', method: 'POST', data: this.newUserForm })
     .then(response => {
       console.log('Register successful!');
       this.user = response.data;
       this.loggedInUser = this.user;
     }, ex => {
       console.log(ex.data.err);
       this.error = ex.statusText;
     })
     .catch(err => this.error = 'Server broke?' );
  };

  // Log In
  this.loginUser = () => {
    $http({
      url: '/session/login',
      method: 'post',
      data: this.loginForm
    }).then(response =>  {
      console.log('Log in successful!');
      this.user = response.data.user;
      // console.log(this.user);
      this.loggedInUser = this.user;
      // console.log(this.loggedInUser);
    }, ex => {
      console.log(ex.data.err);
      this.error = ex.statusText;
    }).catch(err => this.error = 'Server broke?' );
  };

  // Log Out
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

  // Post CRUD Functions

  // Create Post
  this.processForm = (currentUser) => {
    console.log('The logged in user is: ', currentUser);
    $http({
      url: '/posts',
      method: 'post',
      data: {
        artist: this.formData.artist,
        songTitle: this.formData.songTitle,
        url: this.formData.url,
        tag: this.formData.tag,
        user: currentUser
      }
    }).then(response => {
      console.log("Form Data (Then): ", this.formData);
      console.log("New post successful!");
      this.post = response.data;
      console.log(this.post);
      this.allPosts.push(this.post);
      this.getAllPosts();
      this.formData = null;
    }, ex => {
      console.error(ex.data.err);
      console.log("Form Data (Ex): ", this.formData);
      this.error = ex.statusText;
    }).catch(err => this.error = "Server broke?");
  }

  // Toggle Delete Button / Return Link
  this.deleteToggle = () => {
    this.deleteToggled = !this.deleteToggled;
  }

  // Delete Post From Show Page
  this.deleteOnePost = (id) => {
    // console.log(id);
    $http({
      url: "/posts/" + id,
      method: "DELETE"
    }).then(response => {
      console.log("Post deleted");
      const postIndex = this.allPosts.findIndex(post => post._id === id._id);
      this.allPosts.splice(postIndex, 1);
      this.deleteToggle();
    }, ex => {
      console.error(ex.data.err);
      this.error = ex.statusText;
    }).catch(err => this.error = "Server broke?");
  }

  // Toggle Edit Button/Edit Form
  this.showOneEdit = () => {
    this.editData = {};
    this.showOneForm = !this.showOneForm;
  }

  // Edit Post
  this.editOnePost = (post) => {
    $http({
      method: "put",
      url: "/posts/" + post._id,
      data: this.formData
    }).then(response => {
      this.post = response.data;
      this.getOne(this.post);
      this.showOneEdit();
      this.getAllPosts();
    }, error => {
      console.error(error);
    }).catch(err => console.error("Catch: ", err));
  }

  this.addComment = (post, user) => {
    console.log("addComment triggered");
    $http({
      url: "/comments",
      method: "post",
      data: {
        content: this.formData.content,
        user: this.user,
        post: this.onePost
      }
    }).then(response => {
      // console.log(response.data);
      this.comment = response.data;
      this.allComments.push(this.comment);
      // console.log("comment: ", this.comment);
      // console.log("allComments: ", this.allComments);
      this.getOne(this.onePost);
    }, error => {
      console.error(error);
    }).catch(err => console.error("Catch: ", err));
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

  $routeProvider.when("/users", {
    templateUrl: "../partials/users.html"
  })

  $routeProvider.when("/one_post/", {
    templateUrl: "../partials/show_one_post.html"
  })

  $routeProvider.when("/user", {
    templateUrl: "../partials/one_user.html"
  })

}]);
