VideoPlayerComponent = React.createClass({
  getInitialState() {
    return {
      player: null
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
