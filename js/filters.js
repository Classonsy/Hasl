document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-button');
  const products = document.querySelectorAll('.product-card');

  // Enhanced GSAP animations
  gsap.from(filterButtons, {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: "power3.out"
  });

  // Add hover effect
  filterButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      if (!button.classList.contains('active')) {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    button.addEventListener('mouseleave', () => {
      if (!button.classList.contains('active')) {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    button.addEventListener('click', () => {
      // Remove active class and scale from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        gsap.to(btn, {
          scale: 1,
          duration: 0.3
        });
      });

      // Add active class and scale to clicked button
      button.classList.add('active');
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3
      });

      const brand = button.getAttribute('data-brand');

      // Enhanced filtering animation
      const timeline = gsap.timeline();

      // Fade out non-matching items
      timeline.to(products, {
        duration: 0.4,
        opacity: 0,
        y: 20,
        stagger: 0.05,
        ease: "power2.inOut",
        onComplete: () => {
          products.forEach(product => {
            const productBrand = product.getAttribute('data-brand');
            if (brand === 'all' || productBrand === brand) {
              product.style.display = '';
            } else {
              product.style.display = 'none';
            }
          });
        }
      });

      // Fade in matching items
      timeline.to(products, {
        duration: 0.4,
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power2.out",
        filter: (target) => {
          const productBrand = target.getAttribute('data-brand');
          return brand === 'all' || productBrand === brand;
        }
      });
    });
  });

  // Add counter badges to filter buttons
  filterButtons.forEach(button => {
    const brand = button.getAttribute('data-brand');
    const count = brand === 'all' ? 
      products.length : 
      Array.from(products).filter(p => p.getAttribute('data-brand') === brand).length;
    
    const badge = document.createElement('span');
    badge.classList.add('filter-badge');
    badge.textContent = count;
    button.appendChild(badge);
  });
});