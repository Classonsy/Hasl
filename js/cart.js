// Cart singleton implementation
let cartInstance = null;

export class Cart {
  constructor() {
    if (cartInstance) {
      return cartInstance;
    }
    cartInstance = this;
    this.items = [];
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
    this.updateUI();
  }

  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.updateUI();
  }

  addItem(product) {
    const existingItem = this.items.find(item => 
      item.id === product.id && 
      item.name === product.name &&
      item.size === product.size && 
      item.color === product.color
    );

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.items.push({
        ...product,
        quantity: 1
      });
    }

    this.saveToLocalStorage();
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.saveToLocalStorage();
  }

  updateQuantity(itemId, quantity) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(itemId);
      } else {
        item.quantity = quantity;
        this.saveToLocalStorage();
      }
    }
  }

  clear() {
    this.items = [];
    this.saveToLocalStorage();
  }

  getTotalAmount() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateUI() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = this.items.reduce((total, item) => total + item.quantity, 0);
    }

    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      cartContainer.innerHTML = this.renderCart();
    }
  }

  renderCart() {
    if (this.items.length === 0) {
      return `
        <div class="empty-cart-container">
          <p class="empty-cart" data-translate="emptyCart">Корзина пуста</p>
          <a href="catalog.html" class="return-to-catalog">Перейти в каталог</a>
        </div>
      `;
    }

    return `
      <div class="cart-items">
        ${this.items.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
              <h3>${item.name}</h3>
              <div class="item-info">
                <p data-translate="size">Размер: ${item.size}</p>
                <p data-translate="color">Цвет: ${item.color}</p>
                <p class="item-price" data-translate="price">Цена: ${item.price} ₽</p>
              </div>
              <div class="quantity-controls">
                <button class="quantity-btn minus" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
              </div>
              <button class="remove-item" onclick="cart.removeItem(${item.id})" data-translate="remove">
                <svg viewBox="0 0 24 24" class="remove-icon">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                Удалить
              </button>
            </div>
          </div>
        `).join('')}
        <div class="cart-total">
          <p data-translate="total">Итого: ${this.getTotalAmount()} ₽</p>
          <a href="checkout.html" class="checkout-button" data-translate="checkout">
            <svg class="checkout-icon" viewBox="0 0 24 24">
              <path d="M9 20c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-9.8-3.2c0-.1.1-.2.2-.2h12.2c.1 0 .2.1.2.2v.8c0 .1-.1.2-.2.2H7.4c-.1 0-.2-.1-.2-.2v-.8zM19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12z"/>
            </svg>
            Оформить заказ
          </a>
        </div>
      </div>
    `;
  }
}

// Initialize cart singleton
const cart = new Cart();

// Make cart globally available
window.cart = cart;