const eyes = document.querySelectorAll('.eye');

document.addEventListener('mousemove', (event) => {
  eyes.forEach((eye) => {
    const pupil = eye.querySelector('.pupil');
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);

    const pupilDistance = Math.min(eyeRect.width / 4, eyeRect.height / 4);
    const pupilX = pupilDistance * Math.cos(angle);
    const pupilY = pupilDistance * Math.sin(angle);

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  });
});
