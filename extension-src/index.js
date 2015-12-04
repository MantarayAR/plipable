var Application = require('application/application');

/*
 |------------------------------
 | Intialization
 |------------------------------
 |
 |
 |
 */
function initialize() {
  if (window.top === window) {
    if (window.location.host === 'www.plipable.com') {
      document.body.classList.add('chrome-extension-installed');
    } else {
      new Application();
    }
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initialize();
} else {
  document.addEventListener('DOMContentLoaded', initialize, false);
}
