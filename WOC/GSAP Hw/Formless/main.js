// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Header scroll animation
const header = document.getElementById('header')
let lastScroll = 0

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset

  if (currentScroll <= 0) {
    header.classList.remove('scroll-up')
    return
  }

  if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-up')
    header.classList.add('scroll-down')
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains('scroll-down')
  ) {
    header.classList.remove('scroll-down')
    header.classList.add('scroll-up')
  }

  lastScroll = currentScroll
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    })
  })
})

// Initialize GSAP animations
gsap.from('.fade-in-up', {
  y: 30,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.fade-in-up',
    start: 'top 80%',
  },
})
window.addEventListener('scroll', () => {
  const logoText = document.getElementById('logoText')
  const header = document.getElementById('header')

  if (window.scrollY > 50) {
    // Show "FORMLESS™" text when scrolling
    logoText.classList.remove('hidden', 'opacity-0')
    logoText.classList.add('opacity-100')
  } else {
    // Hide "FORMLESS™" text when at the top
    logoText.classList.remove('opacity-100')
    logoText.classList.add('opacity-0')
  }
})
