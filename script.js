// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate header on page load
gsap.from("header", {
  y: -100,
  opacity: 0,
  duration: 1
});

// Animate main sections on page load
gsap.from("section", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3
});

// Animate section titles with .reveal class
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.from(el, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

// Animate project cards
gsap.utils.toArray('.project-card').forEach(card => {
  gsap.from(card, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

// Animate experience cards
gsap.utils.toArray('.experience-card').forEach(card => {
  gsap.from(card, {
    x: -50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

// Animate certification cards
gsap.utils.toArray('.certification-card').forEach(card => {
  gsap.from(card, {
    x: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

// Animate contact form
gsap.from("form", {
  scale: 0.8,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "form",
    start: "top 90%",
    toggleActions: "play none none reverse"
  }
});

// DOMContentLoaded for rest of the logic
document.addEventListener('DOMContentLoaded', function () {
  // Theme toggle functionality - FIXED
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  
  // Apply the theme on initial load
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateToggleButton('dark');
  } else if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    updateToggleButton('light');
  } else {
    // Check system preference if no saved theme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      body.classList.add('dark-mode');
      updateToggleButton('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      updateToggleButton('light');
      localStorage.setItem('theme', 'light');
    }
  }

  // Theme toggle click handler
  themeToggle.addEventListener('click', function () {
    if (body.classList.contains('dark-mode')) {
      // Switch to light mode
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      updateToggleButton('light');
      animateThemeTransition(false);
    } else {
      // Switch to dark mode
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      updateToggleButton('dark');
      animateThemeTransition(true);
    }
  });

  function updateToggleButton(theme) {
    if (theme === 'dark') {
      themeToggle.innerHTML = '☀️';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      themeToggle.innerHTML = '🌙';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  function animateThemeTransition(isDark) {
    // Animate the theme transition with GSAP
    gsap.to("body", {
      backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
      color: isDark ? "#f8f9fa" : "#212529",
      duration: 0.5,
      ease: "power2.out"
    });

    // Rotate the theme toggle button
    gsap.fromTo(themeToggle,
      { rotation: 0 },
      { rotation: 360, duration: 0.6, ease: "power2.out" }
    );
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }

  // Smooth scrolling and active link handling
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });

        // Close mobile nav
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');

        // Update active link
        links.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Scroll-based active link update
  window.addEventListener('scroll', function () {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navHeight = 80;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 20;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});