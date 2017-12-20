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

  //FUNCTIONS
  const openLogin = () => {
    $loginMenu.slideToggle("slow");
  }
  const openRegister = () => {
    $registerMenu.slideToggle("slow");
  }
  const openMenu = () => {
    $postMenu.slideToggle("slow");
  }

  //HANDLERS
  $newPost.on('click', openMenu);
  $login.on('click', openLogin);
  $register.on('click', openRegister);

});
