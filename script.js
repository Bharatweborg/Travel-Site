// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== THEME TOGGLE FUNCTIONALITY ====================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    
    function updateThemeIcon(theme) {
      if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }

    function setTheme(theme) {
      htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });

    // Add animation to theme toggle button
    themeToggle.style.transition = 'transform 0.3s ease';
    themeToggle.addEventListener('click', function() {
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 300);
    });
  }

  // ==================== IMPROVED MOBILE MENU ====================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    // Initialize mobile menu state
    function initMobileMenu() {
      if (window.innerWidth <= 768) {
        mobileMenuBtn.style.display = 'block';
        navLinks.style.display = 'none';
      } else {
        mobileMenuBtn.style.display = 'none';
        navLinks.style.display = 'flex';
      }
    }

    initMobileMenu();
    window.addEventListener('resize', initMobileMenu);

    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Change icon
      const icon = this.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
        navLinks.style.display = 'flex';
      } else {
        icon.classList.replace('fa-times', 'fa-bars');
        navLinks.style.display = 'none';
      }
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          const icon = mobileMenuBtn.querySelector('i');
          icon.classList.replace('fa-times', 'fa-bars');
          navLinks.style.display = 'none';
        }
      });
    });
  }

  // ==================== SMOOTH SCROLLING ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = mobileMenuBtn?.querySelector('i');
          if (icon) icon.className = 'fas fa-bars';
        }

        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });

  // ==================== CONTACT FORM HANDLING ====================
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }

      const formData = {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
      };

      console.log('Form submitted:', formData);
      showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
      this.reset();
    });

    function showFormMessage(message, type) {
      formMessage.textContent = message;
      formMessage.style.color = type === 'error' ? '#ff3333' : '#4CAF50';
      formMessage.style.display = 'block';
      
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  }

  console.log('All scripts initialized successfully');
});