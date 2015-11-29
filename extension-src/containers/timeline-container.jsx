var React = require('react');
var ReactDOM = require('react-dom');

var YoutubeHelper = require('helpers/youtube-helper');
var PlipTimelineComponent = require('components/plips/plip-timeline-component.jsx');
var ExtraOptionsComponent = require('components/extras/extra-options-component.jsx');

var TimelineContainer = function(Asteroid, cardElement) {
  var currentYoutubeId = YoutubeHelper.getCurrentYoutubeId();
  
  ReactDOM.render(
    <div>
      <PlipTimelineComponent Asteroid={Asteroid} youtubeId={currentYoutubeId} />

      <ExtraOptionsComponent Asteroid={Asteroid} videoId={currentYoutubeId} />
    </div>,
    cardElement
  );
};

module.exports = TimelineContainer;