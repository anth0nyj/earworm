// auth functions
this.registerUser = () => {
  $http({ url: '/users', method: 'post', data: this.newUserForm })
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
  $http({ url: '/sessions/login', method: 'post', data: this.loginForm })
      .then(response =>  {
        console.log('Log in successful!');
        this.user = response.data
      }, ex => {
        console.log(ex.data.err);
        this.error = ex.statusText;
      })
      .catch(err => this.error = 'Server broke?' );
};
