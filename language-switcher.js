(function () {
  var path = window.location.pathname;
  var isSpanish = /\/es(\/|$)/.test(path);

  // Derive base URL from the script's own src attribute
  var base = '';
  var scripts = document.querySelectorAll('script[src*="language-switcher"]');
  if (scripts.length > 0) {
    var src = scripts[0].getAttribute('src');
    base = src.replace(/\/?(?:es\/)?language-switcher\.js$/, '');
  }

  function getEnglishUrl() {
    if (isSpanish) {
      var rest = path.substring(path.indexOf('/es') + 3) || '/';
      return base + rest + window.location.search;
    }
    return window.location.href;
  }

  function getSpanishUrl() {
    if (!isSpanish) {
      var rest = base ? path.substring(base.length) : path;
      return base + '/es' + rest + window.location.search;
    }
    return window.location.href;
  }

  function createLanguageIcon() {
    // Material Symbols "translate" icon (filled) — matches companion app style
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('viewBox', '0 1 24 22');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('width', '36');
    svg.setAttribute('height', '33');

    var p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', 'M12.65 15.67l-2.34-2.33.07-.07A19.6 19.6 0 0 0 14.42 6H17V5h-7V3.5h-1V5H1v1h11.58C12 7.92 11 9.82 9.57 11.43c-.94-.99-1.73-2.08-2.36-3.26h-1c.7 1.37 1.58 2.67 2.64 3.88L3.78 17.1l.72.72 5.07-5.07 3.15 3.15.93-2.55zm5.35-4.17h-1L13 22h1l1.12-3h5.75L22 22h1l-5-10.5zm-3.12 6.5L16.5 13.9 18.12 18h-3.24z');

    svg.appendChild(p);
    return svg;
  }

  function createSwitcher() {
    // Container
    var container = document.createElement('div');
    container.className = 'lang-switcher';

    // Button with language icon
    var btn = document.createElement('button');
    btn.className = 'lang-switcher-btn';
    btn.setAttribute('aria-label', 'Select language');
    btn.setAttribute('aria-expanded', 'false');
    btn.appendChild(createLanguageIcon());

    // Dropdown menu
    var menu = document.createElement('div');
    menu.className = 'lang-switcher-menu';

    // English option
    var enLink = document.createElement('a');
    enLink.href = getEnglishUrl();
    enLink.textContent = 'English';
    enLink.className = 'lang-switcher-option' + (!isSpanish ? ' lang-switcher-active' : '');
    if (!isSpanish) {
      enLink.addEventListener('click', function (e) { e.preventDefault(); });
    }

    // Spanish option
    var esLink = document.createElement('a');
    esLink.href = getSpanishUrl();
    esLink.textContent = 'Español';
    esLink.className = 'lang-switcher-option' + (isSpanish ? ' lang-switcher-active' : '');
    if (isSpanish) {
      esLink.addEventListener('click', function (e) { e.preventDefault(); });
    }

    menu.appendChild(enLink);
    menu.appendChild(esLink);
    container.appendChild(btn);
    container.appendChild(menu);

    // Toggle dropdown
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = container.classList.toggle('lang-switcher-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on outside click
    document.addEventListener('click', function () {
      container.classList.remove('lang-switcher-open');
      btn.setAttribute('aria-expanded', 'false');
    });

    return container;
  }

  // Remix calls hydrateRoot(document, ...) which takes over the entire DOM.
  // We use setInterval to keep re-adding the switcher until hydration is done.
  var attempts = 0;
  var interval = setInterval(function () {
    if (!document.querySelector('.lang-switcher')) {
      document.body.appendChild(createSwitcher());
    }
    attempts++;
    if (attempts > 50) clearInterval(interval);
  }, 100);
})();
