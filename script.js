// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== THEME TOGGLE FUNCTIONALITY ====================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check if theme toggle element exists
  if (!themeToggle) {
    console.error('Theme toggle button not found!');
    return;
  }

  const themeIcon = themeToggle.querySelector('i');
  
  // Function to update theme icon
  function updateThemeIcon(theme) {
    if (!themeIcon) {
      console.error('Theme icon not found!');
      return;
    }
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // Function to set theme
  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  }

  // Initialize theme from localStorage or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });

  // ==================== CONTACT FORM HANDLING ====================
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form fields
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Prepare form data
      const formData = {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
      };

      // Here you would typically send the form data to a server
      console.log('Form submitted:', formData);
      
      // Clear form
      this.reset();
      
      // Show success message (better to use a modal or inline message)
      const formMessage = document.createElement('div');
      formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
      formMessage.style.color = 'green';
      formMessage.style.marginTop = '1rem';
      this.appendChild(formMessage);
      
      // Remove message after 5 seconds
      setTimeout(() => {
        formMessage.remove();
      }, 5000);
    });
  }

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without page jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });

  // ==================== ADDITIONAL ENHANCEMENTS ====================
  
  // Add animation to theme toggle button
  if (themeToggle) {
    themeToggle.style.transition = 'transform 0.3s ease';
    themeToggle.addEventListener('click', function() {
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 300);
    });
  }
  
  // Initialize any other components here
  console.log('All scripts initialized successfully');
});
