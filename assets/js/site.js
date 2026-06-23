const CONTENT_BASE_PATH = 'content/site';

const fallbackSiteContent = {
  calendlyUrl: 'https://wa.me/527714652450',
  services: [
    {
      tag: 'Técnica premium',
      title: 'Microblading',
      price: 'Consulta precio',
      description: 'Técnica de trazos finos que imita el vello natural para crear cejas definidas, armónicas y elegantes.',
      perks: ['Diseño personalizado según tu rostro', 'Resultado natural y definido', 'Ideal para mejorar simetría'],
      buttonText: 'Reservar ahora'
    },
    {
      tag: 'Acabado suave',
      title: 'Powder Brows',
      price: 'Consulta precio',
      description: 'Sombreado delicado para un efecto pulido, uniforme y elegante con profundidad controlada.',
      perks: ['Efecto maquillado sutil', 'Ideal para más intensidad', 'Se adapta a distintos estilos'],
      buttonText: 'Reservar ahora'
    },
    {
      tag: 'Balance y definición',
      title: 'Ombré Brows',
      price: 'Consulta precio',
      description: 'Combinación de técnica y pigmentación para una ceja con más estructura y transición suave.',
      perks: ['Combina naturalidad y relleno', 'Construcción gradual de color', 'Excelente para cejas con vacíos'],
      buttonText: 'Reservar ahora'
    },
    {
      tag: 'Diagnóstico experto',
      title: 'Consulta experta',
      price: 'Sin costo inicial',
      description: 'Evaluamos la técnica ideal según tu base natural, el estilo que buscas y el comportamiento de tu piel.',
      perks: ['Análisis facial', 'Recomendación de técnica', 'Plan de mantenimiento y retoque'],
      buttonText: 'Agendar consulta'
    }
  ],
  gallery: [
    { src: 'assets/images/gallery/11251.jpg', alt: 'Resultado de microblading', label: 'Microblading' },
    { src: 'assets/images/gallery/11256.jpg', alt: 'Resultado de cejas con detalle', label: 'Detalle' },
    { src: 'assets/images/gallery/11267.jpg', alt: 'Resultado de cejas híbridas', label: 'Cejas' },
    { src: 'assets/images/gallery/11263.jpg', alt: 'Micropigmentación de labios', label: 'Labios' },
    { src: 'assets/images/gallery/11265.jpg', alt: 'Resultado natural de cejas', label: 'Natural' },
    { src: 'assets/images/gallery/11271.jpg', alt: 'Resultado de delineado', label: 'Detalle' },
    { src: 'assets/images/gallery/11277.jpg', alt: 'Resultado de cejas', label: 'Cejas' },
    { src: 'assets/images/gallery/11281.jpg', alt: 'Resultado con técnica suave', label: 'Soft brows' },
    { src: 'assets/images/gallery/11284.jpg', alt: 'Resultado de labios', label: 'Lip blush' }
  ],
  reviews: [
    {
      name: 'Valeria M.',
      event: 'Cejas perfectas',
      text: 'Desde la explicación inicial hasta el resultado final, todo se sintió ordenado, profesional y muy cuidado.'
    },
    {
      name: 'Michelle',
      event: 'Microblading',
      text: 'El diseño quedó limpio y muy natural. Me encantó la precisión y la forma en que adaptaron la técnica a mi rostro.'
    },
    {
      name: 'Leslie R.',
      event: 'Powder brows',
      text: 'Reservé durante un tour y fue una gran experiencia. El resultado se ve fino y duradero.'
    }
  ]
};

const serviceImageByTitle = {
  Microblading: 'assets/images/gallery/11251.jpg',
  Microshading: 'assets/images/gallery/11265.jpg',
  'Powder Brows': 'assets/images/gallery/11265.jpg',
  'Cejas Hibridas': 'assets/images/gallery/11256.jpg',
  'Cejas Híbridas': 'assets/images/gallery/11256.jpg',
  'Ombré Brows': 'assets/images/gallery/11256.jpg',
  'Hair Stroke': 'assets/images/gallery/11281.jpg',
  'Delineado y Labios': 'assets/images/gallery/11263.jpg',
  'Consulta experta': 'assets/images/gallery/11267.jpg'
};

let siteContent = {
  calendlyUrl: fallbackSiteContent.calendlyUrl,
  services: fallbackSiteContent.services.slice(),
  gallery: fallbackSiteContent.gallery.slice(),
  reviews: fallbackSiteContent.reviews.slice()
};

let activeServiceIndex = 0;

function fetchJson(path) {
  return fetch(path).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load ${path}`);
    }

    return response.json();
  });
}

function applyCalendlyLinks() {
  const href = siteContent.calendlyUrl || '#reserva';

  document.querySelectorAll('[data-calendly-link]').forEach((link) => {
    link.href = href;
    if (href !== '#reserva') {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
}

function getServiceImage(service) {
  return serviceImageByTitle[service.title] || fallbackSiteContent.gallery[0].src;
}

function renderServiceTabs() {
  const target = document.getElementById('services-tabs');
  if (!target) {
    return;
  }

  target.innerHTML = siteContent.services.map((service, index) => `
    <button class="service-tab reveal reveal-left ${index === activeServiceIndex ? 'is-active' : ''}" style="--reveal-delay: ${index * 90}ms;" type="button" data-service-index="${index}" aria-pressed="${index === activeServiceIndex ? 'true' : 'false'}">
      <small>${service.tag || 'Técnica premium'}</small>
      <strong>${service.title}</strong>
    </button>
  `).join('');
}

function syncActiveServiceTabState() {
  document.querySelectorAll('[data-service-index]').forEach((button) => {
    const isActive = Number(button.dataset.serviceIndex) === activeServiceIndex;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function renderActiveService() {
  const target = document.getElementById('service-feature');
  const image = document.getElementById('service-feature-image');
  const service = siteContent.services[activeServiceIndex];

  if (!target || !image || !service) {
    return;
  }

  target.innerHTML = `
    <span class="service-meta">${service.tag || 'Técnica premium'}</span>
    <h3>${service.title}</h3>
    <div class="service-price">${service.price || 'Consulta precio'}</div>
    <p>${service.description || ''}</p>
    <ul>
      ${(service.perks || []).map((perk) => `<li>${perk}</li>`).join('')}
    </ul>
    <a class="button button-gold" href="${siteContent.calendlyUrl}" target="_blank" rel="noopener noreferrer">${service.buttonText || 'Reservar ahora'}</a>
  `;

  image.src = getServiceImage(service);
  image.alt = `Resultado del servicio ${service.title}`;
}

function attachServiceEvents() {
  const target = document.getElementById('services-tabs');
  if (!target || target.dataset.eventsBound === 'true') {
    return;
  }

  target.addEventListener('click', (event) => {
    const button = event.target.closest('[data-service-index]');
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const nextIndex = Number(button.dataset.serviceIndex || 0);
    if (nextIndex === activeServiceIndex) {
      return;
    }

    activeServiceIndex = nextIndex;
    syncActiveServiceTabState();
    renderActiveService();
  });

  target.dataset.eventsBound = 'true';
}

function renderServices() {
  renderServiceTabs();
  syncActiveServiceTabState();
  renderActiveService();
  attachServiceEvents();
}

function normalizeGallery() {
  const loadedGallery = Array.isArray(siteContent.gallery) ? siteContent.gallery : [];
  const fallbackGallery = fallbackSiteContent.gallery;
  const combined = [...loadedGallery, ...fallbackGallery];
  const unique = [];
  const seen = new Set();

  combined.forEach((item) => {
    if (!item || !item.src || seen.has(item.src)) {
      return;
    }

    seen.add(item.src);
    unique.push(item);
  });

  return unique.slice(0, 9);
}

function renderGallery() {
  const target = document.getElementById('gallery-list');
  if (!target) {
    return;
  }

  const items = normalizeGallery();
  target.innerHTML = items.map((item, index) => `
    <figure class="gallery-item reveal reveal-scale" style="--reveal-delay: ${index * 70}ms;">
      <img src="${item.src}" alt="${item.alt || item.label || 'Trabajo de galería'}">
      <span>${item.label || 'Galería'}</span>
    </figure>
  `).join('');
}

function renderReviews() {
  const target = document.getElementById('reviews-list');
  if (!target) {
    return;
  }

  const reviews = Array.isArray(siteContent.reviews) && siteContent.reviews.length ? siteContent.reviews : fallbackSiteContent.reviews;
  target.innerHTML = reviews.slice(0, 3).map((review, index) => `
    <article class="review-card reveal reveal-scale" style="--reveal-delay: ${index * 100}ms;">
      <div class="stars">★★★★★</div>
      <p>${review.text || ''}</p>
      <strong>${review.name || ''}</strong>
      <span>${review.event || ''}</span>
    </article>
  `).join('');
}

function initializeReveal() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

function initializeMenu() {
  const button = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!button || !navLinks) {
    return;
  }

  button.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    });
  });
}

function initializeHeroParallax() {
  const hero = document.querySelector('.hero-section');
  const heroImage = document.querySelector('.hero-media img');
  if (!(hero instanceof HTMLElement) || !(heroImage instanceof HTMLElement)) {
    return;
  }

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopQuery = window.matchMedia('(min-width: 901px)');
  let ticking = false;

  const resetParallax = () => {
    heroImage.style.setProperty('--hero-parallax-y', '0px');
  };

  const updateParallax = () => {
    ticking = false;

    if (reducedMotionQuery.matches || !desktopQuery.matches) {
      resetParallax();
      return;
    }

    const rect = hero.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const heroCenter = rect.top + (rect.height / 2);
    const viewportCenter = viewportHeight / 2;
    const distance = heroCenter - viewportCenter;
    const offset = Math.max(-36, Math.min(36, distance * -0.08));

    heroImage.style.setProperty('--hero-parallax-y', `${offset.toFixed(2)}px`);
  };

  const requestParallaxUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  window.addEventListener('resize', requestParallaxUpdate);

  if (typeof reducedMotionQuery.addEventListener === 'function') {
    reducedMotionQuery.addEventListener('change', requestParallaxUpdate);
    desktopQuery.addEventListener('change', requestParallaxUpdate);
  }
}

function mergeLoadedContent(results) {
  const [linksResult, servicesResult, galleryResult, reviewsResult] = results;

  if (linksResult.status === 'fulfilled' && linksResult.value.calendlyUrl) {
    siteContent.calendlyUrl = linksResult.value.calendlyUrl;
  }

  if (servicesResult.status === 'fulfilled' && Array.isArray(servicesResult.value.services) && servicesResult.value.services.length) {
    siteContent.services = servicesResult.value.services.slice(0, 4);
  }

  if (galleryResult.status === 'fulfilled' && Array.isArray(galleryResult.value.gallery) && galleryResult.value.gallery.length) {
    siteContent.gallery = galleryResult.value.gallery;
  }

  if (reviewsResult.status === 'fulfilled' && Array.isArray(reviewsResult.value.reviews) && reviewsResult.value.reviews.length) {
    siteContent.reviews = reviewsResult.value.reviews;
  }
}

function renderPage() {
  activeServiceIndex = 0;
  renderServices();
  renderGallery();
  renderReviews();
  applyCalendlyLinks();
  initializeReveal();
}

function loadContent() {
  Promise.allSettled([
    fetchJson(`${CONTENT_BASE_PATH}/links.json`),
    fetchJson(`${CONTENT_BASE_PATH}/services.json`),
    fetchJson(`${CONTENT_BASE_PATH}/gallery.json`),
    fetchJson(`${CONTENT_BASE_PATH}/reviews.json`)
  ]).then((results) => {
    mergeLoadedContent(results);
    renderPage();
  }).catch(() => {
    renderPage();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeMenu();
  initializeHeroParallax();
  loadContent();
});
