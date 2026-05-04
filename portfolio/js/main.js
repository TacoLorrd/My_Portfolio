/* =============================================
   MAIN.JS — Portfolio
   - Mobile nav toggle
   - Active nav link highlight
   - Contact form client-side validation
   - Scroll-triggered fade-in
   ============================================= */

/* ---- Mobile Nav Toggle ---- */
function toggleNav() {
  const links = document.getElementById('nav-links');
  if (links) links.classList.toggle('open');
}

/* ---- Active Nav Link ---- */
(function setActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    } else {
      // Don't remove the class set in HTML — already handled per-page
    }
  });
})();

/* ---- Close nav when a link is clicked (mobile) ---- */
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    const links = document.getElementById('nav-links');
    if (links) links.classList.remove('open');
  });
});

/* ---- Contact Form Validation ---- */
var form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var name    = document.getElementById('name');
    var email   = document.getElementById('email');
    var message = document.getElementById('message');
    var success = document.getElementById('form-success');
    var valid   = true;

    // Clear previous errors
    [name, email, message].forEach(function(el) {
      el.style.borderColor = '';
    });

    if (!name.value.trim()) {
      name.style.borderColor = '#c0392b';
      name.focus();
      valid = false;
    }

    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = '#c0392b';
      if (valid) email.focus();
      valid = false;
    }

    if (!message.value.trim()) {
      message.style.borderColor = '#c0392b';
      if (valid) message.focus();
      valid = false;
    }

    if (valid) {
      // Show success message (Phase 4 will wire up real submission)
      success.style.display = 'block';
      form.reset();
      setTimeout(function() {
        success.style.display = 'none';
      }, 5000);
    }
  });
}

/* ---- Scroll Fade-In (IntersectionObserver) ---- */
(function initScrollFade() {
  var elements = document.querySelectorAll('.fade-in');

  // If browser doesn't support IntersectionObserver, just show everything
  if (!('IntersectionObserver' in window)) {
    elements.forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(function(el) {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
})();
