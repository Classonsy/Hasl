class CheckoutManager {
  constructor() {
    this.cart = new Cart();
  }

  async startCheckout() {
    if (!auth.isAuthenticated) {
      // Show login modal for unauthenticated users
      auth.showModal('login');
      return;
    }

    // Redirect to checkout page for authenticated users
    window.location.href = 'checkout.html';
  }
}

// Initialize checkout manager
const checkout = new CheckoutManager();
window.checkout = checkout;