// Use ES modules
import { Cart } from './cart.js';

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Remove existing listeners to prevent duplicates
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    // Remove old listeners first
    button.removeEventListener('click', handleAddToCart);
    
    // Create size selector if it doesn't exist
    const card = button.closest('.product-card');
    if (!card.querySelector('.size-selector-container')) {
      const sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
      const sizeContainer = document.createElement('div');
      sizeContainer.className = 'size-selector-container';
      sizeContainer.innerHTML = `
        <div class="size-label">Выберите размер:</div>
        <div class="size-options">
          ${sizes.map(size => `
            <label class="size-option">
              <input type="radio" name="size-${card.dataset.productId || Date.now()}" value="${size}">
              <span class="size-button">${size}</span>
            </label>
          `).join('')}
        </div>
      `;
      button.insertAdjacentElement('beforebegin', sizeContainer);
    }
    
    button.addEventListener('click', handleAddToCart, { once: true }); 
  });
});

function handleAddToCart(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const card = e.target.closest('.product-card');
  if (!card) return;
  
  const selectedSize = card.querySelector('input[type="radio"]:checked');
  
  if (!selectedSize) {
    alert('Пожалуйста, выберите размер');
    return;
  }
  
  const product = {
    id: parseInt(card.dataset.productId) || Date.now(),
    name: card.querySelector('h3').textContent,
    price: parseFloat(card.querySelector('p').textContent.replace(/[^\d]/g, '')),
    image: card.querySelector('img').src,
    size: selectedSize.value,
    color: card.dataset.color || 'Black'
  };
  
  const cart = new Cart();
  cart.addItem(product);
  
  // Visual feedback
  const button = e.target;
  button.textContent = 'Добавлено ✓';
  button.classList.add('added');
  
  setTimeout(() => {
    button.textContent = 'В корзину';
    button.classList.remove('added');
  }, 2000);
}