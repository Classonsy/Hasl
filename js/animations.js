gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Hero section animation
  gsap.from('.hero-content', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power3.out'
  });

  // Title decorations animation
  gsap.from('.title-decoration', {
    duration: 1,
    width: 0,
    ease: 'power3.out',
    stagger: 0.2
  });

  // Product cards animation on scroll
  gsap.from('.product-card', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.product-grid',
      start: 'top center+=100',
      toggleActions: 'play none none reverse'
    }
  });

  // Section titles animation
  gsap.from('.section-title', {
    duration: 1,
    y: 30,
    opacity: 0,
    scrollTrigger: {
      trigger: '.section-title',
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse'
    }
  });

  // Filter buttons animation
  gsap.from('.filter-button', {
    duration: 0.5,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.filters',
      start: 'top bottom-=50',
      toggleActions: 'play none none reverse'
    }
  });

  // Add to cart button animation
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      gsap.to(e.target, {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    });
  });

  // News cards animation
  gsap.from('.news-card', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.news-grid',
      start: 'top center+=100',
      toggleActions: 'play none none reverse'
    }
  });

  // News images hover effect
  const newsImages = document.querySelectorAll('.news-image');
  newsImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
      gsap.to(image.querySelector('img'), {
        scale: 1.1,
        duration: 0.3
      });
    });

    image.addEventListener('mouseleave', () => {
      gsap.to(image.querySelector('img'), {
        scale: 1,
        duration: 0.3
      });
    });
  });
});