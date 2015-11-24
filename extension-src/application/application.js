// Require Asteroid dependencies
window.Q = require('asteroid/node_modules/q/q');
window.DDP = require('asteroid/node_modules/ddp.js/src/ddp');
var Asteroid = require('asteroid/dist/asteroid.chrome');
var _twitter = require('asteroid/dist/plugins/facebook-login');

var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var PlipPage = require('pages/plip-page.jsx');

/*
 |------------------------------
 | Application Boot
 |------------------------------
 |
 |
 |
 */
var Application = function() {
  var _hostName = 'https://www.plipable.com';
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
    var $youtubePlips = $('<div>').addClass('yt-card yt-card-has-padding plipable-card');
    $('#action-panel-details').after($youtubePlips);

    return $youtubePlips;
  }

  /**
   * Add Asteroid for Meteor DDP
   */
  var _initializeAsteroid = function() {
    if (_asteroid === null) {
      //_asteroid = new Asteroid(_hostName);
    }

    return _asteroid;
  }

  var _initializeReact = function(card, Asteroid) {
    ReactDOM.render(
      (new PlipPage(Asteroid)).react(),
      card[0]
    );
  }

  return _constructor();
};

module.exports = Application;