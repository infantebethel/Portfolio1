import { initBinaryOrbits } from './src/BinaryOrbits.js';

// Small helper for the theme buttons and scroll animations (HTML/CSS can't remember choices alone).
(function () {
  var html = document.documentElement;
  var storageAvailable = true;
  var savedMode = 'dark';
  var savedHue = '290';
  try {
    savedMode = localStorage.getItem('mw-mode') || savedMode;
    savedHue = localStorage.getItem('mw-hue') || savedHue;
  } catch (error) {
    storageAvailable = false;
    console.warn('Could not access localStorage; preferences will not persist.', error);
  }

  var mode = savedMode === 'light' ? 'light' : 'dark';
  var parsedHue = Number(savedHue);
  var hue = Number.isFinite(parsedHue) && parsedHue >= 0 && parsedHue <= 360 ? parsedHue : 290;
  html.classList.remove('dark', 'light');
  html.classList.add(mode);
  html.style.setProperty('--hue', hue);

  function savePreference(key, value) {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      storageAvailable = false;
      console.warn('Could not save preferences to localStorage.', error);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initBinaryOrbits();

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var cursorGlow = document.createElement('div');
      var cursorBurstTimer;
      cursorGlow.className = 'cursor-glow';
      cursorGlow.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursorGlow);

      document.addEventListener('pointermove', function (e) {
        cursorGlow.style.setProperty('--cursor-x', e.clientX + 'px');
        cursorGlow.style.setProperty('--cursor-y', e.clientY + 'px');
        cursorGlow.classList.add('is-visible');
        var target = e.target;
        cursorGlow.classList.toggle(
          'is-hovering',
          target instanceof Element && Boolean(target.closest('a, button, input, select, textarea, summary, [role="button"]'))
        );
      });
      document.addEventListener('pointerdown', function (e) {
        cursorGlow.style.setProperty('--cursor-x', e.clientX + 'px');
        cursorGlow.style.setProperty('--cursor-y', e.clientY + 'px');
        cursorGlow.classList.add('is-visible');
        cursorGlow.classList.remove('is-burst');
        window.requestAnimationFrame(function () { cursorGlow.classList.add('is-burst'); });
        window.clearTimeout(cursorBurstTimer);
        cursorBurstTimer = window.setTimeout(function () { cursorGlow.classList.remove('is-burst'); }, 500);
      });
      document.addEventListener('pointerleave', function () {
        cursorGlow.classList.remove('is-visible', 'is-hovering');
      });
      window.addEventListener('blur', function () {
        cursorGlow.classList.remove('is-visible', 'is-hovering', 'is-burst');
      });
    }

    var modeBtn = document.getElementById('modeBtn');
    var paletteBtn = document.getElementById('paletteBtn');
    var menu = document.getElementById('paletteMenu');
    var slider = document.getElementById('hueSlider');
    modeBtn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    slider.value = hue;

    modeBtn.onclick = function () {
      mode = mode === 'dark' ? 'light' : 'dark';
      html.classList.remove('dark', 'light');
      html.classList.add(mode);
      modeBtn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      savePreference('mw-mode', mode);
    };
    function setHue(h) {
      html.style.setProperty('--hue', h);
      slider.value = h;
      savePreference('mw-hue', h);
    }
    paletteBtn.onclick = function (e) { e.stopPropagation(); menu.classList.toggle('open'); };
    menu.onclick = function (e) { e.stopPropagation(); };
    document.onclick = function () { menu.classList.remove('open'); };
    slider.oninput = function () { setHue(slider.value); };
    menu.querySelectorAll('[data-hue]').forEach(function (b) {
      b.onclick = function () { setHue(b.dataset.hue); };
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
        });
      }, { threshold: 0.15 });
      document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
      html.classList.add('js');
    }
  });
})();