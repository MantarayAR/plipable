/*
 |------------------------------
 | Application Boot
 |------------------------------
 |
 |
 |
 */
var Application = function() {
  var _hostName = 'http://plipable.com';
  var _asteroid = null;

  /**
   * Constructor for the application
   *
   * This will add a mutation observer to the page
   * so that we can detect when youtube changes pages
   * and re-initialize our card
   */
  var _constructor = function() {
    var observer = new MutationObserver(_boot);
    var config   = { attributes: true, childList: true, characterData: true };
    observer.observe(document.getElementById('content'), config);

    _boot();
  }

  var _boot = function() {
    var card = _initializeCard();
    var asteroid = _initializeAsteroid();
    var react = _initializeReact(card, asteroid);
  }

  /**
   * Add the encapsulator for the card
   */
  var _initializeCard = function() {
    // Namespace jQuery
    return +function($) {
      var $youtubePlips = $('<div>').addClass('yt-card yt-card-has-padding plipable-card');
      $('#action-panel-details').after($youtubePlips);

      return $youtubePlips;
    }(jQuery);
  }

  /**
   * Add Asteroid for Meteor DDP
   */
  var _initializeAsteroid = function() {
    if (_asteroid === null) {
      _asteroid = new Asteroid(_hostName);
    }

    return _asteroid;
  }

  var _initializeReact = function(card, Asteroid) {
    // TODO
    // At this point, we need to split these files up and have a src->builder->dist folder structure
  }

  return _constructor();
}


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
    if (window.location.host === 'plipable.com') {
      document.body.classList.add('installed');
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
