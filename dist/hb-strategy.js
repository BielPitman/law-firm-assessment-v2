/* Archificials | HB&H AI Strategy Presentation | archificials.com */
(function () {
  var ROOT_ID = 'hb-strategy';
  var CDN_BASE = 'https://cdn.jsdelivr.net/gh/biel-pitman/law-firm-assessment-v2@v2.5.6';
  var HTML_URL = CDN_BASE + '/dist/hb-strategy.html';

  function init() {
    var target = document.getElementById(ROOT_ID);
    if (!target) { console.warn('[hb-strategy] No element with id="' + ROOT_ID + '" found.'); return; }

    // Break out of Webflow container to fill full viewport width
    target.style.cssText = 'position:relative;width:100vw;left:50%;transform:translateX(-50%);display:block;';

    var iframe = document.createElement('iframe');
    iframe.title = 'Howry Breen & Herman AI Strategy';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'yes');
    iframe.style.cssText = 'width:100%;min-height:900px;border:none;display:block;';

    // Fetch HTML and inject via srcdoc to bypass CDN content-type restrictions
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
        console.error('[hb-strategy] Failed to load presentation:', e);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
