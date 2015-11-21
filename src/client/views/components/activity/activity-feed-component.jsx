SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

ActivityFeedComponent = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function() {
    return {
      activity: []
    };
  },
  componentDidMount: function() {
    this.tick();
    this.setInterval(this.tick, 10000);
  },
  tick: function() {
    Meteor.call('getActivityFeed', function(err, response) {
      if (err) {
        // TODO handle error
      } else {
        this.setState({
          activity: response
        });
      }
    }.bind(this));
  },
  render() {
    return (
      <div className="activity-feed">
        <TransitionGroup
              className="activity-feed__collection collection"
              transitionName='slide-down'
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              name="activity-items">
          {this.state.activity.map(function(activity, i) {
            return (
              <div key={activity.videoId}>
                <ActivityItemComponent activity={activity} />
              </div>
            );
          })}
        </TransitionGroup>
      </div>
    );
  }  
});
