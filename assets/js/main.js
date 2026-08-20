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
    toggle.addEventListener('click', function(){
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });
    panel.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        toggle.setAttribute('aria-expanded','false');
        panel.classList.remove('is-open');
        document.body.style.overflow = '';
      });
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
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
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

  /* Booking widget: auto-calculate trip length from dates */
  var bookingForm = document.getElementById('bookingForm');
  if(bookingForm){
    var days = document.getElementById('bk-days');
    var startDate = document.getElementById('bk-start');
    var endDate = document.getElementById('bk-end');
    function updateDays(){
      if(startDate && endDate && startDate.value && endDate.value){
        var s = new Date(startDate.value), e = new Date(endDate.value);
        var diff = Math.round((e - s) / 86400000);
        if(diff > 0 && days){ days.value = diff; }
      }
    }
    if(startDate) startDate.addEventListener('change', updateDays);
    if(endDate) endDate.addEventListener('change', updateDays);

    bookingForm.addEventListener('submit', function(e){
      e.preventDefault();
      var confirmBox = document.getElementById('bookingConfirm');
      bookingForm.hidden = true;
      if(confirmBox) confirmBox.hidden = false;
    });
  }

  /* Contact form (static demo) */
  var contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var confirmBox = document.getElementById('contactConfirm');
      contactForm.hidden = true;
      if(confirmBox) confirmBox.hidden = false;
    });
  }

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  /* Set min date on date inputs to today */
  var today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(function(el){
    el.setAttribute('min', today);
  });

})();
