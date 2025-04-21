document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  // Assuming lucide is available globally or imported elsewhere.
  // If not, you might need to import it here:
  // import * as lucide from 'lucide'; 
  // or
  // const lucide = require('lucide'); // if using require

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    console.warn('Lucide is not defined. Ensure it is properly imported or included.');
  }

  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Loading screen
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      
      // Show hero content after loading screen disappears
      const heroContent = document.querySelector('.hero-content');
      const scrollDown = document.querySelector('.scroll-down');
      
      setTimeout(() => {
        heroContent.classList.add('visible');
        scrollDown.classList.add('visible');
      }, 500);
    }, 1000);
  }, 2000);

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMobile = document.getElementById('nav-mobile');
  
  menuToggle.addEventListener('click', function() {
    navMobile.classList.toggle('open');
    
    // Toggle between menu and X icon
    const icon = menuToggle.querySelector('i');
    if (navMobile.classList.contains('open')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    } else {
      console.warn('Lucide is not defined. Ensure it is properly imported or included.');
    }
  });

  // Scroll to section when clicking nav links
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      navMobile.classList.remove('open');
      menuToggle.querySelector('i').setAttribute('data-lucide', 'menu');
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      } else {
        console.warn('Lucide is not defined. Ensure it is properly imported or included.');
      }
      
      // Scroll to section
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    });
  });

  // Scroll down button in hero section
  const scrollDownBtn = document.getElementById('scroll-down');
  
  scrollDownBtn.addEventListener('click', function() {
    const aboutSection = document.getElementById('about');
    window.scrollTo({
      top: aboutSection.offsetTop,
      behavior: 'smooth'
    });
  });

  // Header background on scroll
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('hidden');
    observer.observe(card);
  });
  
  // Observe about content
  const aboutContent = document.querySelector('.about-content');
  aboutContent.classList.add('hidden');
  observer.observe(aboutContent);
  
  // Observe contact content
  const contactContent = document.querySelector('.contact-content');
  contactContent.classList.add('hidden');
  observer.observe(contactContent);
  
  // Form submission (prevent default for demo)
  const contactForm = document.querySelector('.contact-form');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Form submission is disabled in this demo.');
    // In a real implementation, you would handle the form submission here
  });
});