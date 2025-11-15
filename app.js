// Certificate Data
const certificatesData = [
  {
    id: 1,
    title: 'Certificate Of Excellence - Scaler',
    category: 'Course',
    issuer: 'Scaler',
    year: '2024',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/Certificate%20Of%20Excellence%20Scaler.png'
  },
  {
    id: 2,
    title: 'Data Science Course Completion',
    category: 'Course',
    issuer: 'Technophilia',
    year: '2024',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/Data%20Science%20Course%20Completion%20Technophilia.png'
  },
  {
    id: 3,
    title: 'Git & Github BootCamp',
    category: 'Bootcamp',
    issuer: 'Udemy',
    year: '2025',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/Git%20%26%20Github%20BootCamp.png'
  },
  {
    id: 4,
    title: 'Machine Learning Using Python Bootcamp',
    category: 'Bootcamp',
    issuer: 'Training Platform',
    year: '2024',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/Machine%20Learning%20Using%20Python%20Bootcamp.png'
  },
  {
    id: 5,
    title: 'Model Creator Badge',
    category: 'Kaggle',
    issuer: 'Kaggle',
    year: '2024',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/Model%20Creator.png'
  },
  {
    id: 6,
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    category: 'Oracle',
    issuer: 'Oracle',
    year: '2025',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/Oracle%20Cloud%20Infrastructure%202025%20Certified%20AI%20Foundations%20Associate.png'
  },
  {
    id: 7,
    title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
    category: 'Oracle',
    issuer: 'Oracle',
    year: '2025',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/Oracle%20Cloud%20Infrastructure%202025%20Certified%20Data%20Science%20Professional.png'
  },
  {
    id: 8,
    title: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
    category: 'Oracle',
    issuer: 'Oracle',
    year: '2025',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/Oracle%20Cloud%20Infrastructure%202025%20Certified%20Foundations%20Associate.png'
  },
  {
    id: 9,
    title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    category: 'Oracle',
    issuer: 'Oracle',
    year: '2025',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/Oracle%20Cloud%20Infrastructure%202025%20Certified%20Generative%20AI%20Professional.png'
  },
  {
    id: 10,
    title: 'Python Coder Badge',
    category: 'Kaggle',
    issuer: 'Kaggle',
    year: '2024',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/Python%20Coder1.png'
  },
  {
    id: 11,
    title: 'SQL Bootcamp',
    category: 'Bootcamp',
    issuer: 'Training Platform',
    year: '2024',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/SQL%20Bootcamp%20.png'
  },
  {
    id: 12,
    title: 'Supervised Machine Learning: Regression and Classification',
    category: 'Course',
    issuer: 'Coursera',
    year: '2024',
    url: 'https://raw.githubusercontent.com/mXrahul01/Rahul-Talvar-Portfolio-Website/main/public/assets/Certificates/Supervised%20Machine%20Learning%20Regression%20and%20Classification%20CourseEra.png'
  }
];

let currentCertificates = [...certificatesData];
let currentModalIndex = 0;

// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
  }, 2000);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Active Navigation Link
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Theme Toggle
const themeBtn = document.querySelector('.theme-btn');
const html = document.documentElement;

themeBtn.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  
  const icon = themeBtn.querySelector('i');
  if (newTheme === 'light') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

// Particle Animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  
  draw() {
    ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Skill Bar Animations
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress', `${progress}%`);
        bar.classList.add('animated');
      });
    }
  });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Certificate Functions
function renderCertificates(certificates) {
  const grid = document.getElementById('certificatesGrid');
  grid.innerHTML = '';
  
  certificates.forEach((cert, index) => {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <div class="cert-thumbnail">
        <img src="${cert.url}" alt="${cert.title}" loading="lazy" onerror="this.parentElement.innerHTML='<i class=\"fas fa-certificate\" style=\"font-size: 4rem; color: var(--vibrant-teal);\"></i>';">
        <div class="cert-overlay">
          <i class="fas fa-expand"></i>
        </div>
        <div class="cert-category-badge badge-${cert.category.toLowerCase()}">
          ${cert.category}
        </div>
      </div>
      <div class="cert-info">
        <h3>${cert.title}</h3>
        <div class="cert-meta">
          <span><i class="fas fa-building"></i> ${cert.issuer}</span>
          <span><i class="fas fa-calendar"></i> ${cert.year}</span>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => openModal(cert, certificates));
    grid.appendChild(card);
  });
}

// Certificate Filters
function setupCertificateFilters() {
  const filterBtns = document.querySelectorAll('.cert-filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter certificates
      const category = btn.getAttribute('data-category');
      if (category === 'all') {
        currentCertificates = [...certificatesData];
      } else {
        currentCertificates = certificatesData.filter(cert => cert.category === category);
      }
      
      renderCertificates(currentCertificates);
    });
  });
}

// Modal Functions
function openModal(certificate, certificatesList) {
  const modal = document.getElementById('certificateModal');
  currentCertificates = certificatesList;
  currentModalIndex = certificatesList.findIndex(c => c.id === certificate.id);
  
  updateModalContent(certificate);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('certificateModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function updateModalContent(certificate) {
  document.getElementById('modalTitle').textContent = certificate.title;
  document.getElementById('modalIssuer').innerHTML = `<i class="fas fa-building"></i> ${certificate.issuer}`;
  document.getElementById('modalYear').innerHTML = `<i class="fas fa-calendar"></i> ${certificate.year}`;
  document.getElementById('modalCategory').innerHTML = `<i class="fas fa-tag"></i> ${certificate.category}`;
  
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `<img src="${certificate.url}" alt="${certificate.title}" onerror="this.parentElement.innerHTML='<div class=\"pdf-preview\"><i class=\"fas fa-exclamation-triangle\"></i><h3>Unable to load certificate</h3><p>Please try downloading to view</p></div>';">`;
  
  // Update download button
  document.getElementById('downloadBtn').onclick = () => window.open(certificate.url, '_blank');
}

function showNextCert() {
  currentModalIndex = (currentModalIndex + 1) % currentCertificates.length;
  updateModalContent(currentCertificates[currentModalIndex]);
}

function showPrevCert() {
  currentModalIndex = (currentModalIndex - 1 + currentCertificates.length) % currentCertificates.length;
  updateModalContent(currentCertificates[currentModalIndex]);
}

// Modal Event Listeners
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('nextCert').addEventListener('click', showNextCert);
document.getElementById('prevCert').addEventListener('click', showPrevCert);

document.querySelector('.modal-backdrop').addEventListener('click', closeModal);

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('certificateModal');
  if (modal.classList.contains('active')) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') showNextCert();
    if (e.key === 'ArrowLeft') showPrevCert();
  }
});

// Contact Form
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Simulate form submission
  formStatus.className = 'success';
  formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
  
  // Reset form
  contactForm.reset();
  
  // Hide status after 5 seconds
  setTimeout(() => {
    formStatus.style.display = 'none';
  }, 5000);
});

// Initialize certificates on page load
document.addEventListener('DOMContentLoaded', () => {
  renderCertificates(certificatesData);
  setupCertificateFilters();
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
