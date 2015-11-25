var React = require('react');
var ReactDOM = require('react-dom');

var YoutubeHelper = require('helpers/youtube-helper');
var PlipTimelineComponent = require('components/plips/plip-timeline-component.jsx');

var TimelineContainer = function(Asteroid, cardElement) {
  var currentYoutubeId = YoutubeHelper.getCurrentYoutubeId();
  
  ReactDOM.render(
    <PlipTimelineComponent Asteroid={Asteroid} youtubeId={currentYoutubeId} />,
    cardElement
  );
};

module.exports = TimelineContainer;