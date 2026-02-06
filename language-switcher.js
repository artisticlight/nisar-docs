(function () {
  var lang = document.documentElement.getAttribute('data-lang-switcher');
  if (!lang) return;

  var base = document.documentElement.getAttribute('data-base-url') || '';

  function addSwitcher() {
    var themeBtn = document.querySelector('.myst-theme-button');
    if (!themeBtn || document.querySelector('.lang-switcher')) return;

    var a = document.createElement('a');
    a.className = 'lang-switcher';
    a.href = 'javascript:void(0)';

    if (lang === 'es') {
      a.textContent = 'Español';
      a.onclick = function () {
        var p = window.location.pathname;
        var rest = base ? p.replace(new RegExp('^' + base), '') : p;
        window.location.href = base + '/es' + rest + window.location.search;
      };
    } else {
      a.textContent = 'English';
      a.onclick = function () {
        var p = window.location.pathname;
        var rest = base ? p.replace(new RegExp('^' + base + '/es'), '') : p.replace(/^\/es/, '');
        window.location.href = base + rest + window.location.search;
      };
    }

    themeBtn.parentNode.insertBefore(a, themeBtn);
  }

  var observer = new MutationObserver(function () {
    addSwitcher();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  addSwitcher();
})();
