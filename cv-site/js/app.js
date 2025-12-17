document.addEventListener('DOMContentLoaded', function() {
  /* ===================================
     MODE SOMBRE/CLAIR
     =================================== */
  
  // Restaurer la préférence sauvegardée
  const savedTheme = localStorage.getItem('site-theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  
  // Créer le bouton toggle
  const header = document.querySelector('.top-header');
  const topNav = document.querySelector('.top-nav');
  
  if (header && topNav) {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('type', 'button');
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    
    // Ajouter le bouton après la nav
    topNav.parentNode.insertBefore(themeToggle, topNav.nextSibling);
    
    // Gestionnaire du toggle
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('site-theme', isDarkMode ? 'dark' : 'light');
      themeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
      console.log(`🌓 Mode ${isDarkMode ? 'Sombre' : 'Clair'} activé`);
    });
  }

  /* ===================================
     NAVIGATION ACTIVE
     =================================== */
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
