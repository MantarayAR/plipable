var React = require('react');
var ReactDOM = require('react-dom');

var YoutubeHelper = require('helpers/youtube-helper');
var PlipCardComponent = require('components/plips/plip-card-component.jsx');

var PlipContainer = function(Asteroid, cardElement) {
  var currentYoutubeId = YoutubeHelper.getCurrentYoutubeId();
  
  ReactDOM.render(
    <PlipCardComponent Asteroid={Asteroid} youtubeId={currentYoutubeId} />,
    cardElement
  );
};

module.exports = PlipContainer;