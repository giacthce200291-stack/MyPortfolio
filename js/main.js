(function() {
  'use strict';

  // Helper to check for reduced motion preference
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Dynamically restructures the skills section from a paragraph to a styled grid.
   */
  function structureSkillsSection() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;

    const skillsParagraph = skillsSection.querySelector('p');
    if (!skillsParagraph) return;

    const skillsText = skillsParagraph.innerText;
    const lines = skillsText.split('\n').filter(line => line.trim() !== '');

    const skillsGrid = document.createElement('div');
    skillsGrid.className = 'skills-grid';

    lines.forEach(line => {
      const trimmedLine = line.trim();
      // Check if the line is a category title (e.g., ends with 'Skills' or 'Technologies')
      if (trimmedLine.endsWith('Skills') || trimmedLine.endsWith('Technologies')) {
        const categoryEl = document.createElement('h3');
        categoryEl.className = 'skill-category';
        categoryEl.textContent = trimmedLine;
        skillsGrid.appendChild(categoryEl);
      } else {
        // Treat as a list of skills, split by comma or colon
        const skills = trimmedLine.split(/,|:/).map(s => s.trim()).filter(Boolean);
        skills.forEach(skill => {
          const skillEl = document.createElement('div');
          skillEl.className = 'skill-card';
          skillEl.textContent = skill;
          skillsGrid.appendChild(skillEl);
        });
      }
    });

    // Replace the original paragraph with the new grid
    skillsParagraph.replaceWith(skillsGrid);
  }
  
  /**
   * Replaces text/emoji links in the footer with high-quality SVG icons.
   */
  function setupFooterIcons() {
      const socialLinks = document.querySelector('footer .social-links');
      if(!socialLinks) return;
      
      const icons = {
          github: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="GitHub Icon"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.599.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.222.687.825.577C20.565 21.8 24 17.3 24 12 24 5.373 18.627 0 12 0z"/></svg>',
          facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Facebook Icon"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.02C18.343 21.128 22 16.991 22 12z"/></svg>',
          email: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Email Icon"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>'
      };
      
      socialLinks.innerHTML = `
        <a href="https://github.com/giacthce200291" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${icons.github}</a>
        <a href="https://www.facebook.com/giahujn" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${icons.facebook}</a>
        <a href="mailto:tranhuynhgiac2006@gmail.com" aria-label="Email">${icons.email}</a>
      `;
  }

  /**
   * Initializes all interactive components of the portfolio.
   */
  function initPortfolio() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        const isActive = sidebar.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(isActive));
        document.body.style.overflow = isActive ? 'hidden' : '';
      });
    }

    // Add parallax effect to project images
    const projectImages = document.querySelectorAll('.slide-media');
    window.addEventListener('scroll', () => {
        if(isReducedMotion) return;
        const scrollY = window.scrollY;
        projectImages.forEach(img => {
            const speed = -0.1;
            const yPos = scrollY * speed;
            img.style.transform = `translateY(${yPos}px) scale(1.05)`;
        });
    }, { passive: true });

    // Reveal on scroll
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

    // Carousel Logic
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        if (!track) return;

        const dotsContainer = carousel.querySelector('.carousel-dots');
        if (!dotsContainer) return;
        
        // Use IntersectionObserver to update active dot
        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const slideIndex = Array.from(track.children).indexOf(entry.target);
                    const currentActiveDot = dotsContainer.querySelector('[aria-selected="true"]');
                    if(currentActiveDot) currentActiveDot.removeAttribute('aria-selected');
                    const newActiveDot = dotsContainer.children[slideIndex];
                    if(newActiveDot) newActiveDot.setAttribute('aria-selected', 'true');
                }
            });
        }, { root: track, threshold: 0.6 });

        Array.from(track.children).forEach(slide => slideObserver.observe(slide));
    });
  }

  // --- Run all initializations ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      structureSkillsSection();
      setupFooterIcons();
      initPortfolio();
    });
  } else {
    structureSkillsSection();
    setupFooterIcons();
    initPortfolio();
  }

})();

