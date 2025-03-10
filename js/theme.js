const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  }
  
  // Add animation for news cards in dark mode
  if (body.classList.contains('dark-theme')) {
    gsap.to('.news-card', {
      backgroundColor: 'var(--gray)',
      color: 'var(--white)',
      duration: 0.3
    });
  } else {
    gsap.to('.news-card', {
      backgroundColor: 'var(--white)', 
      color: 'var(--black)',
      duration: 0.3
    });
  }
});