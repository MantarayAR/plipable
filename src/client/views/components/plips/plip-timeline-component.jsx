PlipTimelineComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var loaded = Meteor.subscribe("plips", this.props.videoId);
  
    return {
      isLoading: ! loaded.ready(),
      plips: Plips.find({ 
      }, {
        sort: {
          videoTimestamp: -1,
          createdAt: -1
        }
      }).fetch()
    }
  },
  getInitialState() {
    return {
      plips: null
    }
  },
  componentDidMount() {
    this.calculateTimeline(this.props.plips, this.props.currentDuration);
    this.setState({lastPlips: this.props.plips});
  },
  componentWillReceiveProps(nextProps) {
    if (! _.isEqual(nextProps.plips, this.state.lastPlips)) {
      this.calculateTimeline(nextProps.plips, this.props.currentDuration);
      this.setState({lastPlips: nextProps.plips});
    }
  },
  calculateTimeline(plips, duration) {
    // Draw plips in groups
    var $$children = [];
    var buckets = [];
    //var bucketSize = duration * 15.0 / $(window).width(); // in seconds
    var bucketSize = Math.log( duration );

    var currentBucket = 0;

    if (plips.length > 0) {
      var sortedPlips = _.sortBy(plips, "videoTimestamp");

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

    this.setState({plips: $$children});
  },
  seek(e) {
    e.preventDefault();

    var parentOffset = $(e.currentTarget).parent().offset();
    var x = e.pageX - parentOffset.left;
    var width = $(e.currentTarget).width();

    var percentage = x / width;

    var time = percentage * this.props.currentDuration;

    this.props.seek(time);
  },
  render() {
    var time     = this.props.currentTime;
    var duration = this.props.currentDuration;

    // Draw the current line
    var percentageOffset = Math.floor(10000 * time / duration) / 100.0;
    var currentLineStyles = { left: percentageOffset + '%' };
    var $$currentLine = (
      <div className="plip__timeline-line" style={currentLineStyles}>
      </div>
    );

    

    return (
      <div className="plip__timeline" onClick={this.seek}>
        {$$currentLine}

        {this.state.plips}
      </div>
    );
  }
});
