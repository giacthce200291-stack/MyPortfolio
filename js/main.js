(function(){
  function initMain(){
    // Mobile menu toggle
    const menuToggle=document.querySelector('.menu-toggle'), sidebar=document.getElementById('sidebar');
    if(menuToggle&&sidebar){
      menuToggle.setAttribute('aria-controls', menuToggle.getAttribute('aria-controls')||'sidebar');
      menuToggle.setAttribute('aria-expanded', menuToggle.getAttribute('aria-expanded')||'false');
      menuToggle.addEventListener('click', ()=>{const active=sidebar.classList.toggle('active');menuToggle.setAttribute('aria-expanded', active?'true':'false');});
    }

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const href=this.getAttribute('href');
        if(!href || href==='#') return;
        const target=document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          if(sidebar) sidebar.classList.remove('active');
          if(menuToggle) menuToggle.setAttribute('aria-expanded','false');
        }
      });
    });

    // Back-to-top button
    let backToTop=document.getElementById('backToTop');
    if(!backToTop){backToTop=document.createElement('button');backToTop.id='backToTop';backToTop.type='button';backToTop.setAttribute('aria-label','Back to top');backToTop.textContent='↑';document.body.appendChild(backToTop);}
    backToTop.style.display=window.scrollY>300?'block':'none';
    window.addEventListener('scroll', ()=>backToTop.style.display=window.scrollY>300?'block':'none',{passive:true});
    backToTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

    // Theme: localStorage -> OS pref -> default
    const saved=localStorage.getItem('theme'), prefersDark=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = saved? saved : (prefersDark? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);

    let themeToggle=document.getElementById('themeToggle');
    if(!themeToggle){themeToggle=document.createElement('button');themeToggle.id='themeToggle';themeToggle.className='theme-toggle';themeToggle.type='button';themeToggle.setAttribute('aria-label','Toggle light/dark theme');document.body.appendChild(themeToggle);}
    const updateThemeButton=(t)=>{themeToggle.setAttribute('aria-pressed',(t==='light').toString()); themeToggle.textContent = t==='dark' ? 'Light Mode' : 'Dark Mode';};
    updateThemeButton(initialTheme);
    themeToggle.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', current);
      updateThemeButton(current);
      localStorage.setItem('theme', current);
    });

    // Reveal-on-scroll (IntersectionObserver) with 150ms stagger
    (function reveal(){
      const els=Array.from(document.querySelectorAll('.reveal'));
      if(!els.length) return;
      const obs=new IntersectionObserver((entries, o)=>{
        entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('active'); o.unobserve(en.target); } });
      }, {threshold:0.15, rootMargin:'0px 0px -5% 0px'});
      els.forEach((el,i)=>{ el.style.transitionDelay = `${i*150}ms`; obs.observe(el); });
    })();

    // Sticky header toggle class
    (function sticky(){
      const TH=50, onS=()=>document.body.classList.toggle('scrolled', window.scrollY>TH);
      window.addEventListener('scroll', onS, {passive:true}); onS();
    })();

    // Simple carousel wiring (if present)
    (function carouselInit(){
      const carousels=Array.from(document.querySelectorAll('.carousel'));
      if(!carousels.length) return;
      carousels.forEach(car=>{
        const track=car.querySelector('.carousel-track'), slides=Array.from(track.children), prev=car.querySelector('.carousel-nav.prev'), next=car.querySelector('.carousel-nav.next'), dotsWrap=car.querySelector('.carousel-dots');
        let idx=0, startX=0, dragging=false;
        const createDots=()=>{
          // create dots
          if (dotsWrap) {
            slides.forEach((s, i) => {
              const btn = document.createElement('button');
              btn.type = 'button';
              btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
              btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
              btn.addEventListener('click', () => goTo(i));
              dotsWrap.appendChild(btn);
            });
          }
        };
        const dotsUpdate=()=>Array.from(dotsWrap.children).forEach((b,i)=>b.setAttribute('aria-selected', i===idx?'true':'false'));
        const update=()=>{track.style.transform=`translateX(-${idx*100}%)`; dotsUpdate();}
        const goTo=(i)=>{ idx=(i+slides.length)%slides.length; update(); }
        if(prev){ prev.addEventListener('click', ()=>goTo(idx-1)); if(!prev.type) prev.type='button'; }
        if(next){ next.addEventListener('click', ()=>goTo(idx+1)); if(!next.type) next.type='button'; }
        track.addEventListener('touchstart', e=>{ startX=e.touches[0].clientX; dragging=true; }, {passive:true});
        track.addEventListener('touchmove', e=>{ if(!dragging) return; const dx=e.touches[0].clientX - startX; track.style.transition='none'; track.style.transform=`translateX(calc(-${idx*100}% + ${dx}px))`; }, {passive:true});
        track.addEventListener('touchend', e=>{ if(!dragging) return; const endX=e.changedTouches[0].clientX; const dx=endX - startX; track.style.transition=''; dragging=false; if(Math.abs(dx)>50){ dx<0? goTo(idx+1): goTo(idx-1); } else update(); });
        car.addEventListener('keydown', e=>{ if(e.key==='ArrowLeft') goTo(idx-1); if(e.key==='ArrowRight') goTo(idx+1); });
        createDots(); update();
      });
    })();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initMain); else initMain();
})();
