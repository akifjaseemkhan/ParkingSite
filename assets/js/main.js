/* WINGATE — shared site behaviour */
(function(){
  "use strict";

  /* Header scroll state */
  var header = document.querySelector('.site-header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 24){ header.classList.add('is-scrolled'); }
    else{ header.classList.remove('is-scrolled'); }
  }
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* Mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.mobile-panel');
  if(toggle && panel){
    function setMenu(open){
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      panel.classList.toggle('is-open', open);
      panel.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    }
    toggle.addEventListener('click', function(){
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    panel.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ setMenu(false); });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && panel.classList.contains('is-open')){ setMenu(false); }
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('[data-reveal], [data-reveal-group]');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if(!q || !a) return;
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('is-open');
      item.closest('.faq-group') && item.closest('.faq-group').querySelectorAll('.faq-item.is-open').forEach(function(other){
        if(other !== item){
          other.classList.remove('is-open');
          other.querySelector('.faq-a').style.maxHeight = null;
          other.querySelector('.faq-q').setAttribute('aria-expanded','false');
        }
      });
      item.classList.toggle('is-open', !isOpen);
      q.setAttribute('aria-expanded', String(!isOpen));
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  /* FAQ category tabs */
  var tabs = document.querySelectorAll('.faq-tab');
  var groups = document.querySelectorAll('.faq-group');
  if(tabs.length){
    tabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        tabs.forEach(function(t){ t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        var target = tab.getAttribute('data-target');
        groups.forEach(function(g){ g.classList.toggle('is-active', g.id === target); });
      });
    });
  }

  /* FAQ search */
  var faqSearch = document.getElementById('faqSearch');
  if(faqSearch){
    faqSearch.addEventListener('input', function(){
      var term = faqSearch.value.trim().toLowerCase();
      var allItems = document.querySelectorAll('.faq-item');
      if(term.length){
        tabs.forEach(function(t){ t.classList.remove('is-active'); });
        groups.forEach(function(g){ g.classList.add('is-active'); });
      } else {
        groups.forEach(function(g, i){ g.classList.toggle('is-active', i === 0); });
        if(tabs[0]) tabs[0].classList.add('is-active');
      }
      allItems.forEach(function(item){
        var text = item.textContent.toLowerCase();
        item.style.display = text.indexOf(term) !== -1 ? '' : 'none';
      });
    });
  }

  /* Contact form (static demo) */
  var contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var honeypot = document.getElementById('c-company');
      if(honeypot && honeypot.value){ return; } /* silently drop likely-bot submissions */
      var confirmBox = document.getElementById('contactConfirm');
      contactForm.hidden = true;
      if(confirmBox) confirmBox.hidden = false;
    });
  }

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

})();
