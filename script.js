document.getElementById('year').textContent = new Date().getFullYear();

const profileFrame = document.querySelector('.profile-frame');
const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (profileFrame && supportsFinePointer && !prefersReducedMotion) {
  const resetProfileFrame = () => {
    profileFrame.style.setProperty('--tilt-x', '0deg');
    profileFrame.style.setProperty('--tilt-y', '0deg');
    profileFrame.classList.remove('is-tilting');
  };

  profileFrame.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
      return;
    }

    const bounds = profileFrame.getBoundingClientRect();
    if (!bounds.width || !bounds.height) {
      return;
    }

    const x = Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1);
    const y = Math.min(Math.max((event.clientY - bounds.top) / bounds.height, 0), 1);

    profileFrame.style.setProperty('--tilt-x', `${(0.5 - y) * 10}deg`);
    profileFrame.style.setProperty('--tilt-y', `${(x - 0.5) * 10}deg`);
    profileFrame.style.setProperty('--shine-x', `${x * 100}%`);
    profileFrame.style.setProperty('--shine-y', `${y * 100}%`);
    profileFrame.classList.add('is-tilting');
  });

  profileFrame.addEventListener('pointerleave', resetProfileFrame);
  profileFrame.addEventListener('pointercancel', resetProfileFrame);
}

const titleElements = document.querySelectorAll('.hero h1, .section-heading');
if (titleElements.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
  document.body.classList.add('has-title-motion');

  const titleObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  titleElements.forEach((title) => titleObserver.observe(title));
}

const certificatesSection = document.getElementById('certificates');
if (certificatesSection && !prefersReducedMotion && 'IntersectionObserver' in window) {
  const certificateCards = certificatesSection.querySelectorAll('.certificate-card');

  if (certificateCards.length) {
    certificatesSection.classList.add('has-cascade-motion');

    certificateCards.forEach((card, index) => {
      card.style.setProperty('--cascade-delay', `${index * 85}ms`);
    });

    const certificateObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    certificateCards.forEach((card) => certificateObserver.observe(card));
  }
}
