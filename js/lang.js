// Language translations object - expanded with more translations
const translations = {
  ru: {
    home: "Главная",
    catalog: "Каталог",
    about: "О нас",
    cart: "Корзина",
    emptyCart: "Корзина пуста",
    total: "Итого",
    checkout: "Оформить заказ",
    remove: "Удалить",
    size: "Размер",
    color: "Цвет",
    quantity: "Количество",
    price: "Цена",
    addToCart: "В корзину",
    popularModels: "Популярные модели",
    viewAll: "Посмотреть все",
    findStyle: "Найди свой стиль",
    collection: "Коллекция эксклюзивных кроссовок",
    contacts: "Контакты",
    email: "Email",
    phone: "Телефон",
    news: "Новости",
  },
  en: {
    home: "Home",
    catalog: "Catalog",
    about: "About",
    cart: "Cart",
    emptyCart: "Cart is empty",
    total: "Total",
    checkout: "Checkout",
    remove: "Remove",
    size: "Size",
    color: "Color",
    quantity: "Quantity",
    price: "Price",
    addToCart: "Add to Cart",
    popularModels: "Popular Models",
    viewAll: "View All",
    findStyle: "Find Your Style",
    collection: "Exclusive Sneakers Collection",
    contacts: "Contacts",
    email: "Email",
    phone: "Phone",
    news: "News",
  }
};

// Language state management
class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('lang') || 'ru';
    this.init();
  }

  init() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.textContent = this.currentLang.toUpperCase();
      langToggle.addEventListener('click', () => this.toggleLanguage());
    }
    this.translatePage();
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', this.currentLang);
    document.getElementById('lang-toggle').textContent = this.currentLang.toUpperCase();
    this.translatePage();
  }

  translatePage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[this.currentLang][key]) {
        element.textContent = translations[this.currentLang][key];
      }
    });
  }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LanguageManager();
});