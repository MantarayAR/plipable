/**
 * The New Plip Component handles creating
 * the markup for the modal that wraps
 * the form
 *
 * @param currentTime String
 * @param videoId String
 */
MeteorNewPlipComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      isLoggedIn: !! Meteor.userId()
    }
  },
  handleSubmit(videoId, videoTimestamp, comment, closeCallback) {
    // Validation

    if (comment === "") {
      Materialize.toast('Plips can\'t be empty!', 3000, 'red lighten-1');
      return;
    }
    dispatch(new AnalyticsEventCommand(), 'Plips', 'New Plip', videoId);
    Meteor.call('comment', videoId, comment, videoTimestamp, function(err, result) {
      if (err) {
        if (err.reason) {
          Materialize.toast(err.reason, 3000, 'red lighten-1')
        } else {
          Materialize.toast('Something bad happened :(', 3000, 'red lighten-1')
        }
      } else {
        Materialize.toast('Post Successful', 4000)
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
        isLoggedIn={this.data.isLoggedIn} />
    );
  }
});