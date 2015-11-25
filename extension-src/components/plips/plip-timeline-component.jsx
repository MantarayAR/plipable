var React = require('react');
var ReactDOM = require('react-dom');

var PlipTimelineComponent = React.createClass({
  getInitialState() {
    return {
      loading: true,
      plips: []
    }
  },
  componentDidMount() {
    var Asteroid = this.props.Asteroid;
    var subscription = Asteroid.subscribe('plips', this.props.youtubeId);
    var Plips = Asteroid.getCollection('plips');

    var reactivePlips = Plips.reactiveQuery({
      videoId: this.props.youtubeId
    });

    this.setState({
      loading: false,
      plips: reactivePlips.result
    });

    reactivePlips.on('change', function() {
      this.setState({
        plips: reactivePlips.result
      });
    }.bind(this));
  },
  render() {
    return (
      <div>
        Timeline
      </div>
    );
  } 
});

module.exports = PlipTimelineComponent;