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
    // Stroke-based translate icon for a lighter, more delicate look
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.4');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('width', '34');
    svg.setAttribute('height', '34');

    // 文 character strokes (left side)
    var lines = [
      'M2 5h12',      // top horizontal bar
      'M8 2v3',       // vertical stem
      'M5 8c1.3 3 3.2 5.6 5.5 7.5', // left curve
      'M12.5 5c-.7 2.8-2 5.5-3.8 7.8', // right curve
      'M3.5 18l5-5'   // diagonal
    ];
    for (var i = 0; i < lines.length; i++) {
      var p = document.createElementNS(svgNS, 'path');
      p.setAttribute('d', lines[i]);
      svg.appendChild(p);
    }

    // A character strokes (right side)
    var aLines = [
      'M14 21l4-11 4 11', // A shape
      'M15.5 17h5'        // A crossbar
    ];
    for (var j = 0; j < aLines.length; j++) {
      var p2 = document.createElementNS(svgNS, 'path');
      p2.setAttribute('d', aLines[j]);
      svg.appendChild(p2);
    }

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
