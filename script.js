const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

const setHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.classList.toggle('is-open', !isOpen);
  mobileMenu.classList.toggle('is-open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.classList.remove('is-open');
  mobileMenu.classList.remove('is-open');
  document.body.style.overflow = '';
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const details = {
  jesko: {
    index: '01', name: 'Jesko Absolut',
    description: 'Diseñado para una sola misión: alcanzar velocidades extraordinarias con una silueta esculpida por el aire.',
    one: '1.600', oneLabel: 'CV con E85', two: '0,278', twoLabel: 'Coeficiente Cd', three: '9', threeLabel: 'Velocidades LST',
    url: 'https://www.koenigsegg.com/model/jesko-absolut'
  },
  gemera: {
    index: '02', name: 'Gemera',
    description: 'La expresión más versátil del megacar: cuatro plazas reales, confort de gran turismo y una potencia sin compromisos.',
    one: '2.300', oneLabel: 'CV combinados', two: '2.750', twoLabel: 'Nm de par', three: '4', threeLabel: 'Plazas individuales',
    url: 'https://www.koenigsegg.com/model/gemera'
  },
  cc850: {
    index: '03', name: 'CC850',
    description: 'Una celebración de las raíces Koenigsegg: el tacto analógico de un manual y la inteligencia de una transmisión moderna.',
    one: '1.385', oneLabel: 'CV con E85', two: '1:1', twoLabel: 'Potencia-peso', three: '6', threeLabel: 'Marchas manuales',
    url: 'https://www.koenigsegg.com/model/cc850'
  }
};

const detailElement = document.querySelector('[data-model-detail]');
const detailFields = {
  index: document.querySelector('[data-detail-index]'), name: document.querySelector('[data-detail-name]'),
  description: document.querySelector('[data-detail-description]'), one: document.querySelector('[data-detail-stat-one]'),
  oneLabel: document.querySelector('[data-detail-label-one]'), two: document.querySelector('[data-detail-stat-two]'),
  twoLabel: document.querySelector('[data-detail-label-two]'), three: document.querySelector('[data-detail-stat-three]'),
  threeLabel: document.querySelector('[data-detail-label-three]'), url: document.querySelector('[data-detail-url]')
};

const selectModel = (modelName) => {
  const model = details[modelName];
  if (!model) return;
  document.querySelectorAll('[data-model]').forEach((card) => card.classList.toggle('is-active', card.dataset.model === modelName));
  detailElement.classList.add('is-switching');
  window.setTimeout(() => {
    Object.entries(detailFields).forEach(([key, field]) => {
      if (key === 'url') field.href = model.url;
      else field.textContent = model[key];
    });
    detailElement.classList.remove('is-switching');
  }, 140);
};

document.querySelectorAll('[data-model]').forEach((card) => {
  card.addEventListener('click', () => selectModel(card.dataset.model));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectModel(card.dataset.model); }
  });
});

const techDetails = {
  lst: { num: '01', title: 'Light Speed Transmission', copy: 'Nueve velocidades, siete embragues y una lógica de selección libre. La LST permite cambios de relación directos, sin recorrer las marchas intermedias.' },
  dark: { num: '02', title: 'Dark Matter e-motor', copy: 'Con tecnología Raxial Flux, Dark Matter combina la eficiencia de flujo radial y axial: 800 CV y 1.250 Nm desde un componente de solo 39 kg.' },
  autoskin: { num: '03', title: 'Autoskin', copy: 'La carrocería cobra vida mediante actuadores electrohidráulicos que abren puertas, cofres y paneles con una coreografía sofisticada y protegida por sensores.' }
};
const techPopover = document.querySelector('[data-tech-popover]');
document.querySelectorAll('[data-tech]').forEach((button) => button.addEventListener('click', () => {
  const item = techDetails[button.dataset.tech];
  techPopover.querySelector('[data-popover-num]').textContent = item.num;
  techPopover.querySelector('[data-popover-title]').textContent = item.title;
  techPopover.querySelector('[data-popover-copy]').textContent = item.copy;
  techPopover.classList.add('is-open');
  techPopover.setAttribute('aria-hidden', 'false');
}));
document.querySelector('[data-popover-close]')?.addEventListener('click', () => {
  techPopover.classList.remove('is-open');
  techPopover.setAttribute('aria-hidden', 'true');
});

const timelineCopy = document.querySelector('[data-timeline-copy]');
document.querySelectorAll('[data-timeline]').forEach((item) => item.addEventListener('click', () => {
  document.querySelectorAll('[data-timeline]').forEach((button) => button.classList.remove('is-current'));
  item.classList.add('is-current');
  timelineCopy.textContent = item.dataset.timeline;
}));

document.querySelector('[data-contact-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('[data-form-status]');
  const name = new FormData(form).get('name');
  status.textContent = `Gracias, ${name}. Los datos se han validado; conecte el formulario al CRM para enviar la solicitud.`;
});

window.addEventListener('pointermove', (event) => {
  document.documentElement.style.setProperty('--mouse-x', `${event.clientX - 256}px`);
  document.documentElement.style.setProperty('--mouse-y', `${event.clientY - 256}px`);
}, { passive: true });
