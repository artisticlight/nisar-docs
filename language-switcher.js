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
    // SVG translate icon built with DOM methods (no innerHTML)
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');

    var path1 = document.createElementNS(svgNS, 'path');
    path1.setAttribute('d', 'M12.913 17H20.087M12.913 17L11 21M12.913 17L16.5 8.885L20.087 17M20.087 17L22 21');
    path1.setAttribute('stroke-linecap', 'round');
    path1.setAttribute('stroke-linejoin', 'round');

    var path2 = document.createElementNS(svgNS, 'path');
    path2.setAttribute('d', 'M2 5H8M14 5H10.5M8 5H10.5M8 5V3M10.5 5C9.6 7.8 8 10.2 6 12.1M10 15C9 14.1 7.8 13 6 12.1M6 12.1C4.8 11.3 3.5 9.2 3 8');
    path2.setAttribute('stroke-linecap', 'round');
    path2.setAttribute('stroke-linejoin', 'round');

    svg.appendChild(path1);
    svg.appendChild(path2);
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
