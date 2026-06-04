/* Archificials | Pirkey Barber AI Readiness Report | archificials.com */
(function () {
  var ROOT_ID = 'pirkey-barber';
  var CDN_BASE = 'https://cdn.jsdelivr.net/gh/biel-pitman/law-firm-assessment-v2@v2.5.3';
  var HTML_URL = CDN_BASE + '/dist/pirkey-barber.html';

  function init() {
    var target = document.getElementById(ROOT_ID);
    if (!target) { console.warn('[pirkey-barber] No element with id="' + ROOT_ID + '" found.'); return; }

    // Break out of Webflow container to fill full viewport width
    target.style.cssText = 'position:relative;width:100vw;left:50%;transform:translateX(-50%);display:block;';

    var iframe = document.createElement('iframe');
    iframe.title = 'Pirkey Barber AI Readiness Report';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'yes');
    iframe.style.cssText = 'width:100%;min-height:900px;border:none;display:block;';

    fetch(HTML_URL)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        iframe.srcdoc = html;
        target.appendChild(iframe);

        iframe.onload = function () {
          try {
            var h = iframe.contentDocument.body.scrollHeight;
            if (h > 200) iframe.style.height = h + 'px';
          } catch (e) {
            iframe.style.height = '4800px';
          }
        };
      })
      .catch(function (e) {
        console.error('[pirkey-barber] Failed to load report:', e);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
