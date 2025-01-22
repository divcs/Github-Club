gsap.to('#box1', {
  x: 1200,
  duration: 2,
  delay: 1,
  rotate: 360,
  backgroundColor: 'blue',
  borderRadius: '50%',
  scale: 0.5,
})
gsap.from('#box2', { x: 1000, duration: 2, delay: 1 })

gsap.fromTo('#box2', { x: 1000, duration: 2, delay: 1 })

// stagger se sare h1 ko ek ek karke animate karega
gsap.from('h1', {
  opacity: 0,
  duration: 1,
  y: 30,
  delay: 0.2,
  stagger: 0.5,
})
