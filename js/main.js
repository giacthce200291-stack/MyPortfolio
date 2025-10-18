(function() {
  'use strict';

  function initEnhancedPortfolio() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- 1. Custom Cursor Spotlight Effect ---
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let cursor_x = 0;
    let cursor_y = 0;
    let outline_x = 0;
    let outline_y = 0;
    
    window.addEventListener('mousemove', (e) => {
        cursor_x = e.clientX;
        cursor_y = e.clientY;
        if (!document.body.classList.contains('cursor-ready')) {
          document.body.classList.add('cursor-ready');
        }
    });

    const renderCursor = () => {
        cursorDot.style.transform = `translate(${cursor_x}px, ${cursor_y}px)`;
        
        const delta_x = cursor_x - outline_x;
        const delta_y = cursor_y - outline_y;
        
        outline_x += delta_x * 0.15;
        outline_y += delta_y * 0.15;
        
        cursorOutline.style.transform = `translate(${outline_x}px, ${outline_y}px)`;
        requestAnimationFrame(renderCursor);
    };
    if (!isReducedMotion) {
        requestAnimationFrame(renderCursor);
    }

    // --- 2. Magnetic Buttons Effect ---
    const magneticElements = document.querySelectorAll('.view-btn, .social-links a, .carousel-nav');
    const magneticStrength = 0.4;

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', function(e) {
            const pos = this.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;
            
            if (!isReducedMotion) {
                this.style.transform = `translate(${x * magneticStrength}px, ${y * magneticStrength}px)`;
                this.style.transition = 'transform 0.1s ease-out';
            }
        });

        elem.addEventListener('mouseout', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)';
        });
    });

    // --- 3. Original functionality (refactored for new design) ---
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        const isActive = sidebar.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive.toString());
        document.body.style.overflow = isActive ? 'hidden' : '';
      });
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }
          target.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
        }
      });
    });

    // Sticky header class
    window.addEventListener('scroll', () => {
      document.body.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Enhanced Reveal-on-scroll
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0 && !isReducedMotion) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${index * 100}ms`;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('active'));
    }

    // Carousel functionality (from original file)
    document.querySelectorAll('.carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        if (!track) return;
        
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.next');
        const prevButton = carousel.querySelector('.prev');
        const dotsNav = carousel.querySelector('.carousel-dots');
        let currentIndex = 0;

        const slideWidth = slides[0].getBoundingClientRect().width;

        const moveToSlide = (targetIndex) => {
            track.style.transform = 'translateX(-' + (slideWidth * targetIndex) + 'px)';
            currentIndex = targetIndex;
            updateDots(targetIndex);
        };
        
        // Dots
        if(dotsNav) {
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.setAttribute('aria-label', `Go to slide ${i+1}`);
                dot.addEventListener('click', () => moveToSlide(i));
                dotsNav.appendChild(dot);
            });
            const dots = Array.from(dotsNav.children);
            var updateDots = (index) => {
                dots.forEach(dot => dot.removeAttribute('aria-selected'));
                dots[index].setAttribute('aria-selected', 'true');
            };
            updateDots(0);
        }

        // Arrow Buttons
        if(nextButton) {
            nextButton.addEventListener('click', () => {
                const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
                moveToSlide(newIndex);
            });
        }
        if(prevButton) {
            prevButton.addEventListener('click', () => {
                const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
                moveToSlide(newIndex);
            });
        }
    });

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancedPortfolio);
  } else {
    initEnhancedPortfolio();
  }
})();

