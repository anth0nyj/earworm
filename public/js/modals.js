$( () => {

  const $loginModal = $('.login-modal');
  const $login = $('.login');
  const $registerModal = $('.register-modal');
  const $register = $('.register');
  const $closeModal = $('.close-modal');
  const $postMenu = $('.post_menu');
  const $postBar = $('.post_bar');

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
    let clicks = $(this).data('clicks');
    if (clicks) {
    $postMenu.css('display', 'none');
    } else {
    $postMenu.css('display', 'flex');
    }
$(this).data("clicks", !clicks);
  }
  // const closeMeu = () => {
  //   $postMenu.css('display: none');
  // }

  $login.on('click', loginModal);
  $register.on('click', registerModal);
  $closeModal.on('click', closeBox);
  $postBar.on('click', openMenu);

});
