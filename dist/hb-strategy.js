/* Archificials | HB&H AI Strategy Presentation | archificials.com */
(function () {
  var ROOT_ID = 'hb-strategy';
  var CDN_BASE = 'https://cdn.jsdelivr.net/gh/biel-pitman/law-firm-assessment-v2@v2.2.0';
  var HTML_URL = CDN_BASE + '/dist/hb-strategy.html';

  function init() {
    var target = document.getElementById(ROOT_ID);
    if (!target) { console.warn('[hb-strategy] No element with id="' + ROOT_ID + '" found.'); return; }

    var iframe = document.createElement('iframe');
    iframe.src = HTML_URL;
    iframe.title = 'Howry Breen & Herman AI Strategy';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'yes');
    iframe.style.cssText = 'width:100%;min-height:900px;border:none;display:block;';

    // Auto-resize once loaded
    iframe.onload = function () {
      try {
        var h = iframe.contentDocument.body.scrollHeight;
        if (h > 200) iframe.style.height = h + 'px';
      } catch (e) {
        iframe.style.height = '4800px'; // fallback for cross-origin
      }
    };

    target.appendChild(iframe);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
