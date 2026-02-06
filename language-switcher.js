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

  function createSwitcher() {
    var a = document.createElement('a');
    a.className = 'lang-switcher';
    a.href = '#';

    if (isSpanish) {
      a.textContent = 'English';
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var rest = path.substring(path.indexOf('/es') + 3) || '/';
        window.location.href = base + rest + window.location.search;
      });
    } else {
      a.textContent = 'Español';
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var rest = base ? path.substring(base.length) : path;
        window.location.href = base + '/es' + rest + window.location.search;
      });
    }
    return a;
  }

  // Remix calls hydrateRoot(document, ...) which takes over the entire DOM.
  // Hydration is deferred via requestIdleCallback/setTimeout, so it runs
  // after this script. We use setInterval to keep re-adding the switcher
  // until hydration is done and React stops removing it.
  // The element is appended to <body> with position:fixed CSS, so it sits
  // outside the React component tree's layout flow.
  var attempts = 0;
  var interval = setInterval(function () {
    if (!document.querySelector('.lang-switcher')) {
      document.body.appendChild(createSwitcher());
    }
    attempts++;
    if (attempts > 50) clearInterval(interval);
  }, 100);
})();
