/* ================================================================
   Aestyx i18n — Shared translations and utilities
   All pages load this file before their inline script.
   Pages can extend window.T and set window.onLanguageChange.
   ================================================================ */

window.T = {
  en: {
    /* ── Phase / Banner ── */
    'phase.label': 'Phase 1',
    'phase.badge': 'Phase 1: Launching Soon',
    'banner':      'Join the Elite Waitlist — early access closing soon',

    /* ── Nav ── */
    'nav.value':      'Advantage',
    'nav.security':   'Security',
    'nav.procedures': 'Procedures',
    'nav.brazil':     'Why Brazil',
    'nav.partners':   'Partners',
    'nav.financing':  'Financing',
    'nav.cta':        'Join Waitlist',

    /* ── Waitlist ── */
    'waitlist.placeholder': 'Your email address',
    'waitlist.btn':         'Request Access',
    'waitlist.success':     '&#10003; You\'re on the list. We\'ll be in touch.',

    /* ── Footer ── */
    'footer.privacy':  'Privacy',
    'footer.terms':    'Terms',
    'footer.partners': 'For Specialists',
    'footer.contact':  'Contact',
    'footer.copy':     '&copy; 2025 Aestyx Inc.',

    /* ── Verification Badges ── */
    'badge.crm':    'CRM Verified',
    'badge.rqe':    'RQE Specialist',
    'badge.enc':    'Hospital-Grade Encryption',
    'badge.escrow': 'Aestyx Escrow Protected',
  },

  pt: {
    /* ── Phase / Banner ── */
    'phase.label': 'Fase 1',
    'phase.badge': 'Fase 1: Lançamento Em Breve',
    'banner':      'Entre para a Lista de Espera de Elite — vagas limitadas',

    /* ── Nav ── */
    'nav.value':      'Vantagem',
    'nav.security':   'Segurança',
    'nav.procedures': 'Procedimentos',
    'nav.brazil':     'Por Que o Brasil',
    'nav.partners':   'Parceiros',
    'nav.financing':  'Financiamento',
    'nav.cta':        'Lista de Espera',

    /* ── Waitlist ── */
    'waitlist.placeholder': 'Seu endereço de e-mail',
    'waitlist.btn':         'Solicitar Acesso',
    'waitlist.success':     '&#10003; Você está na lista. Entraremos em contato.',

    /* ── Footer ── */
    'footer.privacy':  'Privacidade',
    'footer.terms':    'Termos',
    'footer.partners': 'Para Especialistas',
    'footer.contact':  'Contato',
    'footer.copy':     '&copy; 2025 Aestyx Inc.',

    /* ── Verification Badges ── */
    'badge.crm':    'CRM Verificado',
    'badge.rqe':    'Especialista RQE',
    'badge.enc':    'Criptografia Hospitalar',
    'badge.escrow': 'Protegido pelo Aestyx Escrow',
  },

  es: {
    /* ── Phase / Banner ── */
    'phase.label': 'Fase 1',
    'phase.badge': 'Fase 1: Próximo Lanzamiento',
    'banner':      'Únete a la Lista de Espera de Élite — cupos limitados',

    /* ── Nav ── */
    'nav.value':      'Ventaja',
    'nav.security':   'Seguridad',
    'nav.procedures': 'Procedimientos',
    'nav.brazil':     'Por Qué Brasil',
    'nav.partners':   'Socios',
    'nav.financing':  'Financiamiento',
    'nav.cta':        'Lista de Espera',

    /* ── Waitlist ── */
    'waitlist.placeholder': 'Tu dirección de e-mail',
    'waitlist.btn':         'Solicitar Acceso',
    'waitlist.success':     '&#10003; Estás en la lista. Te contactaremos pronto.',

    /* ── Footer ── */
    'footer.privacy':  'Privacidad',
    'footer.terms':    'Términos',
    'footer.partners': 'Para Especialistas',
    'footer.contact':  'Contacto',
    'footer.copy':     '&copy; 2025 Aestyx Inc.',

    /* ── Verification Badges ── */
    'badge.crm':    'CRM Verificado',
    'badge.rqe':    'Especialista RQE',
    'badge.enc':    'Cifrado Hospitalario',
    'badge.escrow': 'Protegido por Aestyx Escrow',
  }
};

/* ----------------------------------------------------------------
   setLanguage(lang)
   Applies translations to the DOM, saves preference, fires hook.
   ---------------------------------------------------------------- */
window.setLanguage = function(lang) {
  if (!window.T[lang]) return;
  const tr = window.T[lang];
  document.documentElement.lang = lang;

  /* 1. data-i18n → innerHTML */
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (tr[key] !== undefined) el.innerHTML = tr[key];
  });

  /* 2. data-i18n-list → <li> items from array value */
  document.querySelectorAll('[data-i18n-list]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-list');
    if (tr[key] && Array.isArray(tr[key])) {
      el.innerHTML = tr[key].map(function(item) { return '<li>' + item + '</li>'; }).join('');
    }
  });

  /* 3. data-i18n-placeholder → placeholder attribute */
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-placeholder');
    if (tr[key] !== undefined) el.placeholder = tr[key];
  });

  /* 4. Toggle .active on language buttons */
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  /* 5. Persist to localStorage */
  try { localStorage.setItem('aestyx-lang', lang); } catch(e) {}

  /* 6. Fire page-level hook if defined */
  if (typeof window.onLanguageChange === 'function') {
    window.onLanguageChange(lang);
  }

  /* Re-init Lucide icons after innerHTML mutations */
  if (typeof lucide !== 'undefined') lucide.createIcons();
};

/* ----------------------------------------------------------------
   handleWaitlist(inputId, successId)
   Validates email and shows success message.
   ---------------------------------------------------------------- */
window.handleWaitlist = function(inputId, successId) {
  var input   = document.getElementById(inputId);
  var success = document.getElementById(successId);
  if (!input || !input.value.includes('@')) {
    if (input) {
      input.style.borderColor = 'var(--gold)';
      setTimeout(function() { input.style.borderColor = ''; }, 1500);
    }
    return;
  }
  /* Production: POST to /api/waitlist — wired here */
  input.value = '';
  input.style.display = 'none';
  if (success) success.style.display = 'block';
};

/* ----------------------------------------------------------------
   initPage()
   Load saved language (or default 'en'), apply translations,
   and ensure Lucide icons initialise after DOMContentLoaded.
   ---------------------------------------------------------------- */
window.initPage = function() {
  var saved = null;
  try { saved = localStorage.getItem('aestyx-lang'); } catch(e) {}
  var lang = (saved && window.T[saved]) ? saved : 'en';
  window.setLanguage(lang);

  document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });
};
