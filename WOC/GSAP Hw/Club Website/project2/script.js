// Initialize mouse position variables
document.documentElement.style.setProperty('--mouse-x', '50%');
document.documentElement.style.setProperty('--mouse-y', '50%');

// Track mouse movement for the gradient effect
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  
  document.documentElement.style.setProperty('--mouse-x', `${x}%`);
  document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

// Create animated background elements
const animatedBg = document.getElementById('animated-bg');
const numberOfLines = 20;

for (let i = 0; i < numberOfLines; i++) {
  const line = document.createElement('div');
  line.className = 'animated-line';
  line.style.cssText = `
    position: absolute;
    width: 1px;
    height: 32vh;
    background: linear-gradient(to bottom, rgba(34, 211, 238, 0.5), transparent);
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    animation: fall 10s linear infinite;
    animation-delay: ${Math.random() * 2}s;
  `;
  animatedBg.appendChild(line);
}

// Add scroll reveal effect for feature cards
const cards = document.querySelectorAll('.feature-card');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(card);
});