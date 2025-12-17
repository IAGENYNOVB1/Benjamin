/* ===================================
   FORMULAIRE DE CONTACT - VALIDATION
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;

  // Validation en temps réel
  const inputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
  };

  const errors = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    subject: document.getElementById('subjectError'),
    message: document.getElementById('messageError')
  };

  // Validation du nom
  if (inputs.name) {
    inputs.name.addEventListener('blur', function() {
      if (this.value.trim().length < 2) {
        errors.name.textContent = '❌ Le nom doit contenir au moins 2 caractères';
        this.classList.add('error');
      } else {
        errors.name.textContent = '✅';
        this.classList.remove('error');
      }
    });
  }

  // Validation de l'email
  if (inputs.email) {
    inputs.email.addEventListener('blur', function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value)) {
        errors.email.textContent = '❌ Email invalide';
        this.classList.add('error');
      } else {
        errors.email.textContent = '✅';
        this.classList.remove('error');
      }
    });
  }

  // Validation du sujet
  if (inputs.subject) {
    inputs.subject.addEventListener('blur', function() {
      if (this.value.trim().length < 3) {
        errors.subject.textContent = '❌ Le sujet doit contenir au moins 3 caractères';
        this.classList.add('error');
      } else {
        errors.subject.textContent = '✅';
        this.classList.remove('error');
      }
    });
  }

  // Validation du message
  if (inputs.message) {
    inputs.message.addEventListener('blur', function() {
      if (this.value.trim().length < 10) {
        errors.message.textContent = '❌ Le message doit contenir au moins 10 caractères';
        this.classList.add('error');
      } else {
        errors.message.textContent = '✅';
        this.classList.remove('error');
      }
    });
  }

  // Soumission du formulaire
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const feedback = document.getElementById('formFeedback');

    // Vérifier que tous les champs sont valides
    let isValid = true;
    for (let field in inputs) {
      if (!inputs[field].value.trim()) {
        isValid = false;
        errors[field].textContent = '❌ Ce champ est obligatoire';
        inputs[field].classList.add('error');
      }
    }

    if (!isValid) {
      feedback.className = 'form-feedback error';
      feedback.textContent = '⚠️ Veuillez corriger les erreurs avant d\'envoyer.';
      return;
    }

    // Envoi du formulaire
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = '📤 Envoi en cours...';

    try {
      // Utiliser FormSubmit pour envoyer l'email
      const formData = new FormData();
      formData.append('name', inputs.name.value);
      formData.append('email', inputs.email.value);
      formData.append('subject', inputs.subject.value);
      formData.append('message', inputs.message.value);

      // Envoyer via FormSubmit (service gratuit)
      const response = await fetch('https://formsubmit.co/benjamin@lemoine.cloud', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Message de succès
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `✅ <strong>Message envoyé avec succès !</strong><br>Je vous répondrai sous peu.`;

        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Réinitialiser les messages d'erreur
        for (let field in errors) {
          errors[field].textContent = '';
          inputs[field].classList.remove('error');
        }

        // Remet le bouton
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer le message';

        // Masquer le message après 5 secondes
        setTimeout(() => {
          feedback.textContent = '';
          feedback.className = 'form-feedback';
        }, 5000);

        console.log('✅ Email envoyé avec succès à benjamin@lemoine.cloud');
      } else {
        throw new Error('Erreur serveur');
      }
    } catch (error) {
      feedback.className = 'form-feedback error';
      feedback.textContent = '❌ Erreur lors de l\'envoi. Veuillez réessayer.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
      console.error('Erreur:', error);
    }
  });

  console.log('🚀 Script de contact chargé');
});
