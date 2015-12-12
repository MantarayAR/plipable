/**
 * Show a list of plips – will load
 * the plips from the plips subscription
 *
 * @param videoId String
 * @param currentTime Number
 */
PlipsListComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var loaded = Meteor.subscribe("plips", this.props.videoId);
    var currentTime = this.props.currentTime;

    var lowTime = Math.max(-1, currentTime - 20);
    var highTime = currentTime + 1;

    return {
      isLoading: ! loaded.ready(),
      plips: Plips.find({
        videoTimestamp: {
          $gt: lowTime,
          $lt: highTime
        }
      }, {
        sort: {
          videoTimestamp: -1,
          createdAt: -1
        }
      }).fetch(),
      isLoggedIn: !! Meteor.userId()
    }
  },
  handleCloseEntice(e) {
    e.preventDefault();

    var p = this.refs.plipEntice;

    $(ReactDOM.findDOMNode(p)).hide('slow');
  },
  render() {
    if (this.data.isLoading) {
      return <AppLoadingComponent noText={true} />
    }

    var $$signin = '';

    if (! this.data.isLoggedIn) {
      $$signin = (
        <div className="plip__entice">
          <LoginComponent />
          <div className="plip__entice-popout" ref="plipEntice">
            <a href="#!" className="right" onClick={this.handleCloseEntice}>
              <i className="fa fa-close "></i>
            </a>

            Post your reactions by signing in! You can even react with gifs!

            <div className="plip__entice-quote">
              <p>
                <span>/gif welcome!</span>
              </p>
              <div className="plip__image">
                <img className="plip__image-gif" src="https://media3.giphy.com/media/oBwOba7cOph4I/200.gif" />
                <div className="plip__image-watermark">
                  <img src="/giphy/horizontal-dark-text.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {$$signin}
        <TransitionGroup
              className="plips__list collection plip-items"
              transitionName='slide-down'
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              name="plip-items">
          {this.data.plips.map(function(plip, i){
            return (
              <div key={plip._id}>
                <MeteorPlipListItemComponent plip={plip} />
              </div>
            );
          })}
        </TransitionGroup>
      </div>
    );
  }
});
