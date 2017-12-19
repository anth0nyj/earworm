$( () => {

  const $loginModal = $('.login-modal');
  const $login = $('.login');
  const $registerModal = $('.register-modal');
  const $register = $('.register');
  const $closeModal = $('.close-modal');
  const $postMenu = $('.post_menu');
  const $postBar = $('.post_bar');
  const $newPost = $('.new_post');

  const loginModal = () => {
    $loginModal.css('display', 'block');
  }
  const registerModal = () => {
    $registerModal.css('display', 'block');
  }
  const closeBox = () => {
    $loginModal.css('display', 'none');
    $registerModal.css('display', 'none');
  }
  const openMenu = () => {
    $postMenu.slideToggle("slow");
  }

  $login.on('click', loginModal);
  $register.on('click', registerModal);
  $closeModal.on('click', closeBox);
  $newPost.on('click', openMenu);
});
