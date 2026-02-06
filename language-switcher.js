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
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');

    var p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', 'M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z');

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
