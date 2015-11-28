//----------------- LOAD START --------------------\\
var $1 = null;
var $2 = null;
var $3 = null;
var $4 = null;

if (typeof require !== 'undefined') {
  $1 = require('react');
  $2 = require('react-dom');
  $3 = require('react-modal');
  $4 = require('shared/components/plip-form-component.jsx');
} else {
  $1 = this.React;
  $2 = this.ReactDOM;
  $3 = this.ReactModal;
  $4 = this.PlipFormComponent;
}

var React = $1;
var ReactDOM = $2;
var ReactModal = $3;
var PlipFormComponent = $4;

//----------------- LOAD END --------------------\\

/**
 * @param currentTime String
 * @param videoId String
 * @param isLoggedIn Boolean
 * @param handleSubmit Function[videoId, videoTimestamp, comment, callback]
 */
var $out = React.createClass({
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

    if (! this.props.isLoggedIn) {
      return <div></div>
    }

    var modalStyle = {
        overlay : {
            backgroundColor: null
        },
        content : {
            top: null,
            left: null,
            right: null,
            bottom: null,
            border: null,
            background: null,
            borderRadius: null,
            padding: null,
            position: null
        }
    };

    return (
      <div className="plip__floating-button">
         <a
              onClick={this.handleNewComment}
              className="btn-floating btn-large waves-effect waves-red white">
          <i className="material-icons">add</i>
         </a>

         <ReactModal
          className="plip__modal"
          overlayClassName="plip__modal-overlay plipable"
          closeTimeoutMS={150}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
        >
          <PlipFormComponent
              handleSubmit={this.props.handleSubmit}
              closeModal={this.closeModal}
              videoId={this.props.videoId}
              currentTime={this.state.currentTime} />
        </ReactModal>
      </div>
    );
  }
});

//----------------- EXPORT START --------------------\\
if (typeof module !== 'undefined') {
  module.exports = $out;
} else {
  PlipModalComponent = $out;
}
//----------------- EXPORT END --------------------\\
