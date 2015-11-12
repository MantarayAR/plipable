ViewPage = React.createClass({
  getInitialState() {
    return {
      appLoading: true,
      result: [],
      error: false,
      currentTime: 0,
      currentDuration: 0
    }
  },
  handleCurrentTime(time, duration) {
    this.setState({
      currentTime: time,
      currentDuration: duration
    });
  },
  callVideo(videoId) {
    var that = this;

    Meteor.call('details', videoId, function(err, result) {
      if (that.isMounted()) {
        if (err) {
          that.setState({ error: err.reason });
        } else {
          that.setState({ result: result });
        }

        that.setState({ appLoading: false });
      }
    });
  },
  seek(time) {
    this.refs.player.seek(time);
  },
  componentWillReceiveProps(nextProps) {
    this.callVideo(nextProps.videoId);
  },
  componentDidMount() {
    this.callVideo(this.props.videoId);
  },
  render() {
    var $$error = '';
    var $$contents = '';

    if (this.state.appLoading) {
      $$contents = <AppLoadingComponent />
    } else {
      if (this.state.error) {
        $$error = <ErrorComponent message={this.state.error} />
      }

      $$contents = (
        <div className="view">
          {$$error}
          <div className="row view__player">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <VideoPlayerComponent
                ref="player"
                videoId={this.props.videoId}
                currentTimeCallback={this.handleCurrentTime} />
            </div>
          </div>
          <PlipTimelineComponent
              seek={this.seek}
              videoId={this.props.videoId}
              currentTime={this.state.currentTime}
              currentDuration={this.state.currentDuration} />

          <div className="row">
            <div className="col m8 offset-m2 s10 offset-s1">
              <NewPlipComponent
                  videoId={this.props.videoId}
                  currentTime={this.state.currentTime} />
              <PlipsListComponent
                  videoId={this.props.videoId}
                  currentTime={this.state.currentTime} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="view">
        {$$contents}
      </div>
    );
  }
});