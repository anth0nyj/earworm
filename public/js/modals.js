$( () => {

  //LOGIN
  const $login = $('.login');
  const $loginMenu = $('.login-box');
  //REGISTER
  const $register = $('.register');
  const $registerMenu = $('.register-box');
  //NEW POST
  const $postMenu = $('.post_menu');
  const $postBar = $('.menu_bar');
  const $newPost = $('.new_post');
  //CLOSE
  const $loginClose = $('.login_close');
  const $regClose = $('.reg_close');
  const $newPostClose = $('.new_post_close');

  //FUNCTIONS
    //LOGIN
  const openLogin = () => {
    $loginMenu.slideToggle("slow")
  }
  const closeLogin = () => {
    $loginMenu.slideToggle("slow");
  }
    //REGISTER
  const openRegister = () => {
    $registerMenu.slideToggle("slow");
  }
  const closeReg = () => {
    $registerMenu.slideToggle("slow");
  }
    //NEW POST
  const openMenu = () => {
    $postMenu.slideToggle("slow");
  }
  const closeNewPost = () => {
    $postMenu.slideToggle("slow");
  }

  //HANDLERS
    //LOGIN
  $login.on('click', () => {
    let display = $('.register-box').css('display');
    if (display === "none") {
      openLogin();
    } else {
      closeReg();
      openLogin();
      }
  });
  $loginClose.on('click', closeLogin);
    //REGISTER
  $register.on('click', () => {
    let display = $('.login-box').css('display');
    if (display === "none") {
      openRegister();
    } else {
      closeLogin();
      openRegister();
    }
  });
  $regClose.on('click', closeReg);
    //NEW POST
  $newPost.on('click', openMenu);
  $newPostClose.on('click', closeNewPost);

});
