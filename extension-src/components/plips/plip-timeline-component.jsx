var React = require('react');
var ReactDOM = require('react-dom');

var SetIntervalMixin = require('components/mixins/set-interval-mixin');
var _ = require('underscore');
var $ = require('jquery');

var PlipTimelineComponent = React.createClass({
  subscription: null,
  mixins: [SetIntervalMixin],
  getInitialState() {
    return {
      loading: true,
      plips: [],
      currentDuration: 0,
      currentTime: 0
    }
  },
  componentWillUnmount() {
    this.subscription.stop();
  },
  componentDidMount() {
    var Asteroid = this.props.Asteroid;
    this.subscription = Asteroid.subscribe('plips', this.props.youtubeId);
    var Plips = Asteroid.getCollection('plips');

    var reactivePlips = Plips.reactiveQuery({
      videoId: this.props.youtubeId
    });

    this.setState({
      loading: false,
      plips: reactivePlips.result
    });

    reactivePlips.on('change', function() {
      this.setState({
        plips: reactivePlips.result
      });
    }.bind(this));

    this.setInterval(function() {
      var currentTime = 0;
      var currentDuration = 0;

      if (ytplayer && ytplayer.getCurrentTime) {
        //
      }
      else {
        // Retry to find the element
        ytplayer = document.getElementById("movie_player");
      }

      currentTime = ytplayer.getCurrentTime();
      currentDuration = ytplayer.getDuration();

      this.setState({
        currentTime: currentTime,
        currentDuration: currentDuration
      });
    }.bind(this), 500);
  },
  seek(e) {
    e.preventDefault();

    var parentOffset = $(e.currentTarget).parent().offset();
    var x = e.pageX - parentOffset.left;
    var width = $(e.currentTarget).width();

    var percentage = x / width;

    var time = percentage * this.state.currentDuration;

    document.getElementById("movie_player").seekTo(time);
  },
  render() {
    var time     = this.state.currentTime;
    var duration = this.state.currentDuration;

    // Draw the current line
    var percentageOffset = Math.floor(10000 * time / duration) / 100.0;
    var currentLineStyles = { left: percentageOffset + '%' };
    var $$currentLine = (
      <div className="plip__timeline-line" style={currentLineStyles}>
      </div>
    );

    // Draw plips in groups
    var $$children = [];
    var buckets = [];
    //var bucketSize = duration * 15.0 / $(window).width(); // in seconds
    var bucketSize = Math.log( duration );

    // Sort the plips
    this.state.plips.sort(function(a,b) {
      return a.videoTimestamp > b.videoTimestamp;
    });

    var currentBucket = 0;

    if (this.state.plips.length > 0) {
      var sortedPlips = _.sortBy(this.state.plips, "videoTimestamp");

      buckets[currentBucket] = [sortedPlips[0]];
      for (var i = 1; i < sortedPlips.length; i++) {
        if (buckets[currentBucket][0].videoTimestamp <
            sortedPlips[i].videoTimestamp - bucketSize ) {
          // New bucket!
          currentBucket++;
          buckets[currentBucket] = [sortedPlips[i]];
        } else {
          // Add to old bucket
          buckets[currentBucket].push(sortedPlips[i]);
        }
      }

      // Calculate the relative magnitude and center of each bucket
      var largestBucket = 1;

      for (var i = 0; i < buckets.length; i++) {
        if (buckets[i].length > largestBucket) {
          largestBucket = buckets[i].length;
        }
      }

      var reticulatedBuckets = [];

      for (var i = 0; i < buckets.length; i++) {
        var center = 0;
        var relativeSize = Math.ceil( 5 * buckets[i].length / largestBucket );

        var sum = 0;

        for (var j = 0; j < buckets[i].length; j++) {
          var b = buckets[i][j];
          sum += b.videoTimestamp;
        }

        center = sum / buckets[i].length;

        reticulatedBuckets.push({
          center: center,
          relativeSize: relativeSize
        });
      }

      // Create circles for the buckets
      for (var i = 0; i < reticulatedBuckets.length; i++) {
        var percentageOffset = Math.floor( 100 * reticulatedBuckets[i].center / duration);
        var currentCircleStyles = { left: percentageOffset + '%' };

        var className = "plip__timeline-circle plip__timeline-circle--" + reticulatedBuckets[i].relativeSize; 
        $$children.push(
          <div
              key={i}
              className={className}
              style={currentCircleStyles}>
          </div>
        );
      }
    }

    return (
      <div className="plip__timeline" onClick={this.seek}>
        {$$currentLine}

        {$$children}
      </div>
    );
  }
});

module.exports = PlipTimelineComponent;

