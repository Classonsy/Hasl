class Cart {
  constructor() {
    this.items = [];
    this.loadFromLocalStorage();
    this.updateUI();
  }

  loadFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  addItem(product) {
    const existingItem = this.items.find(item => 
      item.id === product.id && 
      item.size === product.size && 
      item.color === product.color
    );

    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      this.items.push({
        ...product,
        quantity: product.quantity || 1
      });
    }

    this.saveToLocalStorage();
    this.updateUI();
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.saveToLocalStorage();
    this.updateUI();
  }

  updateQuantity(itemId, quantity) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(itemId);
      } else {
        item.quantity = quantity;
        this.saveToLocalStorage();
        this.updateUI();
      }
    }
  }

  clear() {
    this.items = [];
    this.saveToLocalStorage();
    this.updateUI();
  }

  getTotalAmount() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateUI() {
    // Update cart count
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Update cart container if on cart page
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      cartContainer.innerHTML = this.renderCart();
    }
  }

  renderCart() {
    if (this.items.length === 0) {
      return `<p class="empty-cart" data-translate="emptyCart">Корзина пуста</p>`;
    }

    return `
      <div class="cart-items">
        ${this.items.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
              <h3>${item.name}</h3>
              <p data-translate="size">Размер: ${item.size}</p>
              <p data-translate="color">Цвет: ${item.color}</p>
              <p data-translate="price">Цена: ${item.price} ₽</p>
              <div class="quantity-controls">
                <button onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
              </div>
              <button class="remove-item" onclick="cart.removeItem(${item.id})" data-translate="remove">Удалить</button>
            </div>
          </div>
        `).join('')}
        <div class="cart-total">
          <p data-translate="total">Итого: ${this.getTotalAmount()} ₽</p>
          <button class="checkout-button" data-translate="checkout">Оформить заказ</button>
        </div>
      </div>
    `;
  }
}

// Initialize cart
const cart = new Cart();

// Add event listeners to all add to cart buttons
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
      cart.addItem(product);
    });
  });
});