var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var AppLoadingComponent = require('shared/components/app-loading-component.jsx');
var AsteroidPlipListItemComponent = require('./asteroid-plip-list-item-component.jsx');
var SetIntervalMixin = require('components/mixins/set-interval-mixin');
var AsteroidLoginComponent = require('components/accounts/asteroid-login-component.jsx');
var AsteroidNewPlipComponent = require('components/plips/asteroid-new-plip-component.jsx');

var _ = require('underscore');

var PlipCardComponent = React.createClass({
  subscription: null,
  mixins: [SetIntervalMixin],
  getInitialState() {
    return {
      loading: true,
      plips: [],
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
    var ytplayer = document.getElementById("movie_player");

    this.setInterval(function() {
      var currentTime = 0;

      if (ytplayer && ytplayer.getCurrentTime) {
        //
      }
      else {
        // Retry to find the element
        ytplayer = document.getElementById("movie_player");
      }

      currentTime = ytplayer.getCurrentTime();

      var lowTime = Math.max(-1, currentTime - 20);
      var highTime = currentTime + 1;

      var reactivePlips = Plips.reactiveQuery(function (plip) {
        if (plip.videoId === this.props.youtubeId) {
          if (plip.videoTimestamp >= lowTime && plip.videoTimestamp <= highTime) {
            return true;
          }
        }

        return false;
      }.bind(this));

      this.setState({
        currentTime: currentTime,
        loading: false,
        plips: reactivePlips.result
      });

      reactivePlips.on('change', function() {
        this.setState({
          plips: reactivePlips.result
        });
      }.bind(this));
    }.bind(this), 1000);
  },
  render() {
    if (this.state.loading) {
      return <AppLoadingComponent noText={true} />
    }

    var sortedPlips = _.sortBy(
      this.state.plips,
      function(plip) {
        return -plip.videoTimestamp
      }
    );

    var Asteroid = this.props.Asteroid;
    return (
      <div className="plipable-plips">
        <AsteroidNewPlipComponent
          Asteroid={Asteroid}
          title={this.props.title}
          currentTime={this.state.currentTime}
          videoId={this.props.youtubeId}/>
        <AsteroidLoginComponent Asteroid={Asteroid}/>
        <ReactCSSTransitionGroup
              className="plips__list collection plip-items"
              transitionName='slide-down'
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              name="plip-items">
          {sortedPlips.map(function(plip, i){
            return (
              <div key={plip._id}>
                <AsteroidPlipListItemComponent
                    Asteroid={Asteroid}
                    plip={plip} />
              </div>
            );
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  } 
});

module.exports = PlipCardComponent;
