// Require Asteroid dependencies
window.Q = require('asteroid/node_modules/q/q');
window.DDP = require('asteroid/node_modules/ddp.js/src/ddp');
var Asteroid = require('asteroid/dist/asteroid.chrome');
var _twitter = require('asteroid/dist/plugins/facebook-login');

var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var PlipContainer = require('containers/plip-container.jsx');
var TimelineContainer = require('containers/timeline-container.jsx');
var settings = require('json!settings.json');

/*
 |------------------------------
 | Application Boot
 |------------------------------
 |
 |
 |
 */
var Application = function() {
  var _hostName = settings.hostName;
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
    setTimeout(function() {
      var plipCard = _initializePlipCard();
      var timelineCard = _initializeTimelineCard();
      var asteroid = _initializeAsteroid();
      var react = _initializeReact(plipCard, timelineCard, asteroid);
    }, 1000);
  }

  /**
   * Add the encapsulator for the card
   */
  var _initializePlipCard = function() {
    var $youtubePlips = $('<div>')
      .addClass('yt-card yt-card-has-padding plipable-card')
      .attr('id', 'plipable-plips');

    var $oldCard = $('#plipable-plips');

    if ( $oldCard[0] ) {
      $oldCard.replaceWith($youtubePlips);
    } else {
      // Use id ends with with the hope that it won't change
      $('div[id$="sidebar-contents"]').parent().prepend($youtubePlips);
    }

    return $youtubePlips;
  }

  var _initializeTimelineCard = function() {
    var $youtubeTimeline = $('<div>')
      .addClass('yt-card yt-card-has-padding plipable-card')
      .attr('id', 'plipable-timeline');

    var $oldCard = $('#plipable-timeline');

    if ( $oldCard[0] ) {
      $oldCard.replaceWith($youtubeTimeline);
    } else {
      $('#watch-header').parent().prepend($youtubeTimeline);
    }

    return $youtubeTimeline;
  }

  /**
   * Add Asteroid for Meteor DDP
   */
  var _initializeAsteroid = function() {
    if (_asteroid === null) {
      _asteroid = new Asteroid(_hostName, true);
    }

    return _asteroid;
  }

  var _initializeReact = function(plipCard, timelineCard, Asteroid) {
    new TimelineContainer(Asteroid, timelineCard[0]);
    new PlipContainer(Asteroid, plipCard[0]);
  }

  return _constructor();
};

module.exports = Application;