NewPlipComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      isLoggedIn: !! Meteor.userId()
    }
  },
  getInitialState: function() {
    return {
      modalIsOpen: false,
      currentTime: false
    };
  },
  openModal: function() {
    this.setState({
      modalIsOpen: true,
      currentTime: this.props.currentTime
    });
  },
  closeModal: function(goBack) {
    goBack = (goBack == null) ? true : goBack;

    if (this.state.modalIsOpen) {
      if (goBack) {
        window.history.back();
      }

      window.modalWasOpen = false;
      this.setState({modalIsOpen: false});
    }
  },
  handleNewComment(e) {
    e.preventDefault();

    this.openModal();
  },
  render() {
    ReactModal.setAppElement(document.getElementById('react-root'));

    if (! this.data.isLoggedIn) {
      return <div></div>
    }

    return (
      <div className="plip__floating-button">
         <a
              onClick={this.handleNewComment}
              className="btn-floating btn-large waves-effect waves-red white">
          <i className="material-icons">add</i>
         </a>

         <ReactModal
          className="plip__modal"
          overlayClassName="plip__modal-overlay"
          closeTimeoutMS={150}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <NewPlipFormComponent
              closeModal={this.closeModal}
              videoId={this.props.videoId}
              currentTime={this.state.currentTime} />
        </ReactModal>
      </div>
    );
  }
});