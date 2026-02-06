(function () {
  var lang = document.documentElement.getAttribute('data-lang-switcher');
  if (!lang) return;

  var base = document.documentElement.getAttribute('data-base-url') || '';

  var a = document.createElement('a');
  a.className = 'lang-switcher';
  a.href = '#';

  if (lang === 'es') {
    a.textContent = 'Español';
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var p = window.location.pathname;
      var rest = base ? p.replace(new RegExp('^' + base), '') : p;
      window.location.href = base + '/es' + rest + window.location.search;
    });
  } else {
    a.textContent = 'English';
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var p = window.location.pathname;
      var rest = base ? p.replace(new RegExp('^' + base + '/es'), '') : p.replace(/^\/es/, '');
      window.location.href = base + rest + window.location.search;
    });
  }

  document.body.appendChild(a);
})();
