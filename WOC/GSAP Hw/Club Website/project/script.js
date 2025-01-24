// Initialize Lucide icons
lucide.createIcons();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
    navbar.classList.remove('scroll-up');
    navbar.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
    navbar.classList.remove('scroll-down');
    navbar.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

// Join button click animation
const joinButtons = document.querySelectorAll('.join-button');
joinButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.add('clicked');
    setTimeout(() => {
      this.classList.remove('clicked');
    }, 200);
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .event-card, .team-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Mobile menu toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-button';
mobileMenuButton.innerHTML = '<i data-lucide="menu"></i>';
document.querySelector('.navbar .container').insertBefore(mobileMenuButton, document.querySelector('.nav-links'));

const navLinks = document.querySelector('.nav-links');
mobileMenuButton.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuButton.classList.toggle('active');
});