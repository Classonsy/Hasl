// Enhanced mobile detection and redirection
class MobileManager {
  constructor() {
    this.isMobile = this.checkMobile();
    this.init();
  }

  checkMobile() {
    return /Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  init() {
    // Check if we should redirect based on preferences and device
    if (this.isMobile && !localStorage.getItem('desktop_preference')) {
      if (!window.location.pathname.includes('/m/')) {
        window.location.href = this.getMobileUrl();
      }
    }

    // Add mobile switch button if not already present
    if (!document.querySelector('.mobile-switch')) {
      this.addMobileSwitchButton();
    }
  }

  getMobileUrl() {
    const currentUrl = window.location.href;
    const path = window.location.pathname;
    
    const mobilePathMap = {
      '/': '/m/index.html',
      '/index.html': '/m/index.html',
      '/catalog.html': '/m/catalog.html',
      '/about.html': '/m/about.html',
      '/cart.html': '/m/cart.html',
      '/news.html': '/m/news.html'  
    };

    return currentUrl.replace(path, mobilePathMap[path] || path.replace(/^\//, '/m/'));
  }

  getDesktopUrl() {
    return window.location.href.replace('/m/', '/');
  }

  addMobileSwitchButton() {
    const button = document.createElement('a');
    button.className = 'mobile-switch';
    button.innerHTML = `
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
      </svg>
      ${window.location.pathname.includes('/m/') ? 'Полная версия' : 'Мобильная версия'}
    `;
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.location.pathname.includes('/m/')) {
        localStorage.setItem('desktop_preference', 'true');
        window.location.href = this.getDesktopUrl();
      } else {
        localStorage.removeItem('desktop_preference');
        window.location.href = this.getMobileUrl();
      }
    });

    document.body.appendChild(button);
  }
}

// Initialize mobile manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileManager();
});