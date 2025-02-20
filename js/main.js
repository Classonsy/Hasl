// Cart functionality
function addToCart(product) {
  cart.addItem(product); 
  updateCartUI();
}

function updateCartUI() {
  // Animation for cart update
  gsap.to('.cart-icon', {
    scale: 1.2,
    duration: 0.2,
    yoyo: true,
    repeat: 1
  });
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const product = {
        id: parseInt(card.dataset.productId), 
        name: card.querySelector('h3').textContent,
        price: parseFloat(card.querySelector('p').textContent.replace(/[^\d]/g, '')),
        image: card.querySelector('img').src,
        size: card.dataset.size || 'M', 
        color: card.dataset.color || 'Black' 
      };
      addToCart(product);
    });
  });
});