// Particle Animation System
function createParticles() {
  const container = document.getElementById('backgroundAnimation');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 20px and 100px
    const size = Math.random() * 80 + 20;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random horizontal position
    particle.style.left = `${Math.random() * 100}%`;
    
    // Random animation duration between 15s and 30s
    const duration = Math.random() * 15 + 15;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
  }
}

// Typing Animation
function typeWriter() {
  const texts = [
    'Cloud Consultant',
    'Azure Specialist',
    'AWS Solutions Architect',
    'DevOps Engineer',
    'Infrastructure Automation Expert'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typingText');
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let timeout = isDeleting ? deletingSpeed : typingSpeed;
    
    if (!isDeleting && charIndex === currentText.length) {
      timeout = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    
    setTimeout(type, timeout);
  }
  
  type();
}

// Navbar Scroll Effect
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Mobile Menu Toggle
function setupMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Close menu when clicking on a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileMenuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
}

// Smooth Scroll for Navigation Links
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Intersection Observer for Scroll Animations
function setupScrollAnimations() {
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Skill Card Hover Effects
function setupSkillCardEffects() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Timeline Animation on Scroll
function setupTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 100);
      }
    });
  }, observerOptions);
  
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
}

// Active Navigation Link Highlighting
function setupActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
}

// Add Active Link Styles
function addActiveLinkStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active {
      color: var(--color-accent-blue-light);
    }
    .nav-links a.active::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
}

// Parallax Effect for Hero Section
function setupParallaxEffect() {
  const hero = document.querySelector('.hero');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });
}

// Card Entrance Animations
function setupCardAnimations() {
  const cards = document.querySelectorAll('.glass-card');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 50);
      }
    });
  }, observerOptions);
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  typeWriter();
  handleNavbarScroll();
  setupMobileMenu();
  setupSmoothScroll();
  setupScrollAnimations();
  setupSkillCardEffects();
  setupTimelineAnimations();
  setupActiveNavLink();
  addActiveLinkStyles();
  setupParallaxEffect();
  setupCardAnimations();
  
  // Make hero section visible immediately
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.classList.add('visible');
  }
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Recreate particles on resize for better distribution
    const container = document.getElementById('backgroundAnimation');
    container.innerHTML = '';
    createParticles();
  }, 250);
});
