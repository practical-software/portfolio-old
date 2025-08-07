// Nebula Noir Portfolio JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initSmoothScrolling();
  initIntersectionObserver();
  initStarfield();
  initParallax();
  initFrostRipple();
  initNebulaParticles();
  initTypewriter();

  // Navigation functionality
  function initNavigation() {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navbar = document.getElementById("navbar");

    // Mobile menu toggle
    if (navToggle) {
      navToggle.addEventListener("click", function () {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
      });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Navbar background on scroll
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(11, 11, 30, 0.98)";
        navbar.style.backdropFilter = "blur(15px)";
      } else {
        navbar.style.background = "rgba(11, 11, 30, 0.95)";
        navbar.style.backdropFilter = "blur(10px)";
      }
    });
  }

  // Smooth scrolling functionality
  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll(".nav-link[data-section]");

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetSection = this.getAttribute("data-section");
        const targetElement = document.getElementById(targetSection);

        if (targetElement) {
          const navbarHeight = document.getElementById("navbar").offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Intersection Observer for fade-in animations
  function initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe elements for fade-in
    const fadeElements = document.querySelectorAll(
      ".about-content, .skills-category, .card"
    );
    fadeElements.forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
  }

  // Enhanced starfield animation
  function initStarfield() {
    const starfield = document.getElementById("starfield");
    if (!starfield) return;

    // Create additional stars dynamically
    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3}px;
                height: ${Math.random() * 3}px;
                background: ${
                  Math.random() > 0.5
                    ? "var(--light-sky-blue)"
                    : "var(--stellar-indigo)"
                };
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                border-radius: 50%;
                animation: twinkle ${
                  2 + Math.random() * 3
                }s ease-in-out infinite;
                opacity: ${0.3 + Math.random() * 0.7};
            `;
      starfield.appendChild(star);
    }

    // Add twinkle animation
    const style = document.createElement("style");
    style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
        `;
    document.head.appendChild(style);
  }

  // Parallax effect for starfield
  function initParallax() {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const starfield = document.getElementById("starfield");
      if (starfield) {
        starfield.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  // Frost ripple effect for buttons
  function initFrostRipple() {
    const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

    buttons.forEach((button) => {
      button.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty("--ripple-x", x + "px");
        this.style.setProperty("--ripple-y", y + "px");
      });

      button.addEventListener("mouseenter", function () {
        this.style.setProperty("--ripple-opacity", "1");
      });

      button.addEventListener("mouseleave", function () {
        this.style.setProperty("--ripple-opacity", "0");
      });
    });
  }

  // Nebula particles around headings
  function initNebulaParticles() {
    const headings = document.querySelectorAll(".section-title, .hero-title");

    headings.forEach((heading) => {
      heading.addEventListener("mouseenter", function () {
        createParticles(this);
      });
    });

    function createParticles(element) {
      const rect = element.getBoundingClientRect();
      const particles = 8;

      for (let i = 0; i < particles; i++) {
        const particle = document.createElement("div");
        particle.className = "nebula-particle";
        particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: var(--light-sky-blue);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top + Math.random() * rect.height}px;
                    animation: particleFloat 2s ease-out forwards;
                `;

        document.body.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 2000);
      }
    }

    // Add particle animation
    const style = document.createElement("style");
    style.textContent = `
            @keyframes particleFloat {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0);
                }
            }
        `;
    document.head.appendChild(style);
  }

  // Typewriter effect for hero title
  function initTypewriter() {
    const titleElement = document.querySelector(".hero-title");
    if (!titleElement) return;

    const originalText = titleElement.textContent;
    titleElement.textContent = "";

    let charIndex = 0;
    const typeSpeed = 100;

    function typeChar() {
      if (charIndex < originalText.length) {
        titleElement.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, typeSpeed);
      }
    }

    // Start typing after a short delay
    setTimeout(typeChar, 500);
  }

  // Skill item hover effects
  function initSkillHoverEffects() {
    const skillCards = document.querySelectorAll(".skills-grid .card");

    skillCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        // The hover effect is now handled by CSS
      });

      card.addEventListener("mouseleave", function () {
        // The hover effect is now handled by CSS
      });
    });
  }

  // Project card effects (now using new card structure)
  function initProjectCardEffects() {
    const projectCards = document.querySelectorAll(".projects-grid .card");

    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        // The hover effect is now handled by CSS
      });

      card.addEventListener("mouseleave", function () {
        // The hover effect is now handled by CSS
      });
    });
  }

  // Work card effects (now using new card structure)
  function initWorkCardEffects() {
    const workCards = document.querySelectorAll(".work-content .card");

    workCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        // The hover effect is now handled by CSS
      });

      card.addEventListener("mouseleave", function () {
        // The hover effect is now handled by CSS
      });
    });
  }

  // Interest item hover effects
  function initInterestItemEffects() {
    const interestItems = document.querySelectorAll(".interest-item");

    interestItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px) scale(1.05)";
        this.style.boxShadow = "0 15px 30px rgba(111, 212, 255, 0.3)";
      });

      item.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
        this.style.boxShadow = "0 10px 25px rgba(111, 212, 255, 0.2)";
      });
    });
  }

  // Initialize additional effects
  initSkillHoverEffects();
  initProjectCardEffects();
  initWorkCardEffects();
  initInterestItemEffects();
  initImageCarousels();

  // Image carousel functionality
  function initImageCarousels() {
    const carousels = document.querySelectorAll(".image-carousel");

    carousels.forEach((carousel) => {
      const images = carousel.querySelectorAll(".carousel-image");
      const prevBtn = carousel.querySelector(".carousel-btn.prev");
      const nextBtn = carousel.querySelector(".carousel-btn.next");
      let currentIndex = 0;

      function showImage(index) {
        images.forEach((img, i) => {
          img.classList.toggle("active", i === index);
        });
      }

      function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }

      function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", prevImage);
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", nextImage);
      }

      // Auto-advance carousel every 5 seconds
      setInterval(nextImage, 5000);
    });
  }

  // Global scroll to section function
  window.scrollToSection = function (sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const navbarHeight = document.getElementById("navbar").offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });

  // Add scroll progress indicator
  function initScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--light-sky-blue), var(--stellar-indigo));
            z-index: 1001;
            transition: width 0.1s ease;
        `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + "%";
    });
  }

  initScrollProgress();

  // Add cursor trail effect
  function initCursorTrail() {
    const cursor = document.createElement("div");
    cursor.className = "cursor-trail";
    cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--light-sky-blue), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
            transition: all 0.1s ease;
        `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      cursor.style.left = cursorX - 10 + "px";
      cursor.style.top = cursorY - 10 + "px";

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  // Uncomment to enable cursor trail (can be performance intensive)
  // initCursorTrail();

  // Add keyboard navigation
  function initKeyboardNavigation() {
    document.addEventListener("keydown", function (e) {
      const sections = ["hero", "about", "skills", "work", "projects"];
      const currentSection = getCurrentSection();
      const currentIndex = sections.indexOf(currentSection);

      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        if (currentIndex < sections.length - 1) {
          scrollToSection(sections[currentIndex + 1]);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex > 0) {
          scrollToSection(sections[currentIndex - 1]);
        }
      }
    });
  }

  function getCurrentSection() {
    const sections = ["hero", "about", "skills", "work", "projects"];
    const scrollPosition = window.pageYOffset + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        return sections[i];
      }
    }
    return "hero";
  }

  initKeyboardNavigation();

  // Add performance optimizations
  function initPerformanceOptimizations() {
    // Throttle scroll events
    let ticking = false;

    function updateOnScroll() {
      // Update scroll-based animations here
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }

    window.addEventListener("scroll", requestTick);

    // Debounce resize events
    let resizeTimeout;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        // Handle resize events here
      }, 250);
    });
  }

  initPerformanceOptimizations();

  // Add accessibility improvements
  function initAccessibility() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll(
      "a, button, input, textarea, select"
    );
    focusableElements.forEach((element) => {
      element.addEventListener("focus", function () {
        this.style.outline = "2px solid var(--light-sky-blue)";
        this.style.outlineOffset = "2px";
      });

      element.addEventListener("blur", function () {
        this.style.outline = "none";
      });
    });

    // Add skip to content link
    const skipLink = document.createElement("a");
    skipLink.href = "#hero";
    skipLink.textContent = "Skip to content";
    skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--deep-space-blue);
            color: var(--off-white);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
        `;
    skipLink.addEventListener("focus", function () {
      this.style.top = "6px";
    });
    skipLink.addEventListener("blur", function () {
      this.style.top = "-40px";
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  initAccessibility();
  initBowlingAnimation();

  console.log("🚀 Nebula Noir Portfolio initialized successfully!");
});

// Bowling Animation with Advanced Physics
function initBowlingAnimation() {
  const balls = document.querySelectorAll(".bowling-ball");
  const pins = document.querySelectorAll(".bowling-pin");

  // Store positions and velocities for each element
  const elements = {
    balls: [],
    pins: [],
  };

  // Initialize ball data (only one ball now)
  balls.forEach((ball, index) => {
    elements.balls.push({
      element: ball,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 12,
      spinning: 0,
      spinningSpeed: 1.2 + Math.random() * 0.8, // Faster spin
      targetPin: null,
      chasing: false,
      recentlyHitPins: [], // Track last 3 pins hit
    });
  });

  // Initialize pin data with spinning properties
  pins.forEach((pin, index) => {
    elements.pins.push({
      element: pin,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 8,
      spinning: Math.random() * 360, // Random initial angle
      spinningSpeed: 0.1 + Math.random() * 0.2, // Slow idle spin
      fastSpinningSpeed: 2 + Math.random() * 3, // Fast spin after hit
      knocked: false,
      knockTime: 0,
      escapeMode: false,
      escapeTime: 0,
      lastChasedBy: null,
      hitEdge: false, // Track if pin hit viewport edge
      edgeHitTime: 0, // Time when edge was hit
      collisionDirection: 0, // Direction pin should fly after collision
      rotationDirection: 1, // 1 for clockwise, -1 for counter-clockwise
      spinStartTime: 0, // Track when fast spinning started
      isFastSpinning: false, // Track if pin is in fast spin mode
    });
  });

  // Find closest pin to a ball
  function findClosestPin(ball) {
    let closestPin = null;
    let closestDistance = Infinity;

    elements.pins.forEach((pin) => {
      if (pin.escapeMode) return; // Skip pins in escape mode

      // Skip pins that were recently hit
      if (ball.recentlyHitPins.includes(pin)) return;

      const dx = pin.x - ball.x;
      const dy = pin.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPin = pin;
      }
    });

    return closestPin;
  }

  // Check if pin is far enough from all balls to be chased again
  function isPinFarEnough(pin) {
    let minDistance = Infinity;

    elements.balls.forEach((ball) => {
      const dx = pin.x - ball.x;
      const dy = pin.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      minDistance = Math.min(minDistance, distance);
    });

    return minDistance > 200; // Distance threshold for re-chasing
  }

  // Animation loop
  function animate() {
    updatePositions();
    checkCollisions();
    updateElements();
    requestAnimationFrame(animate);
  }

  // Update positions based on current velocities
  function updatePositions() {
    const time = Date.now() * 0.001;

    // Update ball positions and targeting
    elements.balls.forEach((ball) => {
      // Find closest pin if not currently chasing one
      if (!ball.targetPin || ball.targetPin.escapeMode) {
        ball.targetPin = findClosestPin(ball);
        ball.chasing = ball.targetPin !== null;
      }

      if (ball.chasing && ball.targetPin && !ball.targetPin.escapeMode) {
        // Move towards target pin (slowly but faster than pin)
        const dx = ball.targetPin.x - ball.x;
        const dy = ball.targetPin.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 15) {
          ball.vx = (dx / distance) * 0.4; // Slower ball speed
          ball.vy = (dy / distance) * 0.4;
        } else {
          ball.vx = 0;
          ball.vy = 0;
        }
      } else {
        // Ball is not chasing, slow movement
        ball.vx *= 0.95;
        ball.vy *= 0.95;
      }

      // Update ball position
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Update spinning
      ball.spinning += ball.spinningSpeed;

      // Wrap around screen edges
      if (ball.x < -50) ball.x = window.innerWidth + 50;
      if (ball.x > window.innerWidth + 50) ball.x = -50;
      if (ball.y < -50) ball.y = window.innerHeight + 50;
      if (ball.y > window.innerHeight + 50) ball.y = -50;
    });

    // Update pin positions with idle floating and spinning
    elements.pins.forEach((pin, index) => {
      // Update pin spinning with deceleration
      if (pin.knocked && !pin.hitEdge) {
        // Start fast spinning if not already started
        if (!pin.isFastSpinning) {
          pin.isFastSpinning = true;
          pin.spinStartTime = Date.now();
        }

        // Calculate time since fast spinning started
        const timeSinceSpinStart = Date.now() - pin.spinStartTime;
        const spinDuration = 3000; // 3 seconds

        if (timeSinceSpinStart < spinDuration) {
          // Still in fast spin mode
          pin.spinning += pin.fastSpinningSpeed * pin.rotationDirection;
        } else {
          // Decelerate to normal speed
          pin.isFastSpinning = false;
          pin.spinning += pin.spinningSpeed;
        }
      } else {
        // Normal slow spin
        pin.spinning += pin.spinningSpeed;
        // Reset fast spinning state when not knocked
        pin.isFastSpinning = false;
      }

      if (pin.escapeMode) {
        // Pin is flying away after collision
        const timeSinceEscape = Date.now() - pin.escapeTime;

        // Add some random movement to make it fly around
        if (Math.random() < 0.02) {
          pin.vx += (Math.random() - 0.5) * 0.5;
          pin.vy += (Math.random() - 0.5) * 0.5;
        }

        // Dampen velocity slowly
        pin.vx *= 0.995;
        pin.vy *= 0.995;

        // Check if pin is far enough to be chased again
        if (isPinFarEnough(pin)) {
          pin.escapeMode = false;
          pin.knocked = false;
          pin.lastChasedBy = null;
          pin.hitEdge = false; // Reset edge hit status
        }
      } else if (pin.knocked) {
        // Pin was just knocked, start escape mode
        pin.escapeMode = true;
        pin.escapeTime = Date.now();

        // Use the calculated collision direction for realistic escape
        const escapeSpeed = 1.2 + Math.random() * 0.8; // Slower escape speed
        pin.vx = Math.cos(pin.collisionDirection) * escapeSpeed;
        pin.vy = Math.sin(pin.collisionDirection) * escapeSpeed;
      } else {
        // Pin is idle - float around smoothly like in space
        // Very slow, continuous random movement instead of sporadic impulses
        const time = Date.now() * 0.001;
        const noiseX = Math.sin(time * 0.5 + index * 0.7) * 0.1;
        const noiseY = Math.cos(time * 0.3 + index * 0.9) * 0.1;

        pin.vx += noiseX * 0.01;
        pin.vy += noiseY * 0.01;

        // Dampen idle movement
        pin.vx *= 0.99;
        pin.vy *= 0.99;
      }

      // Update pin position
      pin.x += pin.vx;
      pin.y += pin.vy;

      // Handle viewport edge bouncing
      const margin = 50;
      const maxX = window.innerWidth - margin;
      const maxY = window.innerHeight - margin;

      if (pin.x <= margin || pin.x >= maxX) {
        pin.vx = -pin.vx * 0.8; // Bounce with dampening
        pin.x = Math.max(margin, Math.min(maxX, pin.x));
        pin.hitEdge = true;
        pin.edgeHitTime = Date.now();
      }

      if (pin.y <= margin || pin.y >= maxY) {
        pin.vy = -pin.vy * 0.8; // Bounce with dampening
        pin.y = Math.max(margin, Math.min(maxY, pin.y));
        pin.hitEdge = true;
        pin.edgeHitTime = Date.now();
      }

      // Reset spinning speed after hitting edge
      if (pin.hitEdge && Date.now() - pin.edgeHitTime > 1000) {
        pin.hitEdge = false;
      }
    });
  }

  // Check for collisions between balls and pins
  function checkCollisions() {
    elements.balls.forEach((ball) => {
      elements.pins.forEach((pin) => {
        if (pin.escapeMode) return; // Skip pins in escape mode

        const dx = ball.x - pin.x;
        const dy = ball.y - pin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball.radius + pin.radius) {
          // Collision detected!
          pin.knocked = true;
          pin.knockTime = Date.now();
          pin.lastChasedBy = ball;
          pin.hitEdge = false; // Reset edge hit status

          // Calculate the direction the ball hit the pin (opposite of ball's velocity)
          const ballDirection = Math.atan2(ball.vy, ball.vx);

          // Add random variation of ±5 degrees (converted to radians)
          const randomVariation =
            (Math.random() - 0.5) * ((10 * Math.PI) / 180); // ±5 degrees
          pin.collisionDirection = ballDirection + randomVariation;

          // Alternate rotation direction for variety
          pin.rotationDirection = Math.random() < 0.5 ? 1 : -1;

          // Add this pin to the ball's recently hit list
          ball.recentlyHitPins.push(pin);
          if (ball.recentlyHitPins.length > 3) {
            ball.recentlyHitPins.shift(); // Remove oldest pin
          }

          // Create collision effect
          createCollisionEffect(pin.x, pin.y);

          // Slight bounce for the ball
          ball.vx = (-dx / distance) * 1.5;
          ball.vy = (-dy / distance) * 1.5;

          // Ball stops chasing this pin
          ball.targetPin = null;
          ball.chasing = false;
        }
      });
    });
  }

  // Create visual collision effect
  function createCollisionEffect(x, y) {
    const effect = document.createElement("div");
    effect.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 12px;
      height: 12px;
      background: radial-gradient(circle, #e53935, transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: -2;
      animation: collisionEffect 0.5s ease-out forwards;
    `;

    document.body.appendChild(effect);

    setTimeout(() => {
      effect.remove();
    }, 500);
  }

  // Update visual positions of elements
  function updateElements() {
    elements.balls.forEach((ball) => {
      ball.element.style.transform = `translate(${ball.x}px, ${ball.y}px) rotate(${ball.spinning}deg)`;
    });

    elements.pins.forEach((pin) => {
      if (pin.escapeMode) {
        const timeSinceEscape = Date.now() - pin.escapeTime;
        const wobble = Math.sin(timeSinceEscape * 0.005) * 3;
        pin.element.style.transform = `translate(${pin.x}px, ${
          pin.y
        }px) rotate(${pin.spinning + wobble}deg)`;
      } else {
        pin.element.style.transform = `translate(${pin.x}px, ${pin.y}px) rotate(${pin.spinning}deg)`;
      }
    });
  }

  // Initialize starting positions (random and far apart)
  function initializePositions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Place ball in random position
    elements.balls.forEach((ball, index) => {
      ball.x = Math.random() * (screenWidth * 0.3) + screenWidth * 0.1;
      ball.y = Math.random() * (screenHeight * 0.3) + screenHeight * 0.1;
    });

    // Place pins in random positions across the entire screen
    elements.pins.forEach((pin, index) => {
      let attempts = 0;
      do {
        // Spread pins across the entire viewport with margins
        pin.x = Math.random() * (screenWidth * 0.8) + screenWidth * 0.1;
        pin.y = Math.random() * (screenHeight * 0.8) + screenHeight * 0.1;
        attempts++;
      } while (
        attempts < 50 &&
        elements.balls.some((ball) => {
          const dx = pin.x - ball.x;
          const dy = pin.y - ball.y;
          return Math.sqrt(dx * dx + dy * dy) < 200; // Increased minimum distance
        })
      );
    });
  }

  // Add collision effect animation to CSS
  const collisionStyle = document.createElement("style");
  collisionStyle.textContent = `
    @keyframes collisionEffect {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(collisionStyle);

  // Start the animation
  initializePositions();
  animate();
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
