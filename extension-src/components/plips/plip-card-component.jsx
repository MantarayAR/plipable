var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var AppLoadingComponent = require('../loading/app-loading-component.jsx');
var PlipListItemComponent = require('./plip-list-item-component.jsx');
var SetIntervalMixin = require('components/mixins/set-interval-mixin');

var PlipCardComponent = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState() {
    return {
      isLoggedIn: false,
      loading: true,
      plips: [],
      currentTime: 0
    }
  },
  componentDidMount() {
    var Asteroid = this.props.Asteroid;
    var subscription = Asteroid.subscribe('plips', this.props.youtubeId);
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

    var $$signin = '';

    if (! this.state.isLoggedIn) {
      $$signin = (
        <div>
          TODO login component
        </div>
      );
    }

    return (
      <div className="plipable-plips">
        {$$signin}
        <ReactCSSTransitionGroup
              className="plips__list collection plip-items"
              transitionName='slide-down'
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              name="plip-items">
          {this.state.plips.map(function(plip, i){
            return (
              <div key={plip._id}>
                <PlipListItemComponent plip={plip} />
              </div>
            );
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  } 
});

module.exports = PlipCardComponent;