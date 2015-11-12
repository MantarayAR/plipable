VideoPlayerComponent = React.createClass({
  getInitialState() {
    return {
      player: null,
      timer: null
    }
  },
  seek(time) {
    var player = this.state.player;

    if (player != null && player.seekTo != null) {
      player.seekTo(time);
    }
  },
  refresh() {
    var that  = this;
    var timer = setInterval(function() {
      var callback = that.props.currentTimeCallback;
      var player   = that.state.player;

      if (player != null && player.getCurrentTime != null) {
        var time     = player.getCurrentTime();
        var duration = player.getDuration();

        callback(time, duration);
      }
    }, 1000);

    this.setState({ timer: timer });
  },
  killRefresh() {
    if (this.state.timer !== null) {
      clearTimeout(this.state.timer);
    }
  },
  checkEvent(event) {
    // TODO sometimes the target does not have a getVideoData function

    var newVideoId = event.target.getVideoData().video_id

    if (newVideoId !== this.props.videoId) {
      FlowRouter.setParams({ videoId: newVideoId });
    }
  },
  mountVideo(videoId, checkEventCallback) {
    var player = new YT.Player("videoplayer", {
      height: $('body').width() * 400.0 / 600.0, 
      width: $('body').width(), 
      videoId: videoId, 
      // Events like ready, state change, 
      events: {
        onReady: function (event) {
          // don't autoplay the video for android devices
          // due to a bug
          if ( ! window.isMobile() ) {
            event.target.playVideo();
          }
        },
        onStateChange: function(event) {
          checkEventCallback(event);
        },
        onApiChange: function(event) {
          checkEventCallback(event);
        }
      }
    });

    this.setState({ player: player });

    this.refresh();
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.videoId !== nextProps.videoId) {
      $('.videoplayer').html('<div id="videoplayer"></div>');
      this.mountVideo(nextProps.videoId, this.checkEvent);
    }
  },
  componentDidMount() {
    onYouTubeIframeAPIReady = function () {
      this.mountVideo(this.props.videoId, this.checkEvent);
    }.bind(this);

    YT.load();
  },
  componentWillUnmount() {
    this.killRefresh();
  },
  render() {
    return (
      <div>
        <div className="videoplayer">
          <div id="videoplayer">
          </div>
        </div>
      </div>
    );
  }
});
