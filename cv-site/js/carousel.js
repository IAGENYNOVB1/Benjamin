/* ===================================
   CARROUSEL DE PROJETS
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const carouselIndicators = document.getElementById('carouselIndicators');

  if (!carouselTrack) return; // Pas de carrousel sur cette page

  const slides = Array.from(carouselTrack.querySelectorAll('.carousel-slide'));
  const slideCount = slides.length;
  let currentIndex = 0;
  let autoPlayInterval;

  // Créer les indicateurs
  if (carouselIndicators) {
    for (let i = 0; i < slideCount; i++) {
      const indicator = document.createElement('button');
      indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
      indicator.setAttribute('data-index', i);
      indicator.setAttribute('aria-label', `Slide ${i + 1}`);
      indicator.addEventListener('click', () => goToSlide(i));
      carouselIndicators.appendChild(indicator);
    }
  }

  function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;

    // Mettre à jour les indicateurs
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });

    console.log(`📽️ Carrousel: slide ${currentIndex + 1}/${slideCount}`);
  }

  function goToSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    updateCarousel();
    resetAutoPlay();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 6000); // Changer slide tous les 6 secondes
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Événements des boutons
  if (carouselNext) carouselNext.addEventListener('click', nextSlide);
  if (carouselPrev) carouselPrev.addEventListener('click', prevSlide);

  // Clavier
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // Démarrer l'autoplay
  startAutoPlay();

  // Pause sur survol
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
  }

  console.log('🎬 Carrousel de projets initialisé');
});
