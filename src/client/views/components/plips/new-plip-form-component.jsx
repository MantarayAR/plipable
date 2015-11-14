NewPlipFormComponent = React.createClass({
  componentDidMount() {
    // Really gross. Not sure why this is necessary
    setTimeout(function() {
      $('#plip-comment')
        .focus()
        .attr('length', 250)
        .characterCounter();
    }, 1);
    
  },
  handleSubmit(e) {
    e.preventDefault();

    var videoId        = this.props.videoId;
    var comment        = this.refs.comment.value;
    var videoTimestamp = this.props.currentTime;

    // Validation

    if (comment === "") {
      Materialize.toast('Plips can\'t be empty!', 3000, 'red lighten-1');
      return;
    }
    dispatch(new AnalyticsEventCommand(), 'Plips', 'New Plip', videoId);
    this.closeModal();
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
  },
  closeModal() {
    this.props.closeModal();
  },
  render() {
    var currentTime = this.props.currentTime;
    currentTime     = __.Time.humanize(currentTime);

    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input autoFocus={true} maxLength="250" ref="comment" id="plip-comment" type="text"/>
              <label htmlFor="plip-comment">Your comment @ {currentTime}</label>
            </div>

            <button
                className="btn red darken-1 waves-effect waves-light right"
                type="submit"
                name="action">
              Plip!
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }  
});
