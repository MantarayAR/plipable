NewPlipComponent = React.createClass({
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
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  handleNewComment(e) {
    e.preventDefault();

    this.openModal();
  },
  render() {
    ReactModal.setAppElement(document.getElementById('react-root'));

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