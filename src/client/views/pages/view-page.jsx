ViewPage = React.createClass({
  getInitialState() {
    return {
      appLoading: true,
      result: [],
      error: false
    }
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
        <div>
          {$$error}

          <VideoPlayerComponent videoId={this.state.result.id} />

          Plip Timeline goes here
          Floating button goes here
          <div className="row">
            <div className="col m8 offset-m2 s10 offset-s1">
              Comments go here
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