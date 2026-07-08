document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
    navToggle.classList.toggle('active');

  });
});
const openOverlay = document.querySelector('.cta-button');
const overlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('#quote-modal');
const closeOverlay = document.querySelector('.modal-close');

openOverlay.addEventListener('click', () =>{
  overlay.classList.add('active')
});

closeOverlay.addEventListener('click', () =>{
  overlay.classList.remove('active');
});

overlay.addEventListener('click', (event) =>{
  if (event.target === overlay) {
    overlay.classList.remove('active')
    
  }
});
document.addEventListener('keydown' ,(event) =>{
  if (event.key === 'Escape' ) {
    overlay.classList.remove('active');
    
  }
});

