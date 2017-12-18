$( () => {

  const $loginModal = $('.login-modal');
  const $login = $('.login');
  const $registerModal = $('.register-modal');
  const $register = $('.register');
  const $closeModal = $('.close-modal');

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

  $login.on('click', loginModal);
  $register.on('click', registerModal);
  $closeModal.on('click', closeBox);

});
