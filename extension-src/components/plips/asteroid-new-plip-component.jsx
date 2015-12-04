var React = require('react');
var ReactDOM = require('react-dom');

var PlipModalComponent = require('shared/components/plip-modal-component.jsx');
var AsteroidUserMixin = require('components/mixins/asteroid-user-mixin');

var AsteroidNewPlipComponent = React.createClass({
  mixins: [AsteroidUserMixin],
  handleSubmit(videoId, videoTimestamp, comment, closeCallback) {
    var userId = this.props.Asteroid.user()._id;
    var token = this.props.Asteroid.token();

    // Validation

    if (comment === "") {
      Materialize.toast('Plips can\'t be empty!', 3000, 'red lighten-1');
      return;
    }
    
    var call = this.props.Asteroid.call(
      'commentWithToken',
      videoId,
      comment,
      videoTimestamp,
      userId,
      token
    );

    call.result.then(function(result) {
      Materialize.toast('Post Successful', 4000);
    }).catch(function(err) {
      if (err.reason) {
        Materialize.toast(err.reason, 3000, 'red lighten-1')
      } else {
        Materialize.toast('Something bad happened :(', 3000, 'red lighten-1')
      }
    });

    closeCallback();
  },
  render() {
    return (
      <PlipModalComponent
        videoId={this.props.videoId}
        currentTime={this.props.currentTime}
        handleSubmit={this.handleSubmit}
        isLoggedIn={this.state.isLoggedIn} />
    );
  }
});

module.exports = AsteroidNewPlipComponent;