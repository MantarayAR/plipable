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
  componentDidMount() {
    var videoId = this.props.videoId;
    var that    = this;
    onYouTubeIframeAPIReady = function () {
      var player = new YT.Player("videoplayer", {
        height: $('body').width() * 400.0 / 600.0, 
        width: $('body').width(), 
        videoId: videoId, 
        // Events like ready, state change, 
        events: {
          onReady: function (event) {
            event.target.playVideo();
          }
        }
      });

      that.setState({ player: player });
    };

    YT.load();

    this.refresh();
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
