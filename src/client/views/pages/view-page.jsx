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

          var image = result.snippet.thumbnails['high'].url;

          dispatch(new SetMetaTagsCommand(), {
            title: result.snippet.title,
            meta: [
              {
                name: 'description',
                content: result.snippet.description
              },
              {
                name: 'og:title',
                content: result.snippet.title
              },
              {
                name: 'og:description',
                content: result.snippet.description
              },
              {
                name: 'og:type',
                content:'video'
              },
              {
                name:'og:image',
                content: image
              },
              {
                name: 'twitter:card',
                content: 'summary_large_image'
              },
              {
                name: 'twitter:site',
                content: '@mantarayar'
              },
              {
                name: 'twitter:title',
                content: result.snippet.title
              },
              {
                name: 'twitter:description',
                content: result.snippet.description
              },
              {
                name: 'twitter:image',
                content: image
              }
            ]
          });
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

          <div className="view__meta">
            <h1>{this.state.result.snippet.title} via Plipable</h1>
            <img src={this.state.result.snippet.thumbnails['high'].url} />
          </div>

          <div className="row view__player">
            <div className="col s12 m8 offset-m2 l8">
              <VideoPlayerComponent
                ref="player"
                videoId={this.props.videoId}
                currentTimeCallback={this.handleCurrentTime} />
            </div>
            <div className="col l4 hide-on-med-and-down">
              <div className="plips__desktop">
                <MeteorNewPlipComponent
                  videoId={this.props.videoId}
                  currentTime={this.state.currentTime} 
                  title={this.state.result.snippet.title} />
                <PlipsListComponent
                  videoId={this.props.videoId}
                  currentTime={this.state.currentTime} />
              </div>
            </div>
          </div>
          <PlipTimelineComponent
              seek={this.seek}
              videoId={this.props.videoId}
              currentTime={this.state.currentTime}
              currentDuration={this.state.currentDuration} />

          <div className="row plips__container">
            <div className="col m8 offset-m2 s10 offset-s1">
              <div className="hide-on-large-only">
                <MeteorNewPlipComponent
                  videoId={this.props.videoId}
                  currentTime={this.state.currentTime} />
                <PlipsListComponent
                    videoId={this.props.videoId}
                    currentTime={this.state.currentTime} />
                </div>
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