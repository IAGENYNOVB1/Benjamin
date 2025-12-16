document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (currentPath.includes(linkHref)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  const elementsToAnimate = document.querySelectorAll('.langue-card, .projet-card, .loisir-card, .emploi-card');
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Récupérer l'ID de la cible
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  const cards = document.querySelectorAll('.skill-item, .projet-card, .loisir-card, .langue-card, .emploi-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  console.log('🚀 Site CV chargé avec succès !');
});
