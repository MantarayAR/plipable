NewPlipFormComponent = React.createClass({
  getInitialState() {
    return {
      alreadySending: false
    }
  },
  componentDidMount() {
    $('#plip-comment').focus();
  },
  handleSubmit(e) {
    e.preventDefault();

    var that           = this;
    var videoId        = this.props.videoId;
    var comment        = this.refs.comment.value;
    var videoTimestamp = this.props.currentTime;
    var alreadySending = this.state.alreadySending;

    if (!alreadySending) {
      // Validation

      if (comment === "") {
        Materialize.toast('Plips can\'t be empty!', 3000, 'red lighten-1');
        return;
      }

      this.setState({ alreadySending: true });

      Meteor.call('comment', videoId, comment, videoTimestamp, function(err, result) {
        that.setState({ alreadySending: false });

        if (err) {
          Materialize.toast('Something bad happened :(', 3000, 'red lighten-1')
        } else {
          that.closeModal();
          Materialize.toast('Post Successful', 4000)
        }
      });
    }
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
              <textarea atuoFocus ref="comment" id="plip-comment" className="materialize-textarea"></textarea>
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
