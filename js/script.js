/* APU SCHOLARS HUB*/

document.addEventListener('DOMContentLoaded', () => {

  //1. ACTIVE NAV LINK
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  //2. MOBILE HAMBURGER
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');
  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navUl.classList.toggle('open');
    });
    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navUl.classList.remove('open');
      });
    });
  }

  //3. HOME WELCOME TEXT FADE-IN
  const welcomeText = document.getElementById('welcome-text');
  if (welcomeText) {
    setTimeout(() => welcomeText.classList.add('visible'), 100);
  }

  //4. FAQ 
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = btn.nextElementSibling;
      const isOpen = answer.classList.contains('open');

      document.querySelectorAll('.faq-answer').forEach(a => {
        a.classList.remove('open');
        a.closest('.faq-item').classList.remove('open');
        const icon = a.previousElementSibling.querySelector('.faq-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        answer.classList.add('open');
        item.classList.add('open');
      }
    });
  });

  //5. CONTACT FORM VALIDATION
  const form = document.getElementById('contactin');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const fields = [
        { id: 'name',    errId: 'name-error',    msg: 'Please enter your name.' },
        { id: 'email',   errId: 'email-error',   msg: 'Please enter a valid email.' },
        { id: 'message', errId: 'message-error', msg: 'Please write a message.' },
      ];

      fields.forEach(f => {
        const input = document.getElementById(f.id);
        const errEl = document.getElementById(f.errId);
        if (!input) return;
        const val = input.value.trim();
        let fieldValid = val.length > 0;
        if (f.id === 'email' && fieldValid) {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        }
        if (!fieldValid) {
          input.classList.add('error');
          if (errEl) { errEl.textContent = f.msg; errEl.classList.add('visible'); }
          valid = false;
        } else {
          input.classList.remove('error');
          if (errEl) errEl.classList.remove('visible');
        }
      });

      if (valid) {
        const conf = document.getElementById('formconfirmation');
        if (conf) { conf.classList.add('visible'); conf.style.display = 'block'; }
        form.reset();
        setTimeout(() => {
          if (conf) { conf.classList.remove('visible'); conf.style.display = 'none'; }
        }, 5000);
      }
    });

    ['name', 'email', 'message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          el.classList.remove('error');
          const errEl = document.getElementById(`${id}-error`);
          if (errEl) errEl.classList.remove('visible');
        });
      }
    });
  }

  //6. RESOURCES SEARCH
  const searchbox = document.getElementById('searchbox');
  const suggBox   = document.getElementById('suggestion-box');

  if (searchbox && suggBox) {
    const resources = [
      'School Exclusive Content',
      'News & Happenings',
      'Tutorials & Guides',
      'Software & Apps',
      'Policies & Terms',
    ];

    searchbox.addEventListener('input', () => {
      const q = searchbox.value.trim().toLowerCase();
      suggBox.innerHTML = '';
      if (!q) { suggBox.classList.remove('visible'); return; }
      const matches = resources.filter(r => r.toLowerCase().includes(q));
      if (matches.length) {
        matches.forEach(m => {
          const li = document.createElement('li');
          li.textContent = m;
          li.addEventListener('click', () => {
            searchbox.value = m;
            suggBox.classList.remove('visible');
          });
          suggBox.appendChild(li);
        });
        suggBox.classList.add('visible');
      } else {
        suggBox.classList.remove('visible');
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchbox.contains(e.target) && !suggBox.contains(e.target)) {
        suggBox.classList.remove('visible');
      }
    });
  }

  //7. GALLERY LIGHTBOX
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

});