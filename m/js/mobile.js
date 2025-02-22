document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.querySelector('.side-menu');
  const closeMenu = document.querySelector('.close-menu');
  const menuOverlay = document.querySelector('.menu-overlay');

  function toggleMenu() {
    sideMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', toggleMenu);
  closeMenu.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', toggleMenu);
});