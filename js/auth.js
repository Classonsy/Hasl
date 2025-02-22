class AuthManager {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
    this.init();
  }

  init() {
    this.checkAuth();
    this.initModals();
    this.initListeners();
  }

  checkAuth() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.isAuthenticated = true;
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  initModals() {
    const modalsHTML = `
      <div id="auth-modals">
        <div id="login-modal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Вход</h2>
            <form id="login-form">
              <input type="email" placeholder="Email" required>
              <input type="password" placeholder="Пароль" required>
              <button type="submit">Войти</button>
            </form>
            <p>Нет аккаунта? <a href="#" class="switch-modal" data-target="register">Зарегистрироваться</a></p>
          </div>
        </div>

        <div id="register-modal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Регистрация</h2>
            <form id="register-form">
              <input type="text" placeholder="Имя" required>
              <input type="email" placeholder="Email" required>
              <input type="password" placeholder="Пароль" required>
              <input type="password" placeholder="Подтвердите пароль" required>
              <button type="submit">Зарегистрироваться</button>
            </form>
            <p>Уже есть аккаунт? <a href="#" class="switch-modal" data-target="login">Войти</a></p>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalsHTML);
  }

  initListeners() {
    // Modal controls
    document.querySelectorAll('.close').forEach(btn => {
      btn.onclick = () => this.closeModals();
    });

    document.querySelectorAll('.switch-modal').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        this.switchModal(link.dataset.target);
      };
    });

    // Form submissions
    document.getElementById('login-form').onsubmit = (e) => {
      e.preventDefault();
      this.login(new FormData(e.target));
    };

    document.getElementById('register-form').onsubmit = (e) => {
      e.preventDefault();
      this.register(new FormData(e.target));
    };

    // Close modals when clicking outside
    window.onclick = (e) => {
      if (e.target.classList.contains('modal')) {
        this.closeModals();
      }
    };
  }

  showModal(type) {
    this.closeModals();
    document.getElementById(`${type}-modal`).style.display = 'block';
    gsap.from(`#${type}-modal .modal-content`, {
      duration: 0.5,
      y: -50,
      opacity: 0,
      ease: "power2.out"
    });
  }

  closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.style.display = 'none';
    });
  }

  switchModal(type) {
    this.showModal(type);
  }

  async login(formData) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.isAuthenticated = true;
      this.user = {
        name: formData.get('email'),
        email: formData.get('email')
      };
      
      localStorage.setItem('auth_token', 'demo_token');
      localStorage.setItem('user', JSON.stringify(this.user));
      
      this.closeModals();
      this.updateUI();
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async register(formData) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.login(formData);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.updateUI();
  }

  updateUI() {
    const authBtn = document.getElementById('auth-button');
    if (authBtn) {
      authBtn.textContent = this.isAuthenticated ? 'Выйти' : 'Войти';
    }
  }
}

// Initialize auth manager
const auth = new AuthManager();
window.auth = auth;