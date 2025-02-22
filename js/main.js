// Use ES modules
import { Cart } from './cart.js';

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Remove existing listeners to prevent duplicates
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    // Remove old listeners first
    button.removeEventListener('click', handleAddToCart);
    button.addEventListener('click', handleAddToCart, { once: true }); // Add once:true to prevent multiple triggers
  });
});

function handleAddToCart(e) {
  e.preventDefault(); // Prevent any default behavior
  e.stopPropagation(); // Stop event propagation
  
  const card = e.target.closest('.product-card');
  if (!card) return;
  
  const product = {
    id: parseInt(card.dataset.productId) || Date.now(), // Fallback for demo
    name: card.querySelector('h3').textContent,
    price: parseFloat(card.querySelector('p').textContent.replace(/[^\d]/g, '')),
    image: card.querySelector('img').src,
    size: card.dataset.size || 'M',
    color: card.dataset.color || 'Black'
  };
  
  const cart = new Cart();
  cart.addItem(product);
}